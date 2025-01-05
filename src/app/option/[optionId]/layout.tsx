import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Especialidade",
};

export default function OptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
