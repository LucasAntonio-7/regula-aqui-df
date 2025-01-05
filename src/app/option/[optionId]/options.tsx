/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { type RouterOutputs } from "@/trpc/react";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

type OptionsProps = {
  optionData: RouterOutputs["options"]["getOne"];
};

export function Options({ optionData }: OptionsProps) {
  const [checkboxValue, setCheckboxValue] = useState<string>(
    optionData.reasonForReferal[0]!.id.toString(),
  );
  const reasonForReferalSelected = optionData.reasonForReferal.find(
    (item) => item.id === Number(checkboxValue),
  );
  const [text1Value, setText1Value] = useState<string>("");
  const [text2Value, setText2Value] = useState<string>("");
  const [text3Value, setText3Value] = useState<string>("");
  const finalText = `
  **CLÍNICA**
${text1Value}

  **EXAME FÍSICO**
${text2Value}

  **EXAMES / AVALIAÇÕES COMPLEMENTARES**
${text3Value}
  `;

  const handleCapsLock = (
    setTextValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const isUpperCase = selectedText === selectedText.toUpperCase();
      const toggledText = isUpperCase
        ? selectedText.toLowerCase()
        : selectedText.toUpperCase();
      textarea.setRangeText(toggledText);
      setTextValue(textarea.value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(finalText)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <>
      <Card className="h-full w-full max-w-3xl">
        <CardHeader>
          <h1 className="text-2xl font-bold">{optionData.title}</h1>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <Accordion
            type="multiple"
            className="h-full w-full space-y-4"
            defaultValue={["item-1", "item-2"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Motivo do Encaminhamento</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-2">
                  <RadioGroup
                    defaultValue={reasonForReferalSelected?.id.toString()}
                    value={checkboxValue}
                    onValueChange={setCheckboxValue}
                  >
                    {optionData.reasonForReferal.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          id={item.id.toString()}
                          value={item.id.toString()}
                        />
                        <Label
                          htmlFor={item.id.toString()}
                          className="cursor-pointer"
                        >
                          {item.title}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                {reasonForReferalSelected?.title}
              </AccordionTrigger>
              <AccordionContent>
                {reasonForReferalSelected?.assistedText ? (
                  <div className="rounded-lg bg-yellow-100 p-4">
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{
                        __html: reasonForReferalSelected.assistedText,
                      }}
                    />
                  </div>
                ) : null}
              </AccordionContent>
            </AccordionItem>
            <h3 className="text-xl font-bold">Preenchimento - Text Guiado</h3>
            <Separator />
            <Accordion
              type="multiple"
              className="w-full space-y-4"
              defaultValue={["item-3-1", "item-3-2", "item-3-3"]}
            >
              <AccordionItem value="item-3-1">
                <AccordionTrigger>
                  A. Evolução Clínica / Resumo Clínico
                </AccordionTrigger>
                <AccordionContent>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => handleCapsLock(setText1Value)}
                    className="w-fit"
                  >
                    Caps Lock
                  </Button>
                  <div className="p-1">
                    <Textarea
                      className="min-h-[400px]"
                      value={text1Value}
                      onChange={(e) => setText1Value(e.target.value)}
                      placeholder="Descreva aqui a evolução do quadro, com sinais, sintomas e informações clínicas que julgar adequadas ao encaminhamento pela patologia solicitada. 
"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3-2">
                <AccordionTrigger>B. Exame Físico</AccordionTrigger>
                <AccordionContent>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => handleCapsLock(setText2Value)}
                    className="w-fit"
                  >
                    Caps Lock
                  </Button>
                  <div className="p-1">
                    <Textarea
                      className="min-h-[400px]"
                      value={text2Value}
                      onChange={(e) => setText2Value(e.target.value)}
                      placeholder={`
B.E.G., L.O.C., M.U.C., Anictérico, Eupneico, Eucárdico. Etc..
Cardiovascular: Sem alterações topográficas, BNF, R.R., 2t, Sem sopros ou bulhas extras. 
Extremidades com TEC < 3s, quentes e bem perfundidas, sem edemas, sem empastamento de panturrilhas
Pulsos Radiais e pediosos com ritmo simétrico, cheios, 4+
etc...

                     `}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3-3">
                <AccordionTrigger>
                  C. Exames / Avaliações Complementares
                </AccordionTrigger>
                <AccordionContent>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => handleCapsLock(setText3Value)}
                    className="w-fit"
                  >
                    Caps Lock
                  </Button>
                  <div className="p-1">
                    <Textarea
                      className="min-h-[400px]"
                      value={text3Value}
                      onChange={(e) => setText3Value(e.target.value)}
                      placeholder={`
Ex.
"Labs 20/10/2020: Creat 0,7 | K 4,1 | Na 142 | Hb 10,5 | Ht 33,3 |
Eletrocardio 21/10/2020: RS, alterações difusas da repolarização ventricular, 60bpm. Sem outras alterações
Parecer Geriatria 22/10/2024: Suspeita de demência por Dx. Alzheimer, sugere-se....."
                      `}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Accordion>
        </CardContent>
      </Card>
      <div className="fixed left-1/2 top-0 ml-12 mt-10 h-full w-full max-w-3xl transform">
        <Card className="h-fit w-full max-w-3xl">
          <CardHeader className="bg-green-200">
            <h1 className="text-2xl font-bold">Texto Final</h1>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: finalText }}
            />
            <Button
              type="button"
              variant="default"
              onClick={copyToClipboard}
              className="mt-4 w-full"
            >
              Copiar Texto
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
