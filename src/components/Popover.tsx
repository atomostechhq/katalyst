"use client";
import { cn } from "@/utils/util";
import React, { useEffect, useRef, forwardRef } from "react";

interface PopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  children: React.ReactNode;
  trigger: JSX.Element;
  postion?:
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "top-center";
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      isOpen,
      setIsOpen,
      trigger,
      children,
      className,
      postion = "bottom-right",
    },
    ref,
  ) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          !triggerRef.current?.contains(event.target as Node) &&
          !contentRef.current?.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    return (
      <div className="relative w-max" ref={ref}>
        <div
          className="cursor-pointer"
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          {trigger}
        </div>

        {isOpen && (
          <div
            ref={contentRef}
            className={cn(
              "absolute z-10 bg-white dark:bg-dark dark:text-light border border-primary-200 dark:border-primary-700 dark:shadow-primary-600 shadow-primary-200 rounded-lg shadow-sm min-w-[200px] p-4",
              postion === "bottom-left" && "left-0 top-full mt-3",
              postion === "bottom-right" && "right-0 top-full mt-3",
              postion === "top-left" && "left-0 bottom-full mb-3",
              postion === "top-right" && "right-0 bottom-full mb-3",
              postion === "bottom-center" &&
                "left-1/2 top-full mt-3 -translate-x-1/2",
              postion === "top-center" &&
                "left-1/2 bottom-full mb-3 -translate-x-1/2",
              className,
            )}
          >
            {/* Arrow */}
            <div
              className={cn(
                "absolute z-0 h-3 w-3 bg-white dark:bg-dark   border-primary-200 dark:border-primary-700 rotate-45",
                postion === "bottom-left" &&
                  "-top-1.5 left-4 border border-b-0 border-r-0",
                postion === "bottom-right" &&
                  "-top-1.5 right-4 border border-b-0 border-r-0",
                postion === "top-left" &&
                  "-bottom-1.5 left-4 border border-t-0 border-l-0",
                postion === "top-right" &&
                  "-bottom-1.5 right-4 border border-t-0 border-l-0",
                postion === "bottom-center" &&
                  "-top-1.5 left-1/2 -translate-x-1/2 border border-b-0 border-r-0",
                postion === "top-center" &&
                  "-bottom-1.5 left-1/2 -translate-x-1/2 border border-t-0 border-l-0",
              )}
            />

            {children}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = "Popover";
export default Popover;
