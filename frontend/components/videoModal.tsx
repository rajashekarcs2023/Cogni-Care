"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function VideoModal({
  path,
  open,
  setOpen,
}: {
  path: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="aspect-video w-full max-w-screen-lg overflow-hidden bg-black p-0">
        {/* <video autoPlay controls={false} loop src={path.split("/backend")[1]} /> */}
        <video autoPlay controls={false} loop src={path} />
        {path}
      </DialogContent>
    </Dialog>
  );
}
