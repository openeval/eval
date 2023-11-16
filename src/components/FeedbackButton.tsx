"use client";

import React from "react";

import { FeedbackForm } from "~/components/FeedbackForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { Button } from "./ui/Button";

export const FeedbackButton = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Feedback</Button>
      </PopoverTrigger>
      <PopoverContent>
        <FeedbackForm onSuccess={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
