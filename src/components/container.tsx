import React, { type ComponentProps, type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface CenteredBoxProps extends PropsWithChildren, ComponentProps<"div"> {}

export const CenteredContainer = ({
  children,
  className,
  ...restProps
}: CenteredBoxProps) => {
  return (
    <div
      className={cn("flex w-full items-center justify-center px-4", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
