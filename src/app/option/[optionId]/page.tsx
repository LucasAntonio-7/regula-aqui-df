import { Options } from "@/app/option/[optionId]/options";
import { api } from "@/trpc/server";

type OptionPageProps = {
  params: Promise<{ optionId: string }>;
};

export default async function OptionPage({ params }: OptionPageProps) {
  const { optionId } = await params;
  const data = await api.options.getOne({ optionId: Number(optionId) });
  if (!data) return <div>Carregando...</div>;

  return (
    <div className="flex h-full w-screen justify-center overflow-hidden">
      <div className="relative flex h-full w-full max-w-[1440px] gap-4 py-10">
        <Options optionData={data} />
      </div>
    </div>
  );
}
