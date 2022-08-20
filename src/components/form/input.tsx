import * as React from "react";
import { classnames } from "utils/classnames";
import { twMerge } from "tailwind-merge";

type Props = JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, Props>(({ ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={classnames(
        twMerge(
          "border-[1.5px] focus:border-accent",
          "w-full p-1.5 px-3 rounded-sm outline-none transition-all",
          "bg-secondary text-white",
          "disabled:cursor-not-allowed disabled:opacity-80 placeholder:opacity-50",
          rest.className,
        ),
      )}
    />
  );
});
