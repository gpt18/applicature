import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "../lib/utils";

interface DrawerDialogProps {
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  drawerHeader?: {
    title: string;
    description: string;
  };
  dialogHeader?: {
    title: string;
    description: string;
  };
  header?: {
    title: string;
    description: string;
  };
}

export function DrawerDialog({
  Trigger,
  Content,
  drawerHeader,
  dialogHeader,
  header,
}: DrawerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (header) {
    drawerHeader = header;
    dialogHeader = header;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader className={cn(dialogHeader ? "block" : "hidden")}>
            <DialogTitle>{dialogHeader?.title}</DialogTitle>
            <DialogDescription>{dialogHeader?.description}</DialogDescription>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={cn(drawerHeader ? "block" : "hidden")}>
          <DrawerTitle>{drawerHeader?.title}</DrawerTitle>
          <DrawerDescription>{drawerHeader?.description}</DrawerDescription>
        </DrawerHeader>
        {Content}
      </DrawerContent>
    </Drawer>
  );
}
