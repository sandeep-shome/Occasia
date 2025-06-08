import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { Trash } from "lucide-react";
import LoadingSpinner from "./loading-spinner";

interface DeleteButtonProps {
  pending: boolean;
  handleDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  pending,
  handleDelete,
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Trash className="size-4 text-neutral-600" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              speech and remove speech data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={handleDelete}
              className="min-w-28"
            >
              {pending ? <LoadingSpinner className="size-4" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
