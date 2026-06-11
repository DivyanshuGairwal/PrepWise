import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X, AlertTriangle } from "lucide-react";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      onFileSelect(null);
      return;
    }
    // Limit to 5MB (sensible size for typical resumes)
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
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
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <span>Upload Resume</span>
          <span className="text-xs font-normal text-zinc-500">(PDF only, max 5MB)</span>
        </label>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
        id="resume-file-input"
      />

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-300 ${
            isDragOver
              ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
              : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <UploadCloud className="w-6 h-6 text-zinc-400" />
          </div>
          <p className="text-zinc-200 font-semibold text-sm mb-1">
            Drag & drop your resume PDF here
          </p>
          <p className="text-zinc-500 text-xs mb-3">or click to browse local files</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
            PDF Support
          </span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between border border-indigo-500/30 bg-indigo-950/10 rounded-2xl p-5 relative">
          <button
            onClick={removeFile}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="min-w-0 pr-6">
              <h4 className="text-sm font-semibold text-zinc-100 truncate">
                {selectedFile.name}
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                {formatFileSize(selectedFile.size)}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/20 text-indigo-300 mt-2">
                Ready to analyze
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 mt-3 p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-red-400 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
