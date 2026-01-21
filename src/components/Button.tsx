import { cn } from "@/utils/util";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
}

const buttonVariants = cva(
  "font-semibold transition-colors rounded-radius-md py-spacing-sm duration-300 ease-in-out cursor-pointer disabled:pointer-events-none disabled:select-none disabled:bg-gray-400 disabled:text-light border-gray-25/15",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-light hover:bg-primary-600 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#0000002E] active:bg-primary-400 active:shadow-[0px_0px_0px_3px] active:shadow-primary-300",
        "primary-light":
          "bg-primary-50 text-primary-600 hover:bg-primary-200 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#356AC32E] active:shadow-[0px_0px_0px_3px] active:bg-primary-50 active:shadow-primary-300",
        secondary:
          "bg-primary-50 text-primary-800 hover:bg-primary-200 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#6984AD2E] active:bg-primary-50 active:shadow-[0px_0px_0px_3px] active:shadow-primary-700",
        tertiary:
          "bg-gray-100 text-gray-900 hover:bg-gray-300 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#9595952E] active:bg-gray-25 active:shadow-[0px_0px_0px_3px] active:shadow-gray-700",
        quaternary:
          "bg-gray-50/[0.02] text-light backdrop-blur-[6px] hover:shadow-[inset_0px_8px_8px_-2px_#23232314] hover:backdrop-blur-md hover:bg-gray-200/10 active:bg-gray-25 active:shadow-[0px_0px_0px_3px] active:text-gray-900 active:shadow-[#46464659]",
      },
      size: {
        xs: "text-sm px-spacing-md",
        sm: "text-xl leading-[30px] px-spacing-md",
        md: "font-bold text-2xl leading-[36px] px-spacing-lg",
        lg: "font-bold text-[32px] leading-[48px] px-spacing-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);

const Button = ({
  children,
  startIcon,
  endIcon,
  fullWidth,
  rounded,
  disabled,
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full",
        "flex items-center justify-center text-center gap-spacing-sm",
        rounded && "!rounded-full",
      )}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;
