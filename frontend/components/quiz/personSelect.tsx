"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  FileCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Separator } from "../ui/separator";
import { data } from "./data";
import { Badge } from "../ui/badge";

export default function PersonSelect({
  setProgress,
  date,
}: {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  date: Date;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  // solution revealed
  const [revealed, setRevealed] = useState(false);

  // submitted
  const [submitted, setSubmitted] = useState<{
    correct: boolean;
  } | null>(null);

  const onSubmit = () => {
    if (selected.length === 0) {
      setSubmitted({ correct: false });
    } else {
      const res =
        JSON.stringify(selected.sort()) === JSON.stringify(data.correct.sort());
      if (res) setRevealed(true);
      setSubmitted({ correct: res });
    }
  };

  const nullify = () => {
    setSubmitted(null);
  };

  const click = () => {};

  return (
    <>
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
        <Badge className="ml-4 h-8 px-4">Activity 1 of 3</Badge>
      </div>

      <div className="mt-12 text-xl font-medium">
        On this day, who did you talk to? (Select all that apply)
      </div>

      <div className="mt-8 flex w-full flex-wrap">
        {data.people.map((person, index) => (
          <PersonCard
            key={index}
            index={index}
            nullify={nullify}
            reveal={{
              isRevealed: revealed,
              correct: data.correct.includes(index),
            }}
            click={() => {
              if (selected.includes(index)) {
                setSelected(selected.filter((i) => i !== index));
              } else {
                setSelected([...selected, index]);
              }
            }}
            selected={selected.includes(index)}
          />
        ))}
      </div>
      <div className="mt-8 flex space-x-4">
        <Button
          disabled={revealed || submitted?.correct}
          size="lg"
          onClick={onSubmit}
          className="text-lg font-medium transition-all"
        >
          Check My Response <FileCheck className="ml-3 h-5 w-5" />
        </Button>
        <Button
          onClick={() => setRevealed(true)}
          disabled={revealed || submitted?.correct}
          variant="secondary"
          size="lg"
          className="text-lg font-medium transition-all"
        >
          See Correct Answer <BookOpenCheck className="ml-3 h-5 w-5" />
        </Button>
      </div>

      {submitted !== null ? (
        <>
          {submitted.correct ? (
            <div className="mt-8 flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" />
              <div className="font-medium">
                Correct! You remembered everyone you talked to on this day.
              </div>
            </div>
          ) : (
            <div className="mt-8 flex items-center text-red-600">
              <X className="mr-2 h-4 w-4" />
              <div className="font-medium">
                Your selection was incorrect. Try again, or choose to see the
                correct answer.
              </div>
            </div>
          )}
        </>
      ) : null}

      {!revealed && (!submitted || !submitted.correct) ? null : (
        <>
          <Separator className="my-4" />
          <Button
            disabled={!revealed && (!submitted || !submitted.correct)}
            size="lg"
            onClick={() => setProgress((prev) => prev + 1)}
            className="text-lg font-medium transition-all"
          >
            Continue to Activity 2 <ArrowRight className="ml-3 h-4 w-4" />
          </Button>
        </>
      )}
    </>
  );
}

function PersonCard({
  selected,
  click,
  index,
  nullify,
  reveal,
}: {
  selected: boolean;
  click: () => void;
  nullify: () => void;
  index: number;
  reveal: {
    isRevealed: boolean;
    correct: boolean;
  };
}) {
  return (
    <button
      onClick={() => {
        if (reveal.isRevealed) return;
        nullify();
        click();
      }}
      className={`mb-4 mr-4 h-52 w-52 overflow-hidden rounded-md border-none bg-cover transition-all ${
        reveal.isRevealed
          ? `${
              reveal.correct
                ? "shadow-lg shadow-green-600/50 ring-2 ring-green-600 ring-offset-2 ring-offset-background/75"
                : "shadow-lg shadow-red-600/50 ring-2 ring-red-600 ring-offset-2 ring-offset-background/75"
            }}`
          : `cursor-pointer ${
              selected
                ? "shadow-lg shadow-primary/50 ring-2 ring-primary ring-offset-2 ring-offset-background/75"
                : ""
            }`
      } `}
    >
      <Image
        src={data.people[index].image}
        alt=""
        className="h-full w-full rounded-md object-cover"
      />
    </button>
  );
}
