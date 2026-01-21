import React from "react";
import { cn } from "@/utils/util";
import Button, { type ButtonProps } from "./Button";

interface FloatingButtonProps extends ButtonProps {
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom-center";
}

const positionClasses: Record<
  NonNullable<FloatingButtonProps["position"]>,
  string
> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
};

const floatingSizeClasses: Record<
  NonNullable<FloatingButtonProps["size"]>,
  string
> = {
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-16 w-16",
};

const FloatingButton = ({
  position = "bottom-right",
  className,
  rounded = true,
  size = "md",
  variant = "primary",
  ...props
}: FloatingButtonProps) => {
  const resolvedSize = size ?? "md";

  return (
    <Button
      {...props}
      size={resolvedSize}
      variant={variant}
      rounded={rounded}
      className={cn(
        "fixed z-[100000000] shadow-lg flex items-center justify-center !p-0",
        "active:scale-95 transition-all",
        floatingSizeClasses[resolvedSize],
        positionClasses[position],
        className,
      )}
    />
  );
};

export default FloatingButton;
