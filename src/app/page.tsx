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
                Plataforma para auxilio de encaminhamentos a
                especialistas/servicos em saude
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
                      Sepramos aqui, conforme notas tecnicas da secretadia de
                      saude do distrito federal, os grupos de CID&apos;s sob os
                      quais os encaminhamentos devem se orientar, mantendo bem
                      registrados os itens obrigatorios, de forma clara, direta
                      e de rapida interpretaçao.
                    </p>
                    <p>
                      Lembre-se que este campo serve a principio para delinear
                      um texto base onde a patolo- gia principal mais se encaixe
                      em um desses grupos, ja que eles sao apenas um guia das
                      informaçoes mais necessarias de acordo com a definiçao
                      daquele grupo de medicos regu- ladores, que nao vendo nem
                      o paciente e nao tendo contato com o especialista,
                      precisam entender bem o caso de forma a definir seu
                      posicionamento na fila, e coordenar, portando, todo acesso
                      a saude secundaria e demais niveis superiores de saude.{" "}
                    </p>
                    <p>
                      Basta clicar na grupo diagnostico que mais se enquadre
                      como &quot;diagnostico principal&quot; ou &quot;condiçao
                      de saude&quot; principal que justifique a solicitaçao de
                      atendimento individual fora das capacidades do seu serviço
                      de garantir.{" "}
                    </p>
                    <p>
                      A principio o site como um todo e desenhado para correto
                      encaminhamento de paciente via SISRG, sistema de regulaçao
                      nacional com subdivisoes estaduais de gestao de vagas dos
                      serviçoes de saude disponiveis as regioes nas quais os
                      profissionais estao inseridos. Portan- to trata-se de um
                      modelo bem estruturado como guia, que portando pode e deve
                      ser usado sempre que ário para uma boa estruturaçao de um
                      texto de referencia e contrareferencia en- tre
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
