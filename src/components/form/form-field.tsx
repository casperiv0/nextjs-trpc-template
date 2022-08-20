import * as React from "react";

interface Props {
  label: string;
  children(options: { labelId: string }): React.ReactNode;
}

export function FormField({ label, children }: Props) {
  const id = React.useId();
  const labelId = `${id}-${label}`;

  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={labelId}>{label}</label>
      {children({ labelId })}
    </div>
  );
}
