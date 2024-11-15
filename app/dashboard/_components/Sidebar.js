import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import UploadPdfDialog from "./UploadPdfDialog";

import React from "react";

function Sidebar() {
  return (
    <div className="shadow-sm h-screen">
      <img src={"/logo2.svg"} alt="logo" width={170} height={120} />
      <div className="mt-10">
        <UploadPdfDialog>
          <Button className="w-full">+ Upload Pdf</Button>
        </UploadPdfDialog>
        <div className="flex gap-2 items-center mt-5 p-3 hover:bg-slate-100 cursor-pointer rounded-lg">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center mt-1 p-3 hover:bg-slate-100 cursor-pointer rounded-lg">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-1">2 Out of 5 PDF Uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to upload more PDF</p>
      </div>
    </div>
  );
}

export default Sidebar;
