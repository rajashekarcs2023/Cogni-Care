"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Brain, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoModal from "../videoModal";

export default function ContextQuestions({
  setProgress,
  date,
}: {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  date: Date;
}) {
  const [tab, setTab] = useState("1");
  const [feedback, setFeedback] = useState([
    {
      submitted: false,
      feedback: -1,
    },
    {
      submitted: false,
      feedback: -1,
    },
    {
      submitted: false,
      feedback: -1,
    },
  ]);

  const [data, setData] = useState<
    { question: string; answer: string; video: string }[]
  >([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/questions", {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      setData(data.data);
    };

    getData();
  }, []);

  return (
    <>
      {data && data[parseInt(tab) - 1]?.video ? (
        <VideoModal
          path={"/" + data[parseInt(tab) - 1].video.replaceAll("\\", "/")}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
      <div className="flex w-full items-center justify-start">
        <Button
          variant="secondary"
          onClick={() => setProgress(-1)}
          className="mr-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="text-lg font-medium">
          Memory Quiz —{" "}
          <span className="text-blue-600">{date.toDateString()}</span>
        </div>
        <Badge className="ml-4 h-8 px-4">Activity 3 of 3</Badge>
      </div>

      {/* {JSON.stringify(data)} */}

      <Tabs value={tab} onValueChange={setTab} className="mt-8 w-[500px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1">Question 1</TabsTrigger>
          <TabsTrigger value="2">Question 2</TabsTrigger>
          <TabsTrigger value="3">Question 3</TabsTrigger>
        </TabsList>
      </Tabs>

      {data ? (
        <Question
          feedback={feedback}
          setFeedback={setFeedback}
          n={tab}
          data={data[parseInt(tab) - 1]}
          setOpen={setOpen}
        />
      ) : null}
    </>
  );
}

function Question({
  n,
  feedback,
  setFeedback,
  data,
  setOpen,
}: {
  n: string;
  feedback: {
    submitted: boolean;
    feedback: number;
  }[];
  setFeedback: React.Dispatch<
    React.SetStateAction<
      {
        submitted: boolean;
        feedback: number;
      }[]
    >
  >;
  data: { question: string; answer: string; video: string };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    const res = await fetch("/api/accuracy", {
      method: "POST",
      body: JSON.stringify({
        given: value,
        real: data.answer,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const jsonData = await res.json();

    const newFeedback = [...feedback];
    newFeedback[parseInt(n) - 1].submitted = true;
    newFeedback[parseInt(n) - 1].feedback = jsonData.data;

    setFeedback(newFeedback);
  };

  return (
    <>
      <div className="mt-8 text-2xl font-medium">
        <span className="text-blue-600">Question {n}.</span> {data?.question}
      </div>
      <Textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Answer the question here."
        className="mt-8 h-12 max-h-36 w-full text-lg"
      />
      <Button
        onClick={() => onSubmit()}
        size="lg"
        disabled={feedback[parseInt(n) - 1].submitted || value === ""}
        className="mt-8 text-lg font-medium"
      >
        Submit <ArrowRight className="ml-3 h-4 w-4" />
      </Button>

      {feedback[parseInt(n) - 1].submitted ? (
        <Card className="mt-6 w-full p-6">
          <div className="mb-4 text-lg">
            Accuracy of your response:{" "}
            <span className="font-semibold">
              {feedback[parseInt(n) - 1].feedback}/10
            </span>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="mt-4 text-lg font-medium"
            size="lg"
          >
            <PlayCircle className="mr-3 h-4 w-4" /> Watch Memory
          </Button>
        </Card>
      ) : null}
    </>
  );
}
