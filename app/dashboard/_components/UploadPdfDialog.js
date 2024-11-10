"use client";
import React from "react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true);
    // step 1 : create a short lived url
    const postUrl = await generateUploadUrl();
    //step 2 : Post the file to the url
    const result = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": file?.type,
      },
      body: file,
    });

    const { storageId } = await result.json();
    console.log("storageId", storageId);

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-5">Select a file to upload</h2>
              <div className="gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => OnFileSelect(event)}
                />
              </div>
              <div className="mt-2 ">
                <label>File Name</label>
                <Input placeholder="File Name"></Input>
              </div>
              <div></div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
