import React, { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  AlertTriangle,
  CheckCircle2,
  Brain,
} from "lucide-react";

interface ResumeUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  error: string | null;
  setError: (err: string | null) => void;
}

export default function ResumeUpload({
  selectedFile,
  onFileSelect,
  error,
  setError,
}: ResumeUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);

    if (
      file.type !== "application/pdf" &&
      !file.name.endsWith(".pdf")
    ) {
      setError("Only PDF files are supported.");
      onFileSelect(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      onFileSelect(null);
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0
    ) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];

    const i = Math.floor(
      Math.log(bytes) / Math.log(k)
    );

    return (
      parseFloat(
        (bytes / Math.pow(k, i)).toFixed(2)
      ) +
      " " +
      sizes[i]
    );
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <Brain className="w-5 h-5 text-indigo-400" />
        </div>

        <div>
          <h3 className="font-bold text-zinc-100">
            Resume Intelligence Input
          </h3>

          <p className="text-xs text-zinc-500">
            PDF Resume • Max 5MB
          </p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() =>
            fileInputRef.current?.click()
          }
          className={`flex-1 min-h-[260px] rounded-3xl border cursor-pointer transition-all duration-300 p-8 flex flex-col justify-center items-center text-center ${
            isDragOver
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-5">
            <UploadCloud className="w-8 h-8 text-zinc-400" />
          </div>

          <h4 className="font-semibold text-zinc-100">
            Upload Resume Dataset
          </h4>

          <p className="text-sm text-zinc-500 mt-2 max-w-xs">
            Drag & drop your resume PDF or click
            to browse local files.
          </p>

          <div className="mt-6 flex gap-2 flex-wrap justify-center">
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400">
              PDF
            </span>

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400">
              Resume Parsing
            </span>

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400">
              Skill Extraction
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 relative">

          <button
            onClick={removeFile}
            className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
          >
            <X className="w-4 h-4 text-zinc-300" />
          </button>

          <div className="flex items-start gap-4">

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-emerald-400" />
            </div>

            <div className="flex-1">

              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                <span className="text-sm font-semibold text-emerald-400">
                  Resume Loaded Successfully
                </span>
              </div>

              <h4 className="font-semibold text-zinc-100 truncate">
                {selectedFile.name}
              </h4>

              <p className="text-xs text-zinc-500 mt-1">
                {formatFileSize(selectedFile.size)}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-5">

                <div className="rounded-xl border border-zinc-800 p-3">
                  <div className="text-xs text-zinc-500">
                    Status
                  </div>

                  <div className="text-sm font-medium text-zinc-200 mt-1">
                    Ready
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 p-3">
                  <div className="text-xs text-zinc-500">
                    Parsing
                  </div>

                  <div className="text-sm font-medium text-zinc-200 mt-1">
                    Enabled
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 mt-4 p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-red-400 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}