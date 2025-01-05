"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuillNew with no SSR
const ReactQuillNew = dynamic(() => import("react-quill-new"), { ssr: false });

type TextEditorProps = {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  toolbarId: string;
};

export const TextEditor = ({
  className,
  placeholder,
  value,
  onChange,
  toolbarId,
}: TextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (data: string) => {
    onChange(data);
  };

  const handleUppercase = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) {
      return;
    }
    const range = quill.getSelection();
    if (range && range.length > 0) {
      const selectedText = quill.getText(range.index, range.length);
      quill.deleteText(range.index, range.length);
      quill.insertText(range.index, selectedText.toUpperCase());
    }
  };

  useEffect(() => {
    const button = document.querySelector(`#${toolbarId} .ql-uppercase`);
    if (button) {
      button.addEventListener("click", handleUppercase);
    }
    return () => {
      if (button) {
        button.removeEventListener("click", handleUppercase);
      }
    };
  }, [toolbarId]);

  if (!quillRef) return null;

  return (
    <div>
      <CustomToolbar toolbarId={toolbarId} />
      <ReactQuillNew
        // @ts-ignore
        ref={quillRef}
        className={cn("h-[400px]", className)}
        value={value}
        onChange={handleChange}
        modules={{
          toolbar: {
            container: `#${toolbarId}`,
          },
        }}
        placeholder={placeholder ?? "Escreva algo aqui..."}
      />
    </div>
  );
};

const CustomToolbar = ({ toolbarId }: { toolbarId: string }) => (
  <div id={toolbarId}>
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="">Parágrafo</option>
      <option value="1">Título 1</option>
      <option value="2">Título 2</option>
    </select>
    <button type="button" className="ql-bold" title="Negrito"></button>
    <button type="button" className="ql-italic" title="Itálico"></button>
    <button
      type="button"
      className="ql-list"
      value="ordered"
      title="Lista ordenada"
    ></button>
    <button
      type="button"
      className="ql-list"
      value="bullet"
      title="Lista com marcadores"
    ></button>
    <button
      type="button"
      className="ql-uppercase text-nowrap underline"
      title="Uppercase"
    >
      Caps Locko
    </button>
  </div>
);
