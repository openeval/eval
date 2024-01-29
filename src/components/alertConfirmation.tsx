"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";

const ConfirmationDialog = ({
  open,
  title = "Are you absolutely sure ?",
  message = "This action cannot be undone.",
  onOpenChange,
  onConfirm,
  onDismiss,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDismiss}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ConfirmationDialogContext = React.createContext({
  openDialog: ({}: DialogConfig) => {},
});

type DialogConfig = {
  title?: string;
  message?: string;
  actionCallback: (value: unknown) => void; // resolver from promise
};

const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogConfig, setDialogConfig] = React.useState<
    DialogConfig | Record<string, never>
  >({});

  const openDialog = ({ title, message, actionCallback }: DialogConfig) => {
    setDialogOpen(true);
    setDialogConfig({ title, message, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  const onConfirm = () => {
    dialogConfig.actionCallback(true);
    resetDialog();
  };

  const onDismiss = () => {
    dialogConfig.actionCallback(false);
    resetDialog();
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogConfig?.title}
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

const useConfirmationDialog = () => {
  const { openDialog } = React.useContext(ConfirmationDialogContext);

  const getConfirmation = async (
    options: Pick<DialogConfig, "title" | "message"> = {},
  ) =>
    new Promise((resolve) => {
      openDialog({ ...options, actionCallback: resolve });
    });

  return { getConfirmation };
};

export default ConfirmationDialog;
export { ConfirmationDialogProvider, useConfirmationDialog };
