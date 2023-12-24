"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BrainCircuit,
  Home,
  Loader2,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const [results, setResults] = useState([
    "/video_chunks/capitalone_chunks/chunk_0000_0010.mp4",
  ]);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSearch = async () => {
    const res = await fetch(`/api/semSearch`, {
      method: "POST",
      body: JSON.stringify({
        query: value,
      }),
    });
    const data = await res.json();
    const processed: string[] = data.data.map(
      (d: string) => d.split("/backend")[1],
    );
    setResults(processed.sort());
    setLoading(false);
    router.refresh();
  };

  useEffect(() => {
    // video end listener

    const video = videoRef.current;
    if (!video) return;

    const onEnd = () => {
      setIndex((index) => index + 1);
    };

    video.addEventListener("ended", onEnd);
    return () => {
      video.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
  }, [results, index]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-black">
      <video
        controls={true}
        ref={videoRef}
        className="min-w-screen absolute top-0 min-h-screen object-cover"
        src={results[index % results.length]}
        // src={"/video_chunks/capitalone_chunks/chunk_0000_0010.mp4"}
      />
      <div className="absolute bottom-8 w-full max-w-screen-sm rounded-xl border border-border bg-white p-4 transition-all">
        <div className="flex w-full justify-between">
          <Link href="/dashboard">
            <Button variant="secondary">
              <BrainCircuit className="mr-3 h-5 w-5" /> Back to Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => setMinimized(!minimized)}
            variant="secondary"
            size="icon"
          >
            {minimized ? (
              <Plus className="h-5 w-5" />
            ) : (
              <Minus className="h-5 w-5" />
            )}
          </Button>
        </div>
        {minimized ? null : (
          <>
            <div className="mt-4 flex w-full space-x-4">
              <Input
                placeholder="Search through your memories..."
                className="grow"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                disabled={value === ""}
                onClick={() => {
                  setLoading(true);
                  setQuery(value);
                  onSearch();
                  setValue("");
                }}
              >
                Query{" "}
                {loading ? (
                  <Loader2 className="ml-2 h-4 w-2 animate-spin" />
                ) : (
                  <Search className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
            {query !== "" ? (
              <div className="mb-2 mt-4 text-center text-lg font-medium">
                Currently displaying query: {query}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
