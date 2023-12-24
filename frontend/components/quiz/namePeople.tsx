"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Separator } from "../ui/separator";
import Bubbles from "./bubbles";
import { Badge } from "../ui/badge";

export default function NamePeople({
  setProgress,
  date,
}: {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  date: Date;
}) {
  const [clicked, setClicked] = useState(false);

  const allowContinue = () => {
    setClicked(true);
  };

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
        <Badge className="ml-4 h-8 px-4">Activity 2 of 3</Badge>
      </div>

      <div className="mt-12 text-2xl font-medium">
        Can you identify who this is? (The face on the left)
      </div>

      <Bubbles allowContinue={allowContinue} />

      {clicked ? (
        <Button
          size="lg"
          disabled={!clicked}
          onClick={() => setProgress((prev) => prev + 1)}
          className="mt-4 text-lg font-medium transition-all"
        >
          Continue to Activity 3 <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      ) : null}
    </>
  );
}
