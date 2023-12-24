import Image from "next/image";
import "./index.css";
import Water from "./water.jpg";
import { Card } from "@/components/ui/card";
import Target from "../data/krish.png";
import { use, useEffect, useState } from "react";

export default function Bubbles({
  allowContinue,
}: {
  allowContinue: () => void;
}) {
  return (
    <div className="relative mt-4 h-[44rem] w-full select-none rounded-md">
      <Card
        className={`absolute -left-52 top-0 z-10 h-48 w-48 overflow-hidden border-none bg-cover`}
      >
        <Image src={Target} alt="" className="h-full w-full object-cover" />
      </Card>
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <div className="absolute left-0 top-0 h-full w-full rounded-md bg-cover">
          <Image
            src={Water}
            alt="Background image graphic of water"
            className="min-h-full min-w-full object-cover"
          />
        </div>

        <div className="relative h-96 w-[90%]">
          <Bubble className="x1" data={1} name="Pearl" />
          <Bubble
            className="x2"
            data={2}
            allowContinue={allowContinue}
            target
            name="Krish"
          />
          <Bubble className="x3" data={3} name="Sourav" />
          <Bubble className="x4" data={4} name="Ishaan" />
          <Bubble className="x5" data={5} name="Ian" />
          <Bubble className="x6" data={6} name="Rajashekar" />
          <Bubble className="x7" data={7} name="Rajan" />
          <Bubble className="x8" data={8} name="Patrick" />
          <Bubble className="x9" data={9} name="Mary" />
          <Bubble className="x10" data={10} name="Ishaan" />
        </div>
      </div>
    </div>
  );
}

function Bubble({
  className,
  data,
  name,
  allowContinue,
  target,
}: {
  className: string;
  data: number;
  name: string;
  allowContinue?: () => void;
  target?: boolean;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      if (target && allowContinue) {
        allowContinue();
      }
      setTimeout(() => {
        setActive(false);
      }, 500);
    }
  }, [active]);

  return (
    <div
      onClick={() => setActive(true)}
      className={`bubble ${
        active ? (target ? "bg-green-300" : "bg-red-300") : ""
      } backdrop-blur-sm transition-all ${className}`}
      data-bubble={data}
    >
      <span className="pointer-events-none  flex h-full select-none items-center justify-center text-3xl font-semibold text-white">
        {name}
      </span>
    </div>
  );
}
