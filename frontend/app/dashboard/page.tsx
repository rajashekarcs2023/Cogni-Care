"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Dices,
  FileTerminal,
  FileText,
  TestTube,
  User2,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Graph from "./graph";
import Nav from "@/components/nav";

export default function Home() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Nav />
      <main className="flex min-h-screen w-screen items-start justify-center overflow-x-hidden pt-24">
        <div className="flex h-full w-full max-w-screen-lg flex-col items-start justify-start px-4">
          <div className="mb-8 text-2xl font-medium">Patient Dashboard</div>
          <div className="grid  w-full grid-cols-3 gap-3 pb-8">
            <DashboardCard link="quiz" navigate={navigate}>
              <Dices className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 text-primary opacity-20" />

              <div className="flex items-center text-lg font-medium">
                Daily Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </DashboardCard>

            <DashboardCard link="contacts" navigate={navigate}>
              <Users2 className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 text-primary opacity-20" />

              <div className="flex items-center text-lg font-medium">
                Contacts
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </DashboardCard>
            <DashboardCard reverse link="explore" navigate={navigate}>
              <Brain className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 text-blue-400 opacity-20" />

              <div className="flex items-center text-lg font-medium">
                Explore Memories
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </DashboardCard>
            <DashboardCard className="col-span-3 !h-96">
              <div className="flex items-center text-lg font-medium">
                Memory Trends
              </div>
              <Graph />
            </DashboardCard>
          </div>
        </div>
      </main>
    </>
  );
}

function DashboardCard({
  children,
  link,
  navigate,
  className,
  reverse = false,
}: {
  children: React.ReactNode;
  link?: string;
  navigate?: (path: string) => void;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <Card
      onClick={link && navigate ? () => navigate(link) : undefined}
      tabIndex={0}
      className={`${className} relative z-0 h-52 w-full overflow-hidden transition-all ${
        reverse
          ? "bg-gradient-to-br from-primary to-blue-950 text-white"
          : "border-primary"
      } ${link && navigate ? "cursor-pointer" : ""} p-6`}
    >
      {children}
    </Card>
  );
}
