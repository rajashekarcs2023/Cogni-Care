"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Question } from "@/lib/types";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  BrainCircuit,
  Speech,
  User,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DatePickerWithPresets } from "./datePicker";
import { Separator } from "../ui/separator";

export default function StartQuiz({
  progress,
  setProgress,
  date,
  setDate,
}: {
  progress: number;
  setProgress: (progress: number) => void;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <>
      <div className="text-2xl font-medium">Start A Memory Quiz</div>

      <div className="mb-2 mt-8">
        Select which date you'd like to be tested on:
      </div>
      <DatePickerWithPresets date={date} setDate={setDate} />

      {/* <Button
        onClick={() => setProgress(0)}
        size="lg"
        // disabled={questions.length <= 0}
        className="mt-8 text-lg  font-medium"
      >
        Start Quiz <ArrowRight className="ml-3 h-4 w-4" />
      </Button> */}

      <Separator className="my-4" />
      <div className="grid w-full grid-cols-3 gap-4">
        <Card
          onClick={() => {
            setProgress(0);
          }}
          className="relative z-0 w-full overflow-hidden border-primary bg-gradient-to-br from-white via-white to-primary/25 p-6"
        >
          <User2 className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 text-primary opacity-20" />
          <div className="text-xl font-medium">
            Activity 1: <br />
            Facial Recognition
          </div>
          <Button className="mt-24">
            Complete <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
        <Card
          onClick={() => {
            setProgress(1);
          }}
          className="relative z-0 w-full overflow-hidden border-primary bg-gradient-to-br from-white via-white to-primary/25 p-6"
        >
          <Speech className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 -scale-x-100 text-primary opacity-20" />
          <div className="text-xl font-medium">
            Activity 2: <br />
            Name Recall
          </div>
          <Button className="mt-24">
            Complete <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
        <Card
          onClick={() => {
            setProgress(2);
          }}
          className="relative z-0 w-full overflow-hidden border-primary bg-gradient-to-br from-white via-white to-primary/25 p-6"
        >
          <Brain className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 text-primary opacity-20" />
          <div className="text-xl font-medium">
            Activity 3: <br />
            Relive Memories
          </div>
          <Button className="mt-24">
            Complete <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    </>
  );
}
