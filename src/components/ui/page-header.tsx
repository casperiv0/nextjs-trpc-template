interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, children, description }: Props) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between w-full mb-5 gap-y-3">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-semibold font-serif">{title}</h1>
        </div>

        <p className="mt-4 font-medium">{description}</p>
      </div>

      <div>{children}</div>
    </header>
  );
}
