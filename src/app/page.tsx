import { Referal } from "@/app/referal";
import { Logo } from "@/components/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  return (
    <div className="flex h-screen w-screen justify-center">
      <div className="mt-10 flex w-full max-w-6xl flex-col items-center">
        <Logo />
        <Card className="my-10 w-full border-gray-300 shadow-2xl">
          <CardHeader>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-bold text-custom-green">
                Regula Aqui
              </h1>
              <p className="text-gray-500">
                Plataforma para auxílio de encaminhamentos à
                especialistas/serviços em saúde
              </p>
            </div>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent className="w-full">
            <Accordion
              type="multiple"
              className="w-full space-y-4"
              defaultValue={["item-goals"]}
            >
              <AccordionItem value="item-goals">
                <AccordionTrigger>Objetivos</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-2">
                    <p>
                      Separamos aqui, conforme notas tecnicas da secretaria de
                      saúde do distrito federal, os grupos de CID&apos;s sob os
                      quais os encaminhamentos devem se orientar, mantendo bem
                      registrados os itens obrigatórios, de forma clara, direta
                      e de rápida interpretação.
                    </p>
                    <p>
                      Lembre-se que este campo serve a princípio para delinear
                      um texto base onde a patologia principal mais se encaixa
                      em um desses grupos, já que eles são apenas um guia das
                      informações mais necessárias de acordo com a definição
                      daquele grupo de médicos reguladores, que não vendo nem o
                      paciente e não tendo contato com o especialista, precisam
                      entender bem o caso de forma a definir seu posicionamento
                      na fila, e coordenar, portando, todo acesso a saúde
                      secundária e demais níveis superiores de saúde.{" "}
                    </p>
                    <p>
                      Basta clicar no grupo de diagnóstico que mais se enquadre
                      como &quot;diagnóstico principal&quot; ou &quot;condição
                      de saúde&quot; principal que justifique a solicitação de
                      atendimento individual fora das capacidades do seu serviço
                      de garantir.{" "}
                    </p>
                    <p>
                      A principio o site como um todo e desenhado para correto
                      encaminhamento de paciente via SISRG, sistema de regulação
                      nacional com subdivisões estaduais de gestao de vagas dos
                      serviços de saúde disponíveis as regiões nas quais os
                      profissionais estão inseridos. Portanto trata-se de um
                      modelo bem estruturado como guia, que portanto pode e deve
                      ser usado sempre que necessário para uma boa estruturação
                      de um texto de referência e contrareferência entre
                      profissionais.
                    </p>
                    <p>
                      Escolha sua especialidade, defina seu subgrupo e preencha
                      os campos de forma a continuar a o texto predefinido.
                      Descendo a pagina ha o texto completo, faça seus ajustes
                      finais, copie e cole conforme sua necessidade.{" "}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <Separator />
              <Referal />
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
