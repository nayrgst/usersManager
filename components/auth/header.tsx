interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <section className="flex w-full flex-col gap-y-4 justify-center items-center">
      <p className="text-muted-foreground text-3xl font-bold">{label}</p>
    </section>
  );
}
