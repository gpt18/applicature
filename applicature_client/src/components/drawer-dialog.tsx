import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface DrawerDialogProps {
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  DrawerHeader?: React.ReactNode;
  DialogHeader?: React.ReactNode;
}

export function DrawerDialog({
  Trigger,
  Content,
  DrawerHeader,
  DialogHeader,
}: DrawerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent>
          {DialogHeader}
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent>
        {DrawerHeader}
        {Content}
      </DrawerContent>
    </Drawer>
  );
}
