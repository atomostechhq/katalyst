// src/utils/util.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
var cn = (...classes) => twMerge(clsx(...classes));

// src/components/Accordion.tsx
import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
function Accordion({
  type = "single",
  collapsible = true,
  className,
  children,
  expanded,
  defaultOpenValues = [],
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy
}) {
  const [openItems, setOpenItems] = useState(defaultOpenValues);
  useEffect(() => {
    if (expanded !== void 0) {
      if (expanded) {
        const allValues = [];
        React.Children.forEach(children, (child) => {
          if (React.isValidElement(child)) {
            allValues.push(child.props.value);
          }
        });
        setOpenItems(allValues);
      } else {
        setOpenItems(collapsible ? [] : openItems);
      }
    }
  }, [expanded, children, collapsible]);
  const handleToggle = (value) => {
    if (type === "single") {
      const isClosing = openItems.includes(value);
      if (isClosing && !collapsible) return;
      setOpenItems(isClosing ? [] : [value]);
    } else {
      setOpenItems((prev) => {
        const isClosing = prev.includes(value);
        if (isClosing && !collapsible && prev.length === 1) return prev;
        return isClosing ? prev.filter((item) => item !== value) : [...prev, value];
      });
    }
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn("flex flex-col", className),
      role: type === "single" ? "tablist" : void 0,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-multiselectable": type === "multiple"
    },
    React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          openItems,
          handleToggle,
          index,
          totalItems: React.Children.count(children)
        });
      }
      return child;
    })
  );
}
function AccordionItem({
  value,
  disabled,
  openItems,
  handleToggle,
  children,
  index,
  totalItems
}) {
  const isOpen = openItems?.includes(value);
  const itemId = `accordion-item-${value}`;
  const triggerId = `accordion-trigger-${value}`;
  const contentId = `accordion-content-${value}`;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "rounded-lg mb-3 border transition-all duration-300 overflow-hidden",
        isOpen ? "border-primary-500 bg-white dark:bg-gray-900 dark:border-primary-400" : "border-transparent bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/70",
        disabled && "opacity-50 pointer-events-none dark:opacity-40"
      ),
      id: itemId,
      role: "presentation"
    },
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          isOpen,
          onClick: () => handleToggle?.(value),
          triggerId,
          contentId,
          disabled,
          index,
          totalItems,
          value
        });
      }
      return child;
    })
  );
}
function AccordionTrigger({
  isOpen,
  children,
  onClick,
  disabled,
  triggerId,
  contentId,
  index,
  totalItems,
  value,
  className,
  triggerIcon = /* @__PURE__ */ React.createElement(HiChevronDown, { size: 18 })
}) {
  const handleKeyDown = (e) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        onClick?.();
        break;
      case "ArrowDown": {
        e.preventDefault();
        const nextTrigger = document.querySelector(
          `[data-accordion-trigger-index="${(index || 0) + 1}"]`
        );
        nextTrigger?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prevTrigger = document.querySelector(
          `[data-accordion-trigger-index="${(index || 0) - 1}"]`
        );
        prevTrigger?.focus();
        break;
      }
      case "Home": {
        e.preventDefault();
        const firstTrigger = document.querySelector(
          '[data-accordion-trigger-index="0"]'
        );
        firstTrigger?.focus();
        break;
      }
      case "End": {
        e.preventDefault();
        const lastIndex = (totalItems || 1) - 1;
        const lastTrigger = document.querySelector(
          `[data-accordion-trigger-index="${lastIndex}"]`
        );
        lastTrigger?.focus();
        break;
      }
    }
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      id: triggerId,
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-expanded": isOpen,
      "aria-controls": contentId,
      "aria-disabled": disabled,
      "data-accordion-trigger-index": index,
      "data-accordion-value": value,
      onClick: disabled ? void 0 : onClick,
      onKeyDown: handleKeyDown,
      className: cn(
        "flex p-3.5 text-base rounded-lg cursor-pointer bg-white dark:bg-gray-900 justify-between items-center font-semibold transition-all delay-150 ease-in",
        "hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700",
        isOpen && "bg-gray-50 dark:bg-gray-800",
        isOpen ? "border-none" : "border border-gray-200 dark:border-gray-700",
        disabled && "cursor-not-allowed",
        className
      )
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-gray-900 dark:text-gray-100" }, children),
    /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cn(
          "transition-transform duration-300 text-gray-600 dark:text-gray-400",
          isOpen ? "rotate-180" : "rotate-0"
        ),
        "aria-hidden": "true"
      },
      triggerIcon
    )
  );
}
function AccordionContent({
  isOpen,
  children,
  className,
  contentId,
  triggerId
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      id: contentId,
      role: "region",
      "aria-labelledby": triggerId,
      hidden: !isOpen,
      className: cn(
        "grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )
    },
    /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cn(
          "p-4 pb-6 mobile:px-4 mobile:pb-4 text-gray-600 dark:text-gray-300 leading-relaxed",
          "border-t border-gray-100 dark:border-gray-700",
          className
        )
      },
      children
    ))
  );
}

// src/components/Button.tsx
import { cva } from "class-variance-authority";
import React2 from "react";
var buttonVariants = cva(
  "font-semibold transition-colors rounded-radius-md py-spacing-sm duration-300 ease-in-out cursor-pointer disabled:pointer-events-none disabled:select-none disabled:bg-gray-400 disabled:text-light border-gray-25/15",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-light hover:bg-primary-600 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#0000002E] active:bg-primary-400 active:shadow-[0px_0px_0px_3px] active:shadow-primary-300",
        "primary-light": "bg-primary-50 text-primary-600 hover:bg-primary-200 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#356AC32E] active:shadow-[0px_0px_0px_3px] active:bg-primary-50 active:shadow-primary-300",
        secondary: "bg-primary-50 text-primary-800 hover:bg-primary-200 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#6984AD2E] active:bg-primary-50 active:shadow-[0px_0px_0px_3px] active:shadow-primary-700",
        tertiary: "bg-gray-100 text-gray-900 hover:bg-gray-300 hover:shadow-[inset_0px_2px_8px_-2px_#FFFFFF8F,inset_0px_8px_8px_-2px_#9595952E] active:bg-gray-25 active:shadow-[0px_0px_0px_3px] active:shadow-gray-700",
        quaternary: "bg-gray-50/[0.02] text-light backdrop-blur-[6px] hover:shadow-[inset_0px_8px_8px_-2px_#23232314] hover:backdrop-blur-md hover:bg-gray-200/10 active:bg-gray-25 active:shadow-[0px_0px_0px_3px] active:text-gray-900 active:shadow-[#46464659]"
      },
      size: {
        xs: "text-sm px-spacing-md",
        sm: "text-xl leading-[30px] px-spacing-md",
        md: "font-bold text-2xl leading-[36px] px-spacing-lg",
        lg: "font-bold text-[32px] leading-[48px] px-spacing-xl"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "sm"
    }
  }
);
var Button = ({
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
}) => {
  return /* @__PURE__ */ React2.createElement(
    "button",
    {
      ...props,
      disabled,
      className: cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full",
        "flex items-center justify-center text-center gap-spacing-sm",
        rounded && "!rounded-full"
      )
    },
    startIcon,
    children,
    endIcon
  );
};
var Button_default = Button;

// src/components/Callout.tsx
import { cva as cva2 } from "class-variance-authority";
import React3 from "react";
var calloutVariants = cva2("py-3 px-4 font-medium rounded-md", {
  variants: {
    variant: {
      filled: "",
      outlined: "border"
    },
    intent: {
      primary: "",
      warning: "",
      error: "",
      success: "",
      default: ""
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  },
  compoundVariants: [
    {
      variant: "filled",
      intent: "primary",
      className: "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
    },
    {
      variant: "outlined",
      intent: "primary",
      className: "border-primary-200 text-primary-600 bg-transparent dark:text-primary-400"
    },
    {
      variant: "filled",
      intent: "warning",
      className: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
    },
    {
      variant: "outlined",
      intent: "warning",
      className: "border-yellow-400 text-yellow-600 bg-transparent"
    },
    {
      variant: "filled",
      intent: "error",
      className: "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-400"
    },
    {
      variant: "outlined",
      intent: "error",
      className: "border-red-200 text-red-600 bg-transparent"
    },
    {
      variant: "filled",
      intent: "success",
      className: "bg-green-50 dark:bg-green-900 dark:text-green-400 text-green-600"
    },
    {
      variant: "outlined",
      intent: "success",
      className: "border-green-300 text-green-600 bg-transparent"
    },
    {
      variant: "filled",
      intent: "default",
      className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400"
    },
    {
      variant: "outlined",
      intent: "default",
      className: "border-gray-300 text-gray-700 bg-transparent dark:text-gray-400"
    }
  ],
  defaultVariants: {
    variant: "filled",
    intent: "primary",
    size: "sm"
  }
});
var Callout = ({
  children,
  variant,
  intent,
  size,
  startIcon,
  endIcon,
  className
}) => {
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      role: "alert",
      className: cn(
        calloutVariants({ variant, intent, size }),
        "flex items-center justify-between gap-2",
        className
      )
    },
    /* @__PURE__ */ React3.createElement("div", { className: "flex items-center gap-2" }, startIcon && /* @__PURE__ */ React3.createElement("span", null, startIcon), children),
    endIcon && /* @__PURE__ */ React3.createElement("span", null, endIcon)
  );
};
var Callout_default = Callout;

// src/components/Caption.tsx
import { cva as cva3 } from "class-variance-authority";
import React4 from "react";
var captionVariants = cva3("font-bold font-karla text-dark dark:text-light", {
  variants: {
    variant: {
      sm: "text-[10px] leading-[15px]",
      md: "text-sm leading-[18px]"
    }
  },
  defaultVariants: {
    variant: "sm"
  }
});
var Caption = ({ children, variant, className, ...props }) => {
  return /* @__PURE__ */ React4.createElement("span", { className: cn(captionVariants({ variant, className })), ...props }, children);
};
var Caption_default = Caption;

// src/components/Card.tsx
import Image from "next/image";
import React7 from "react";

// src/components/Typography.tsx
import { cva as cva4 } from "class-variance-authority";
import React5 from "react";
var typographyVariant = cva4("text-dark dark:text-light font-bold", {
  variants: {
    variant: {
      h1: "xl:text-8xl xl:leading-[144px] lg:text-7xl lg:leading-[90px] md:text-6xl md:leading-[72px] sm:text-5xl sm:leading-[48px] text-4xl leading-9",
      h2: "xl:text-7xl xl:leading-[90px] lg:text-6xl lg:leading-[72px] md:text-5xl md:leading-[48px] sm:text-4xl sm:leading-9 text-3xl leading-7",
      h3: "xl:text-5xl xl:leading-[72px] lg:text-4xl lg:leading-9 md:text-3xl md:leading-7 sm:text-2xl text-xl leading-[30px]",
      h4: "md:text-[32px] md:leading-[48px] sm:text-xl sm:leading-[30px] text-xl",
      h5: "text-2xl leading-9",
      h6: "text-xl font-semibold leading-[30px]"
    }
  },
  defaultVariants: {
    variant: "h1"
  }
});
var Typography = ({
  as,
  variant = "h1",
  children,
  className,
  ...props
}) => {
  const Component = as || variant;
  return /* @__PURE__ */ React5.createElement(
    Component,
    {
      className: cn(typographyVariant({ variant, className })),
      ...props
    },
    children
  );
};
var Typography_default = Typography;

// src/components/Paragraph.tsx
import { cva as cva5 } from "class-variance-authority";
import React6 from "react";
var paragraphVariants = cva5(
  "font-karla font-normal text-dark dark:text-light",
  {
    variants: {
      variant: {
        b1: "text-2xl leading-[38px]",
        b2: "text-xl leading-[30px]",
        b3: "text-base",
        b4: "text-sm leading-[21px]"
      }
    },
    defaultVariants: {
      variant: "b1"
    }
  }
);
var Paragraph = ({
  children,
  className,
  variant,
  ...props
}) => {
  return /* @__PURE__ */ React6.createElement("p", { className: cn(paragraphVariants({ variant, className })), ...props }, children);
};
var Paragraph_default = Paragraph;

// src/components/Card.tsx
function Card({ children, className }) {
  return /* @__PURE__ */ React7.createElement("article", { className }, children);
}
var CardIcon = ({ children, className }) => /* @__PURE__ */ React7.createElement("span", { className }, children);
var CardHeader = ({ children, className }) => /* @__PURE__ */ React7.createElement("div", { className }, children);
var CardBg = ({
  children,
  className,
  src,
  alt = "Card",
  width = 300,
  height = 200
}) => /* @__PURE__ */ React7.createElement("div", { className: cn("relative", className) }, src && /* @__PURE__ */ React7.createElement(
  Image,
  {
    src,
    alt,
    width,
    height,
    layout: "responsive"
  }
), /* @__PURE__ */ React7.createElement("div", { className: "absolute inset-0" }, children));
var CardTitle = ({ children, className }) => /* @__PURE__ */ React7.createElement(Typography_default, { variant: "h4", className }, children);
var CardDescription = ({ children, className }) => /* @__PURE__ */ React7.createElement(Paragraph_default, { variant: "b1", className: cn("text-light", className) }, children);
var CardContent = ({ children, className }) => /* @__PURE__ */ React7.createElement("div", { className: cn("font-karla text-white", className) }, children);
var CardFooter = ({ children, className }) => /* @__PURE__ */ React7.createElement("div", { className: cn("font-karla text-white", className) }, children);

// src/components/Checkbox.tsx
import React8, { forwardRef } from "react";
var Checkbox = forwardRef(
  ({ disabled, checked, className, children, readOnly, square, ...props }, ref) => {
    return /* @__PURE__ */ React8.createElement(
      "div",
      {
        className: cn(
          square ? "rounded-sm" : "rounded-full",
          "group inline-flex relative items-center  border-2 border-transparent hover:border-primary-300",
          disabled && "border-none"
        )
      },
      /* @__PURE__ */ React8.createElement(
        "input",
        {
          type: "checkbox",
          ref,
          ...props,
          disabled,
          readOnly,
          checked,
          className: cn(
            square ? "rounded-sm" : "rounded-full",
            "peer relative h-5 w-5 cursor-pointer appearance-none border-2 border-gray-300 transition-all checked:border-primary-500 hover:border-primary-500 hover:bg-primary-25/25 disabled:opacity-30 disabled:pointer-events-none disabled:border-gray-400",
            className
          )
        }
      ),
      /* @__PURE__ */ React8.createElement(
        "span",
        {
          className: cn(
            "absolute text-primary-600 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100",
            disabled && "text-gray-300"
          )
        },
        /* @__PURE__ */ React8.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-4 h-4",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            stroke: "currentColor",
            strokeWidth: "0.3"
          },
          /* @__PURE__ */ React8.createElement(
            "path",
            {
              fillRule: "evenodd",
              d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
              clipRule: "evenodd"
            }
          )
        )
      ),
      children
    );
  }
);
Checkbox.displayName = "Checkbox";
var Checkbox_default = Checkbox;

// src/components/Chip.tsx
import React9 from "react";
import { cva as cva6 } from "class-variance-authority";
var chipVariants = cva6("", {
  variants: {
    variant: {
      primary: "bg-white text-primary-500 hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-700",
      secondary: "bg-primary-500 text-white hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-700",
      default: "bg-gray-200",
      glass: "backdrop-blur-sm text-primary-500"
    },
    size: {
      xs: "text-xs py-1 px-3",
      sm: "text-sm py-1 px-3",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});
var Chip = ({
  children,
  className,
  variant,
  startIcon,
  endIcon,
  size,
  ...props
}) => {
  return /* @__PURE__ */ React9.createElement(
    "div",
    {
      className: cn(
        "rounded-radius-xl bg-gradient-to-r w-fit",
        {
          solid: "from-primary-200 to-primary-500 p-[1px]",
          primary: "from-primary-200 to-primary-500 p-[1px]",
          secondary: "from-primary-200 to-primary-500 p-[1px]",
          glass: "border border-primary-500 bg-white/20",
          default: "bg-gray-200 border border-gray-200 p-[1px]"
        }[variant || "primary"]
      )
    },
    /* @__PURE__ */ React9.createElement(
      "div",
      {
        ...props,
        className: cn(
          "flex items-center justify-center gap-2 text-center font-semibold",
          "rounded-radius-xl",
          chipVariants({ variant, size }),
          className
        )
      },
      startIcon,
      children,
      endIcon
    )
  );
};
var Chip_default = Chip;

// src/components/CircularProgress.tsx
import React10 from "react";
var CircularProgress = ({
  percentage,
  size = 160,
  strokeWidth = 8,
  text,
  textClassName,
  strokeColor = "var(--primary-600)",
  strokeLinecap = "round"
}) => {
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * (percentage || 0) / 100;
  return /* @__PURE__ */ React10.createElement("svg", { width: size, height: size, viewBox }, /* @__PURE__ */ React10.createElement(
    "circle",
    {
      className: "fill-none stroke-gray-200 dark:stroke-gray-900",
      cx: size / 2,
      cy: size / 2,
      r: radius,
      strokeWidth: `${strokeWidth}px`
    }
  ), /* @__PURE__ */ React10.createElement(
    "circle",
    {
      className: "fill-none transition-all delay-200 ease-in",
      cx: size / 2,
      cy: size / 2,
      r: radius,
      strokeLinecap,
      stroke: strokeColor,
      strokeWidth: `${strokeWidth}px`,
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
      style: {
        strokeDasharray: dashArray,
        strokeDashoffset: dashOffset
      }
    }
  ), /* @__PURE__ */ React10.createElement(
    "text",
    {
      x: "50%",
      y: "50%",
      dy: ".3em",
      textAnchor: "middle",
      fill: "currentColor",
      className: cn("text-dark dark:text-light font-medium", textClassName)
    },
    text
  ));
};
var CircularProgress_default = CircularProgress;

// src/components/Drawer.tsx
import React11, { useCallback, useEffect as useEffect2 } from "react";
import { RiCloseLine } from "react-icons/ri";
var Drawer = ({
  isOpen,
  setIsOpen,
  children,
  position = "right",
  width = "w-80",
  height = "h-64",
  className,
  showCloseButton = true,
  closeOnOutsideClick = true
}) => {
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  useEffect2(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);
  useEffect2(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);
  return /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement(
    "div",
    {
      className: cn(
        "fixed inset-0 bg-black/50 dark:bg-white/50 transition-opacity duration-300 z-[10000000000000000]",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      ),
      onClick: () => closeOnOutsideClick && handleClose()
    }
  ), /* @__PURE__ */ React11.createElement(
    "div",
    {
      className: cn(
        "fixed bg-light dark:bg-dark  shadow-xl p-4 transition-transform duration-300 z-[100000000000000000]",
        position === "right" && `top-0 right-0 ${width} h-full`,
        position === "left" && `top-0 left-0 ${width} h-full`,
        position === "top" && `top-0 left-0 w-full ${height}`,
        position === "bottom" && `bottom-0 left-0 w-full ${height}`,
        !isOpen && (position === "right" ? "translate-x-full" : position === "left" ? "-translate-x-full" : position === "top" ? "-translate-y-full" : "translate-y-full"),
        isOpen && "translate-x-0 translate-y-0",
        className
      ),
      onClick: (e) => e.stopPropagation()
    },
    showCloseButton && /* @__PURE__ */ React11.createElement(
      Button_default,
      {
        size: "xs",
        variant: "tertiary",
        onClick: handleClose,
        startIcon: /* @__PURE__ */ React11.createElement(RiCloseLine, { size: 20 }),
        "aria-label": "Close drawer",
        className: "absolute border-none p-1 transition-colors top-3 right-4"
      }
    ),
    /* @__PURE__ */ React11.createElement("div", { className: "overflow-y-auto h-full" }, children)
  ));
};
var Drawer_default = Drawer;

// src/components/Dropdown.tsx
import React14, {
  useEffect as useEffect3,
  useState as useState2,
  useMemo,
  useCallback as useCallback2,
  forwardRef as forwardRef3,
  useRef,
  useImperativeHandle
} from "react";
import { HiChevronDown as HiChevronDown2, HiOutlineSearch } from "react-icons/hi";

// src/components/Input.tsx
import { cva as cva7 } from "class-variance-authority";
import React12, { forwardRef as forwardRef2 } from "react";
var inputVariants = cva7(
  "flex items-center text-sm gap-2 py-2 px-4 rounded-radius-md border font-karla has-[:disabled]:opacity-30 has-[:disabled]:select-none has-[:disabled]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "dark:text-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:hover:text-light dark:hover:bg-gray-800 dark:hover:border-gray-700 dark:focus-within:bg-gray-100 dark:focus-within:border-gray-800 dark:focus-within:hover:bg-gray-700 dark:focus-within:text-dark dark:has-[:disabled]:bg-gray-700 bg-gray-100 border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-500 hover:bg-gray-300 focus-within:bg-gray-50 focus-within:border-gray-400 focus-within:text-dark focus-within:hover:text-dark focus-within:hover:border-primary-100 focus-within:hover:bg-primary-50 has-[:disabled]:bg-gray-25 has-[:disabled]:border-gray-400",
        glass: "backdrop-blur-[3.5px] bg-light/10 dark:bg-dark/20 dark:border-gray-800 border-gray-200/50 text-light"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Input = forwardRef2(
  ({ startIcon, endIcon, className, variant, type, disabled, ...props }, ref) => {
    return /* @__PURE__ */ React12.createElement("div", { className: cn(inputVariants({ variant, className })) }, startIcon, /* @__PURE__ */ React12.createElement(
      "input",
      {
        ...props,
        ref,
        disabled,
        type,
        className: "w-full bg-none bg-transparent outline-none"
      }
    ), endIcon);
  }
);
Input.displayName = "Input";
var Input_default = Input;

// src/components/Label.tsx
import { cva as cva8 } from "class-variance-authority";
import React13 from "react";
var labelVariants = cva8("font-medium text-dark dark:text-light", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Label = ({
  children,
  htmlFor,
  size,
  required,
  disabled,
  className,
  ...props
}) => {
  return /* @__PURE__ */ React13.createElement(
    "label",
    {
      htmlFor,
      className: cn(
        "cursor-pointer",
        labelVariants({ className, size }),
        disabled === true ? "opacity-30 select-none" : "opacity-100"
      ),
      ...props
    },
    children,
    required && /* @__PURE__ */ React13.createElement("span", { className: "text-error" }, "*")
  );
};
var Label_default = Label;

// src/components/Dropdown.tsx
import { useId } from "react";
var defaultRenderItem = (option, state) => {
  return /* @__PURE__ */ React14.createElement(
    MenuItem,
    {
      label: option.label,
      value: option.value,
      selected: state.selected,
      disabled: state.disabled
    }
  );
};
var Dropdown = forwardRef3(
  ({
    id: controlledId,
    options,
    selected,
    setSelected,
    search = false,
    multiple = false,
    dropdownText = "Select",
    renderItem = defaultRenderItem,
    children,
    icon,
    position = "top",
    width,
    info,
    dropdownFooter = false,
    onApply,
    disabled = false,
    onReset,
    footerAction,
    height = "200px"
  }, ref) => {
    const reactId = useId();
    const id = controlledId ?? `dropdown-${reactId}`;
    const [searchQuery, setSearchQuery] = useState2("");
    const [filteredOptions, setFilteredOptions] = useState2(
      options || []
    );
    const [dropdownMenu, setDropdownMenu] = useState2(false);
    const dropdownRef = useRef(null);
    useImperativeHandle(ref, () => dropdownRef.current);
    useEffect3(() => {
      if (options) {
        setFilteredOptions(options);
      }
    }, [options]);
    const memoizedFilteredOptions = useMemo(() => {
      if (!search) return filteredOptions;
      return filteredOptions.filter((option) => {
        if (typeof option.label === "string") {
          return option.label.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return option.label.toString().includes(searchQuery.toLowerCase());
      });
    }, [search, searchQuery, filteredOptions]);
    const handleSearchChange = useCallback2(
      (e) => {
        setSearchQuery(e.target.value);
      },
      []
    );
    const toggleOption = useCallback2(
      (option) => {
        if (multiple && setSelected) {
          setSelected(
            (prevSelected) => prevSelected.some((item) => item.value === option.value) ? prevSelected.filter((item) => item.value !== option.value) : [...prevSelected, option]
          );
        } else if (setSelected) {
          setSelected([option]);
          setDropdownMenu(false);
        }
      },
      [multiple, setSelected]
    );
    const handleSelectAll = () => {
      if (selected?.length === filteredOptions.length) {
        setSelected?.([]);
      } else {
        setSelected?.(filteredOptions);
      }
    };
    const handleReset = () => {
      if (onReset) {
        onReset();
      }
      setSelected?.([]);
      setDropdownMenu(false);
    };
    useEffect3(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownMenu(false);
      }
    };
    return /* @__PURE__ */ React14.createElement(
      "div",
      {
        id,
        ref: dropdownRef,
        className: cn(
          "relative rounded-lg shadow-sm font-karla",
          "bg-white dark:bg-gray-900",
          "text-gray-900 dark:text-gray-100",
          !width && "w-full",
          disabled && "cursor-not-allowed opacity-50"
        ),
        style: {
          width
        }
      },
      /* @__PURE__ */ React14.createElement(
        "button",
        {
          type: "button",
          "aria-haspopup": "listbox",
          "aria-expanded": dropdownMenu,
          "aria-labelledby": `${id}-label`,
          disabled,
          onClick: () => {
            if (!disabled) {
              setDropdownMenu((prev) => !prev);
            }
          },
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!disabled) {
                setDropdownMenu((prev) => !prev);
              }
            }
          },
          className: cn(
            "w-full flex justify-between items-center rounded-lg px-[14px] py-2 text-sm",
            "border transition-colors",
            "bg-white dark:bg-gray-900",
            "text-gray-900 dark:text-gray-100",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            dropdownMenu ? "border-primary-600" : "border-gray-200 dark:border-gray-700",
            disabled && "cursor-not-allowed opacity-50"
          )
        },
        /* @__PURE__ */ React14.createElement("section", { className: "flex items-center gap-2 text-ellipsis overflow-hidden" }, icon && /* @__PURE__ */ React14.createElement("span", { "aria-hidden": "true" }, icon), /* @__PURE__ */ React14.createElement("span", { id: `${id}-label`, className: "line-clamp-1 w-full" }, multiple ? (selected?.length ?? 0) > 0 ? `${selected?.length} Selected` : dropdownText : selected?.[0]?.label ? selected?.[0]?.label : dropdownText)),
        /* @__PURE__ */ React14.createElement(HiChevronDown2, { "aria-hidden": "true", size: 18 })
      ),
      /* @__PURE__ */ React14.createElement(
        "ul",
        {
          role: "listbox",
          "aria-multiselectable": multiple,
          "aria-labelledby": `${id}-label`,
          className: cn(
            "absolute z-[1000] w-full mt-1 rounded shadow-md overflow-hidden transition-all",
            "bg-white dark:bg-gray-900",
            "text-gray-900 dark:text-gray-100",
            dropdownMenu ? "opacity-100 max-h-[360px]" : "opacity-0 max-h-0",
            position === "top" ? "top-10" : "bottom-10",
            dropdownMenu ? "border border-primary-600" : "border border-gray-200 dark:border-gray-700"
          )
        },
        search && /* @__PURE__ */ React14.createElement(
          Input_default,
          {
            id: `${id}-search`,
            type: "text",
            placeholder: "Search...",
            "aria-label": "Search options",
            value: searchQuery,
            onChange: handleSearchChange,
            className: "rounded-none text-gray-800 text-sm bg-white w-full h-[35px] pl-3 border-none",
            endIcon: /* @__PURE__ */ React14.createElement(HiOutlineSearch, { size: 18 })
          }
        ),
        multiple && /* @__PURE__ */ React14.createElement("section", { className: "py-[6px] px-[14px] flex justify-between items-center" }, /* @__PURE__ */ React14.createElement(
          "button",
          {
            type: "button",
            "aria-label": "Select all",
            onClick: handleSelectAll,
            className: "text-sm  hover:text-primary-700 text-primary-600 dark:text-primary-300 cursor-pointer"
          },
          "Select all"
        ), /* @__PURE__ */ React14.createElement(
          "button",
          {
            "aria-label": "Reset",
            type: "button",
            className: "text-sm text-warning-500 hover:text-warning-600",
            onClick: handleReset
          },
          "Reset"
        )),
        /* @__PURE__ */ React14.createElement(
          "section",
          {
            style: { maxHeight: height },
            className: "z-[1000] transition-all duration-75 delay-100 ease-in-out overflow-y-scroll"
          },
          options ? memoizedFilteredOptions?.map((option, i) => /* @__PURE__ */ React14.createElement(React14.Fragment, { key: `${option.value}-${i}` }, multiple ? /* @__PURE__ */ React14.createElement(
            Label_default,
            {
              className: cn(
                "flex flex-col cursor-pointer border-l-4 px-[14px] py-[6px]",
                "bg-white dark:bg-gray-900",
                "hover:bg-gray-50 dark:hover:bg-gray-800",
                "border-transparent",
                "has-[:checked]:bg-primary-50 dark:has-[:checked]:bg-gray-800",
                "has-[:checked]:border-primary-600",
                option.disabledOption && "opacity-50 cursor-not-allowed pointer-events-none"
              ),
              htmlFor: `${id}-checkbox-${option.value}`,
              key: i
            },
            /* @__PURE__ */ React14.createElement("section", { className: "flex items-center justify-between gap-2 w-full" }, /* @__PURE__ */ React14.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React14.createElement(
              Checkbox_default,
              {
                square: true,
                id: `${id}-checkbox-${option.value}`,
                checked: selected?.some(
                  (item) => item.value === option.value
                ) ?? false,
                onChange: () => toggleOption(option),
                disabled: !!option.disabledOption
              }
            ), /* @__PURE__ */ React14.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React14.createElement(
              "div",
              {
                style: {
                  color: option?.disabledOption ? "#D1D5DB" : option.labelTextColor
                },
                className: cn(
                  "break-words",
                  option?.disabledOption && "text-gray-300"
                )
              },
              renderItem(option, {
                selected: selected?.some(
                  (item) => item.value === option.value
                ) ?? false,
                disabled: !!option.disabledOption
              })
            ))), /* @__PURE__ */ React14.createElement("span", { className: "text-gray-500" }, option?.info)),
            /* @__PURE__ */ React14.createElement("span", { className: "pt-[2px] text-sm text-gray-500" }, option?.addInfo)
          ) : /* @__PURE__ */ React14.createElement(
            Label_default,
            {
              key: i,
              htmlFor: `${id}-checkbox-${option.value}`,
              className: cn(
                "flex justify-between items-center px-[14px] py-[6px] border-l-4 cursor-pointer",
                "bg-white dark:bg-gray-900",
                "hover:bg-gray-50 dark:hover:bg-gray-800",
                "border-transparent",
                selected?.[0]?.value === option.value && "bg-primary-50 dark:bg-gray-800 border-primary-600",
                option.disabledOption && "opacity-50 cursor-not-allowed pointer-events-none"
              ),
              onClick: () => !option?.disabledOption && toggleOption(option)
            },
            /* @__PURE__ */ React14.createElement(
              MenuItem,
              {
                label: option.label,
                selected: selected?.[0]?.value === option.value,
                disabled: !!option.disabledOption
              }
            ),
            /* @__PURE__ */ React14.createElement("span", { className: "text-gray-500" }, info)
          ))) : children
        ),
        footerAction && /* @__PURE__ */ React14.createElement("div", { className: "py-2 mt-1 px-2 border-t" }, footerAction),
        dropdownFooter && /* @__PURE__ */ React14.createElement(
          DropdownFooter,
          {
            setDropdownMenu,
            onApply
          }
        )
      )
    );
  }
);
var MenuItem = ({
  label,
  selected,
  disabled,
  children
}) => {
  return /* @__PURE__ */ React14.createElement(
    "p",
    {
      className: cn(
        "break-all transition-colors",
        "text-gray-900 dark:text-gray-100",
        selected && "text-gray-900 dark:text-white font-medium",
        disabled && "text-gray-300 dark:text-gray-500"
      )
    },
    label ?? children
  );
};
var DropdownFooter = ({
  onApply,
  setDropdownMenu
}) => {
  return /* @__PURE__ */ React14.createElement("div", { className: "flex justify-end border-t border-gray-200 dark:border-gray-700 px-[14px] py-[8px] text-sm" }, /* @__PURE__ */ React14.createElement(
    "button",
    {
      type: "button",
      className: "text-primary-600 dark:text-primary-300 hover:text-primary-700",
      onClick: () => {
        if (onApply) {
          onApply();
        }
        if (setDropdownMenu) {
          setDropdownMenu(false);
        }
      }
    },
    "Apply"
  ));
};
Dropdown.displayName = "Dropdown";
var Dropdown_default = Dropdown;

// src/components/DropdownMenu.tsx
import { HiChevronDown as HiChevronDown3 } from "react-icons/hi";
import React15, {
  useState as useState3,
  useRef as useRef2,
  useEffect as useEffect4,
  useCallback as useCallback3,
  Children,
  isValidElement,
  cloneElement
} from "react";
var isComponentType = (child, component) => {
  return child.type === component;
};
function DropdownMenu({
  children
}) {
  const [isOpen, setIsOpen] = useState3(false);
  const [focusedIndex, setFocusedIndex] = useState3(-1);
  const triggerRef = useRef2(null);
  const contentRef = useRef2(null);
  const menuItemsRef = useRef2([]);
  const itemsCountRef = useRef2(0);
  const registerItem = useCallback3(() => {
    const idx = itemsCountRef.current;
    itemsCountRef.current += 1;
    return idx;
  }, []);
  const closeMenu = useCallback3(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);
  const dropdownProps = {
    isOpen,
    setIsOpen,
    triggerRef,
    contentRef,
    registerItem,
    menuItemsRef,
    closeMenu
  };
  useEffect4(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (triggerRef.current && contentRef.current && !triggerRef.current.contains(e.target) && !contentRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, closeMenu]);
  useEffect4(() => {
    if (!isOpen) return;
    const handler = (e) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeMenu();
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((p) => p < itemsCountRef.current - 1 ? p + 1 : 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((p) => p > 0 ? p - 1 : itemsCountRef.current - 1);
          break;
        case "Home":
          setFocusedIndex(0);
          break;
        case "End":
          setFocusedIndex(itemsCountRef.current - 1);
          break;
      }
    };
    document.addEventListener("keydown", handler);
    setFocusedIndex(0);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeMenu]);
  useEffect4(() => {
    if (!isOpen) return;
    menuItemsRef.current[focusedIndex]?.focus();
  }, [focusedIndex, isOpen]);
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const childWithDisplayName = cloneElement(child, {
      ...child.props,
      dropdownProps
    });
    return childWithDisplayName;
  });
  return /* @__PURE__ */ React15.createElement("div", { className: "relative inline-block" }, enhancedChildren);
}
function DropdownMenuTrigger({
  children,
  dropdownProps
}) {
  const { isOpen, setIsOpen, triggerRef } = dropdownProps || {};
  if (!dropdownProps) {
    throw new Error("DropdownMenuTrigger must be used inside DropdownMenu");
  }
  return /* @__PURE__ */ React15.createElement(
    "div",
    {
      ref: triggerRef,
      tabIndex: 0,
      role: "button",
      "aria-haspopup": "menu",
      "aria-expanded": isOpen,
      onClick: () => setIsOpen?.(!isOpen),
      className: "cursor-pointer outline-none focus:ring-2 focus:ring-primary-500 rounded"
    },
    children
  );
}
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
function DropdownMenuContent({
  children,
  align = "right",
  className,
  dropdownProps
}) {
  const { isOpen, contentRef } = dropdownProps || {};
  const [visible, setVisible] = useState3(false);
  if (!dropdownProps) {
    throw new Error("DropdownMenuContent must be used inside DropdownMenu");
  }
  useEffect4(() => {
    let timer;
    if (isOpen) {
      setVisible(true);
    } else {
      timer = setTimeout(() => setVisible(false), 150);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);
  if (!visible) return null;
  const positionClasses2 = {
    left: "right-0",
    right: "left-0",
    start: "right-0",
    end: "left-0",
    center: "left-1/2 -translate-x-1/2",
    top: "bottom-full mb-2",
    bottom: "top-full mt-2"
  };
  const injectPropsToChildren = (children2) => {
    return Children.map(children2, (child) => {
      if (!isValidElement(child)) return child;
      const isMenuItem = isComponentType(child, DropdownMenuItem);
      const isSubMenu = isComponentType(child, DropdownMenuSub);
      if (isMenuItem || isSubMenu) {
        return cloneElement(child, {
          ...child.props,
          dropdownProps
        });
      }
      if (child.props.children) {
        return cloneElement(child, {
          ...child.props,
          children: injectPropsToChildren(child.props.children)
        });
      }
      return child;
    });
  };
  return /* @__PURE__ */ React15.createElement(
    "div",
    {
      ref: contentRef,
      role: "menu",
      className: cn(
        "absolute mt-2 w-56 rounded-md shadow-lg ring-1 ring-black/5 z-50 transition-all duration-150",
        "bg-white dark:bg-gray-900",
        "text-gray-700 dark:text-gray-200",
        "ring-black/5 dark:ring-white/10",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
        positionClasses2[align] || positionClasses2.right,
        className
      )
    },
    injectPropsToChildren(children)
  );
}
DropdownMenuContent.displayName = "DropdownMenuContent";
function DropdownMenuLabel({
  children,
  className
}) {
  return /* @__PURE__ */ React15.createElement(
    "div",
    {
      className: cn(
        "px-4 py-2 text-sm font-semibold",
        "text-gray-700 dark:text-gray-300",
        "bg-white dark:bg-gray-900",
        className
      )
    },
    children
  );
}
DropdownMenuLabel.displayName = "DropdownMenuLabel";
function DropdownMenuSeparator() {
  return /* @__PURE__ */ React15.createElement("div", { className: "border-t border-gray-50 dark:border-gray-700" });
}
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
function DropdownMenuItemWrapper({
  children,
  onClick,
  disabled,
  className,
  dropdownProps,
  closeOnClick = true,
  ariaExpanded
}) {
  const [index] = useState3(() => dropdownProps?.registerItem?.() ?? -1);
  const ref = useRef2(null);
  useEffect4(() => {
    if (index >= 0 && dropdownProps?.menuItemsRef) {
      dropdownProps.menuItemsRef.current[index] = ref.current;
    }
  }, [index, dropdownProps]);
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    if (closeOnClick) {
      dropdownProps?.closeMenu?.();
    }
  };
  return /* @__PURE__ */ React15.createElement(
    "div",
    {
      ref,
      role: "menuitem",
      tabIndex: disabled ? -1 : 0,
      "aria-expanded": ariaExpanded,
      "aria-disabled": disabled,
      onClick: handleClick,
      className: cn(
        "px-4 py-2 text-sm flex items-center justify-between cursor-pointer rounded outline-none",
        "text-gray-700 dark:text-gray-200",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:bg-gray-100 dark:focus:bg-gray-800",
        disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-800",
        // Selected state
        "data-[selected=true]:bg-primary-50 dark:data-[selected=true]:bg-primary-900/30",
        "data-[selected=true]:text-primary-700 dark:data-[selected=true]:text-primary-300",
        "data-[selected=true]:font-medium",
        className
      )
    },
    children
  );
}
function DropdownMenuItem({
  children,
  onClick,
  disabled,
  dropdownProps,
  className,
  selected
}) {
  return /* @__PURE__ */ React15.createElement(
    DropdownMenuItemWrapper,
    {
      className,
      disabled,
      onClick,
      closeOnClick: true,
      dropdownProps,
      ariaExpanded: selected
    },
    children
  );
}
DropdownMenuItem.displayName = "DropdownMenuItem";
function DropdownMenuSub({
  children,
  dropdownProps
}) {
  const [isSubOpen, setIsSubOpen] = useState3(false);
  const submenuProps = {
    isSubOpen,
    setIsSubOpen
  };
  const injectPropsToChildren = (children2) => {
    return Children.map(children2, (child) => {
      if (!isValidElement(child)) return child;
      const isSubTrigger = isComponentType(child, DropdownMenuSubTrigger);
      const isSubContent = isComponentType(child, DropdownMenuSubContent);
      const isMenuItem = isComponentType(child, DropdownMenuItem);
      const isNestedSubMenu = isComponentType(child, DropdownMenuSub);
      if (isSubTrigger || isSubContent || isMenuItem || isNestedSubMenu) {
        return cloneElement(child, {
          ...child.props,
          dropdownProps,
          // Always pass dropdownProps
          ...isSubTrigger || isSubContent ? { submenuProps } : {}
        });
      }
      if (child.props.children) {
        return cloneElement(child, {
          ...child.props,
          children: injectPropsToChildren(child.props.children)
        });
      }
      return child;
    });
  };
  return /* @__PURE__ */ React15.createElement("div", { className: "relative" }, injectPropsToChildren(children));
}
DropdownMenuSub.displayName = "DropdownMenuSub";
function DropdownMenuSubTrigger({
  children,
  submenuProps,
  dropdownProps,
  className
}) {
  return /* @__PURE__ */ React15.createElement(
    DropdownMenuItemWrapper,
    {
      dropdownProps,
      "aria-expanded": submenuProps?.isSubOpen,
      onClick: () => submenuProps?.setIsSubOpen?.(!submenuProps?.isSubOpen),
      closeOnClick: false,
      className
    },
    /* @__PURE__ */ React15.createElement("span", null, children),
    /* @__PURE__ */ React15.createElement(
      HiChevronDown3,
      {
        className: cn(
          "w-4 h-4 transition-transform duration-200",
          submenuProps?.isSubOpen ? "rotate-180" : "rotate-0"
        )
      }
    )
  );
}
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
function DropdownMenuSubContent({
  children,
  submenuProps,
  dropdownProps
}) {
  const injectPropsToChildren = (children2) => {
    return Children.map(children2, (child) => {
      if (!isValidElement(child)) return child;
      const isMenuItem = isComponentType(child, DropdownMenuItem);
      const isSubMenu = isComponentType(child, DropdownMenuSub);
      if (isMenuItem || isSubMenu) {
        return cloneElement(child, {
          ...child.props,
          dropdownProps
        });
      }
      if (child.props.children) {
        return cloneElement(child, {
          ...child.props,
          children: injectPropsToChildren(child.props.children)
        });
      }
      return child;
    });
  };
  return /* @__PURE__ */ React15.createElement(
    "div",
    {
      className: cn(
        "ml-4 overflow-hidden transition-all duration-200",
        "bg-white dark:bg-gray-900",
        submenuProps?.isSubOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )
    },
    injectPropsToChildren(children)
  );
}
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
DropdownMenu.displayName = "DropdownMenu";

// src/components/FileUploadControl.tsx
import React17, { useRef as useRef3, useState as useState4 } from "react";
import {
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineDocumentText,
  HiPhotograph,
  HiOutlineVideoCamera,
  HiOutlineCollection,
  HiCheck,
  HiX,
  HiOutlineFolderOpen,
  HiOutlineViewBoards,
  HiOutlineDocumentReport,
  HiOutlineDocumentAdd,
  HiOutlineMusicNote,
  HiOutlineEye
} from "react-icons/hi";

// src/components/Spinner.tsx
import React16 from "react";
var colorVars = {
  primary: {
    c1: "var(--primary-500)",
    c2: "var(--primary-200)"
  },
  black: {
    c1: "rgba(0, 0, 0, 1)",
    c2: "rgba(0, 0, 0, 0.5)"
  },
  gray: {
    c1: "var(--gray-500)",
    c2: "var(--gray-300)"
  }
};
var Spinner = ({ size = "md", color = "primary" }) => {
  const sizeClass = cn({
    "w-4 h-4": size === "xs",
    "w-6 h-6": size === "sm",
    "w-10 h-10": size === "md",
    "w-16 h-16": size === "lg"
  });
  const getColorValues = (color2) => {
    if (colorVars[color2]) {
      return colorVars[color2];
    }
    if (color2.startsWith("#")) {
      return {
        c1: color2,
        c2: `${color2}80`
      };
    }
    return colorVars.primary;
  };
  const colorValues = getColorValues(color);
  return /* @__PURE__ */ React16.createElement("div", { className: cn("relative", sizeClass) }, /* @__PURE__ */ React16.createElement(
    "div",
    {
      className: "spinner",
      style: {
        ["--spinner-color-1"]: colorValues.c1,
        ["--spinner-color-2"]: colorValues.c2
      }
    }
  ));
};
var Spinner_default = Spinner;

// src/components/FileUploadControl.tsx
var fileSvg = () => {
  return /* @__PURE__ */ React17.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "40",
      height: "55",
      viewBox: "0 0 36 47",
      fill: "none"
    },
    /* @__PURE__ */ React17.createElement(
      "path",
      {
        d: "M0 8.72494C0 5.48487 2.6266 2.85828 5.86667 2.85828H20.5333L33 15.8583V40.9916C33 44.2317 30.3734 46.8583 27.1333 46.8583H5.86667C2.6266 46.8583 0 44.2317 0 40.9916V8.72494Z",
        fill: "var(--primary-600)"
      }
    ),
    /* @__PURE__ */ React17.createElement("g", { filter: "url(#filter0_d_5101_541)" }, /* @__PURE__ */ React17.createElement(
      "path",
      {
        d: "M20.5334 13.4052V2.85828L33 15.8582L22.974 15.8482C21.6257 15.8469 20.5334 14.7535 20.5334 13.4052Z",
        fill: "var(--primary-300)"
      }
    )),
    /* @__PURE__ */ React17.createElement("defs", null, /* @__PURE__ */ React17.createElement(
      "filter",
      {
        id: "filter0_d_5101_541",
        x: "14.7435",
        y: "-2.98023e-05",
        width: "21.1148",
        height: "21.6482",
        filterUnits: "userSpaceOnUse",
        colorInterpolationFilters: "sRGB"
      },
      /* @__PURE__ */ React17.createElement("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
      /* @__PURE__ */ React17.createElement(
        "feColorMatrix",
        {
          in: "SourceAlpha",
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
          result: "hardAlpha"
        }
      ),
      /* @__PURE__ */ React17.createElement("feOffset", { dx: "-1.4658", dy: "1.4658" }),
      /* @__PURE__ */ React17.createElement("feGaussianBlur", { stdDeviation: "2.16205" }),
      /* @__PURE__ */ React17.createElement("feComposite", { in2: "hardAlpha", operator: "out" }),
      /* @__PURE__ */ React17.createElement(
        "feColorMatrix",
        {
          type: "matrix",
          values: "0 0 0 0 0.0417487 0 0 0 0 0.107741 0 0 0 0 0.401705 0 0 0 0.07 0"
        }
      ),
      /* @__PURE__ */ React17.createElement(
        "feBlend",
        {
          mode: "normal",
          in2: "BackgroundImageFix",
          result: "effect1_dropShadow_5101_541"
        }
      ),
      /* @__PURE__ */ React17.createElement(
        "feBlend",
        {
          mode: "normal",
          in: "SourceGraphic",
          in2: "effect1_dropShadow_5101_541",
          result: "shape"
        }
      )
    ))
  );
};
var defaultGetFileIcon = (fileName, fileType) => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  if (fileType.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiPhotograph, { className: "w-5 h-5 text-white" });
  }
  if (fileType.startsWith("audio/") || ["mp3", "wav", "ogg", "m4a"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiOutlineMusicNote, { className: "w-5 h-5 text-white" });
  }
  if (fileType.startsWith("video/") || ["mp4", "avi", "mkv", "mov", "wmv"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiOutlineVideoCamera, { className: "w-5 h-5 text-white" });
  }
  if (fileType.includes("excel") || ["xls", "xlsx", "csv", "txt", "ods"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiOutlineDocumentAdd, { className: "w-5 h-5 text-white" });
  }
  if (fileType.includes("word") || ["doc", "docx", "odt", "xml"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiOutlineDocumentReport, { className: "w-5 h-5 text-white" });
  }
  if (["pptx", "pptm", "xps", "ppsx"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiOutlineViewBoards, { className: "w-5 h-5 text-white" });
  }
  if (fileType.includes("zip") || ["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return /* @__PURE__ */ React17.createElement(HiOutlineCollection, { className: "w-5 h-5 text-white" });
  }
  if (fileType === "application/pdf" || extension === "pdf") {
    return /* @__PURE__ */ React17.createElement(HiOutlineFolderOpen, { className: "w-5 h-5 text-white" });
  }
  return /* @__PURE__ */ React17.createElement(HiOutlineDocumentText, { className: "w-5 h-5 text-white" });
};
function FileUploadControl({
  items,
  onAddFiles,
  onUpdateItem,
  onDelete,
  onRetry,
  onPreview,
  onUpload,
  multiple = true,
  accept = "image/*",
  maxSizeMB = 15,
  className = "",
  hintText,
  showSizeText = true,
  getFileIcon = defaultGetFileIcon,
  autoUpload = true,
  disabled
}) {
  const inputRef = useRef3(null);
  const [isDragging, setIsDragging] = useState4(false);
  const localPreviews = useRef3(/* @__PURE__ */ new Map());
  const uploadProgress = useRef3(/* @__PURE__ */ new Map());
  const inputId = React17.useId();
  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    return `${Math.round(bytes / 1024)} KB`;
  };
  const getStatusDisplay = (status) => {
    switch (status) {
      case "uploading":
        return {
          text: "Uploading",
          color: "text-blue-600",
          showSpinner: true,
          icon: /* @__PURE__ */ React17.createElement(Spinner_default, { size: "xs", color: "gray" }),
          canPreview: false
        };
      case "success":
        return {
          text: "Completed",
          color: "text-green-600",
          showSpinner: false,
          icon: /* @__PURE__ */ React17.createElement(HiCheck, { className: "w-3 h-3 text-white" }),
          canPreview: true
        };
      case "error":
        return {
          text: "Failed",
          color: "text-red-600",
          showSpinner: false,
          icon: /* @__PURE__ */ React17.createElement(HiX, { className: "w-3 h-3 text-white" }),
          canPreview: false
        };
      default:
        return {
          text: "",
          color: "",
          showSpinner: false,
          icon: null,
          canPreview: false
        };
    }
  };
  const getProgressColor = (status) => {
    switch (status) {
      case "uploading":
        return "bg-blue-500";
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };
  const getItemFileIcon = (item) => {
    const fileName = item.name || item.file?.name || "";
    const fileType = item.file?.type || "";
    return getFileIcon(fileName, fileType);
  };
  const handleUpload = React17.useCallback(
    async (item) => {
      if (!item.file || !onUpload || item.status === "success" || item.status === "uploading") {
        return;
      }
      try {
        if (onUpdateItem) {
          onUpdateItem(item.id, { status: "uploading", progress: 0 });
        }
        uploadProgress.current.delete(item.id);
        const previewUrl = await onUpload(item.file, (progress) => {
          const clampedProgress = Math.min(100, Math.max(0, progress));
          uploadProgress.current.set(item.id, clampedProgress);
          if (onUpdateItem) {
            onUpdateItem(item.id, {
              progress: clampedProgress,
              status: "uploading"
            });
          }
        });
        if (onUpdateItem) {
          onUpdateItem(item.id, {
            progress: 100,
            status: "success",
            previewUrl
          });
        }
        uploadProgress.current.delete(item.id);
      } catch (error) {
        console.error("Upload error:", error);
        if (onUpdateItem) {
          onUpdateItem(item.id, {
            progress: 0,
            status: "error"
          });
        }
        uploadProgress.current.delete(item.id);
      }
    },
    [onUpload, onUpdateItem]
  );
  const getCurrentProgress = (item) => {
    if (item.status === "success") return 100;
    if (item.status === "error") return 0;
    return uploadProgress.current.get(item.id) ?? item.progress ?? 0;
  };
  const handleRetry = (id) => {
    const item = items.find((item2) => item2.id === id);
    if (item && onUpload) {
      handleUpload(item);
    } else if (onRetry) {
      onRetry(id);
    }
  };
  const handleDelete = (id) => {
    if (localPreviews.current.has(id)) {
      const url = localPreviews.current.get(id);
      if (url) URL.revokeObjectURL(url);
      localPreviews.current.delete(id);
    }
    uploadProgress.current.delete(id);
    if (onDelete) {
      onDelete(id);
    }
  };
  const triggerInput = () => inputRef.current?.click();
  const handleInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const validFiles = files.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );
    if (validFiles.length === 0) return;
    onAddFiles(multiple ? validFiles : [validFiles[0]]);
    e.target.value = "";
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    const validFiles = files.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );
    if (validFiles.length > 0) {
      onAddFiles(multiple ? validFiles : [validFiles[0]]);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.target === e.currentTarget) {
        triggerInput();
      }
    }
  };
  React17.useEffect(() => {
    if (autoUpload && onUpload) {
      items.forEach((item) => {
        if (item.status === "idle" && item.file) {
          handleUpload(item);
        }
      });
    }
  }, [items, autoUpload, onUpload, handleUpload]);
  React17.useEffect(() => {
    const previews = localPreviews?.current;
    return () => {
      previews?.forEach((url) => URL?.revokeObjectURL(url));
    };
  }, []);
  return /* @__PURE__ */ React17.createElement("div", { className: `w-full` }, /* @__PURE__ */ React17.createElement(
    "input",
    {
      id: inputId,
      ref: inputRef,
      type: "file",
      accept,
      multiple,
      hidden: true,
      onChange: handleInputChange,
      disabled
    }
  ), /* @__PURE__ */ React17.createElement(
    Label_default,
    {
      htmlFor: inputId,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onKeyDown: handleKeyDown,
      tabIndex: 0,
      role: "button",
      disabled: disabled ?? false,
      "aria-label": `Upload ${multiple ? "images" : "an image"}`,
      className: cn(
        "max-w-[564px] w-full bg-white dark:bg-gray-900 py-4 flex items-center justify-center rounded-lg border cursor-pointer transition-all",
        isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-800 dark:border-blue-400" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700",
        disabled && "pointer-events-none cursor-not-allowed",
        className
      )
    },
    /* @__PURE__ */ React17.createElement("div", { className: "flex items-center gap-3 text-center" }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-300" }, "Drag files here or", /* @__PURE__ */ React17.createElement("span", { className: "text-primary-600 dark:text-primary-400 font-semibold ml-1" }, "Upload"), " ", /* @__PURE__ */ React17.createElement("br", null))))
  ), /* @__PURE__ */ React17.createElement("span", { className: "text-xs text-gray-600 font-medium dark:text-gray-400" }, hintText ?? `Only PNG, JPG, GIF. Max file size ${maxSizeMB}MB`), /* @__PURE__ */ React17.createElement("div", { className: "flex flex-col gap-4 mt-4" }, items?.map((item) => {
    const progress = getCurrentProgress(item);
    const statusInfo = getStatusDisplay(item.status);
    const progressColor = getProgressColor(item?.status);
    const fileIcon = getItemFileIcon(item);
    return /* @__PURE__ */ React17.createElement(
      "div",
      {
        key: item?.id,
        className: "flex items-center gap-2 bg-white dark:bg-gray-900 max-w-[564px] w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700"
      },
      /* @__PURE__ */ React17.createElement("div", { className: "w-14 h-14 flex-shrink-0 rounded-md overflow-hidden relative" }, /* @__PURE__ */ React17.createElement("div", { className: "absolute inset-0 w-full h-full object-contain" }, fileSvg()), /* @__PURE__ */ React17.createElement("div", { className: "relative z-10 top-2 -left-2.5  flex items-center justify-center w-full h-full text-white" }, fileIcon)),
      /* @__PURE__ */ React17.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React17.createElement("div", { className: "flex items-start justify-between gap-2 mb-3" }, /* @__PURE__ */ React17.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React17.createElement("h4", { className: "text-sm font-medium text-gray-900 dark:text-gray-100 truncate" }, item?.name || item.file?.name || "Unnamed file"), showSizeText && /* @__PURE__ */ React17.createElement("div", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1" }, formatSize(item?.size || item.file?.size), statusInfo.text && /* @__PURE__ */ React17.createElement("div", { className: "ml-2 font-medium flex items-center gap-1" }, statusInfo?.showSpinner ? /* @__PURE__ */ React17.createElement(React17.Fragment, null, statusInfo.icon, /* @__PURE__ */ React17.createElement("span", { className: statusInfo.color }, statusInfo.text)) : /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement(
        "div",
        {
          className: `w-4 h-4 rounded-full flex justify-center items-center ${statusInfo?.color === "text-red-600" ? "bg-red-600" : statusInfo?.color === "text-green-600" ? "bg-green-600" : "bg-gray-400"}`
        },
        statusInfo?.icon
      ), /* @__PURE__ */ React17.createElement("span", { className: statusInfo.color }, statusInfo?.text))))), /* @__PURE__ */ React17.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React17.createElement("div", { className: "flex items-center gap-2" }, onPreview && item?.status === "success" && /* @__PURE__ */ React17.createElement(
        "button",
        {
          type: "button",
          onClick: () => onPreview(item.id),
          className: "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400",
          title: "Preview"
        },
        /* @__PURE__ */ React17.createElement(HiOutlineEye, { size: 16 })
      ), item?.status === "error" && /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("span", { className: "hidden sm:inline-block" }, /* @__PURE__ */ React17.createElement(
        Button_default,
        {
          variant: "primary",
          type: "button",
          size: "sm",
          onClick: () => handleRetry(item?.id),
          className: "whitespace-nowrap h-[30px] text-sm px-[6px]"
        },
        /* @__PURE__ */ React17.createElement(HiOutlineRefresh, { size: 16 }),
        "Try Again"
      )), /* @__PURE__ */ React17.createElement("span", { className: "sm:hidden" }, /* @__PURE__ */ React17.createElement(
        Button_default,
        {
          variant: "primary-light",
          type: "button",
          size: "sm",
          onClick: () => handleRetry(item?.id),
          className: "h-[30px] px-1 py-1"
        },
        /* @__PURE__ */ React17.createElement(HiOutlineRefresh, { size: 16 })
      ))), /* @__PURE__ */ React17.createElement(
        "button",
        {
          type: "button",
          onClick: () => handleDelete(item.id),
          className: "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400",
          title: "Delete"
        },
        /* @__PURE__ */ React17.createElement(HiOutlineTrash, { size: 16 })
      )))), /* @__PURE__ */ React17.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React17.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React17.createElement("div", { className: "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" }, /* @__PURE__ */ React17.createElement(
        "div",
        {
          className: `h-full rounded-full transition-all duration-300 ease-out ${progressColor}`,
          style: { width: `${progress}%` }
        }
      ))), /* @__PURE__ */ React17.createElement("div", { className: "text-xs text-gray-500 dark:text-gray-400 w-12 text-right" }, item.status === "error" ? "--%" : item.status === "success" ? "100%" : `${Math.round(progress)}%`)))
    );
  })));
}

// src/components/FillButton.tsx
import React18 from "react";
var FillButton = ({
  label,
  icon: Icon,
  fillColor = "bg-white",
  textHoverColor = "group-hover:text-primary-900",
  className,
  ...props
}) => {
  return /* @__PURE__ */ React18.createElement(
    "button",
    {
      ...props,
      className: cn(
        "relative overflow-hidden group px-6 py-4 rounded-full flex text-dark dark:text-light items-center gap-2 w-full justify-between border dark:border-gray-400 transition-colors",
        className
      )
    },
    /* @__PURE__ */ React18.createElement(
      "span",
      {
        className: cn(
          "absolute inset-0 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100",
          fillColor
        )
      }
    ),
    /* @__PURE__ */ React18.createElement("span", { className: cn("relative z-10 transition-colors", textHoverColor) }, label),
    Icon && /* @__PURE__ */ React18.createElement(
      Icon,
      {
        size: 18,
        className: cn("relative z-10 transition-colors", textHoverColor)
      }
    )
  );
};
var FillButton_default = FillButton;

// src/components/FloatingButton.tsx
import React19 from "react";
var positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2"
};
var floatingSizeClasses = {
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-16 w-16"
};
var FloatingButton = ({
  position = "bottom-right",
  className,
  rounded = true,
  size = "md",
  variant = "primary",
  ...props
}) => {
  const resolvedSize = size ?? "md";
  return /* @__PURE__ */ React19.createElement(
    Button_default,
    {
      ...props,
      size: resolvedSize,
      variant,
      rounded,
      className: cn(
        "fixed z-[100000000] shadow-lg flex items-center justify-center !p-0",
        "active:scale-95 transition-all",
        floatingSizeClasses[resolvedSize],
        positionClasses[position],
        className
      )
    }
  );
};
var FloatingButton_default = FloatingButton;

// src/components/Footer.tsx
import React20 from "react";
import Link from "next/link";
function Footer({
  children,
  className,
  footerBottom
}) {
  return /* @__PURE__ */ React20.createElement(
    "footer",
    {
      className: cn(
        "bg-gradient-to-b from-gray-25 to-primary-100 dark:from-primary-900 dark:to-dark",
        className
      )
    },
    children,
    footerBottom && /* @__PURE__ */ React20.createElement("section", { className: "border-t border-primary-500 dark:border-primary-800 text-center py-spacing-md" }, footerBottom)
  );
}
var FooterHeader = ({ children, className }) => {
  return /* @__PURE__ */ React20.createElement(
    "div",
    {
      className: cn(
        "md:w-[30%] space-y-4 flex flex-col items-center lg:items-start",
        className
      )
    },
    children
  );
};
var FooterContent = ({ children, className }) => {
  return /* @__PURE__ */ React20.createElement(
    "section",
    {
      className: cn(
        "max-w-6xl mx-auto flex md:flex-row flex-col items-center md:items-start justify-between gap-14 px-4 md:px-20 py-20",
        className
      )
    },
    children
  );
};
var FooterList = ({ footerItems, target }) => {
  return /* @__PURE__ */ React20.createElement(
    "div",
    {
      className: cn(
        "grid place-items-start gap-8 text-center md:text-left",
        footerItems.length === 2 && "md:grid-cols-2",
        (footerItems.length > 3 || footerItems.length === 3) && "lg:grid-cols-3 md:grid-cols-2"
      )
    },
    footerItems?.map((data, i) => /* @__PURE__ */ React20.createElement("div", { key: i, className: "space-y-3 w-full" }, /* @__PURE__ */ React20.createElement(Paragraph_default, { variant: "b3", className: "text-primary-600" }, data?.label), /* @__PURE__ */ React20.createElement("ul", { className: "space-y-2 list-none" }, data?.content?.map((data2, i2) => /* @__PURE__ */ React20.createElement("li", { key: i2 }, /* @__PURE__ */ React20.createElement(Link, { href: data2?.link, target }, /* @__PURE__ */ React20.createElement(
      Paragraph_default,
      {
        variant: "b4",
        className: "dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-600 font-semibold text-gray-900"
      },
      data2?.text
    )))))))
  );
};
var FooterIcons = ({ icons }) => {
  return /* @__PURE__ */ React20.createElement("div", { className: "flex flex-wrap justify-center items-center gap-5 text-primary-700 dark:text-primary-200" }, icons.map((icon, index) => /* @__PURE__ */ React20.createElement(
    Link,
    {
      href: icon.link,
      key: index,
      target: "_blank",
      className: "hover:bg-primary-100 dark:hover:bg-primary-800 p-1 rounded-radius-sm"
    },
    icon.icon
  )));
};

// src/components/ImageCard.tsx
import React21 from "react";
var ImageCard = ({
  cardTitle,
  cardDesc,
  cardImg,
  children,
  className = ""
}) => {
  const backgroundImage = `url('${cardImg}')`;
  return /* @__PURE__ */ React21.createElement(
    "div",
    {
      className: cn(
        "transition-all duration-300 ease-in-out hover:ring-1 hover:ring-[#4285F4] relative rounded-radius-xl overflow-hidden block z-10 bg-cover bg-no-repeat bg-center",
        className
      ),
      style: {
        backgroundImage
      }
    },
    /* @__PURE__ */ React21.createElement("div", { className: "absolute inset-0 z-[-5] transition-all duration-300 ease-in-out bg-gradient-to-b from-transparent via-black/50 to-black" }),
    /* @__PURE__ */ React21.createElement("section", { className: "p-[32px] w-full h-full flex flex-col justify-end font-karla hover:bg-gradient-to-b hover:from-black/60 hover:via-black/70 hover:to-[#070707]" }, /* @__PURE__ */ React21.createElement(CardTitle, { className: "text-[24px] font-bold text-white mt-4 mb-6" }, cardTitle), /* @__PURE__ */ React21.createElement(CardDescription, { className: "text-[20px] leading-[25px] text-white" }, cardDesc), /* @__PURE__ */ React21.createElement("div", null, children))
  );
};
var ImageCard_default = ImageCard;

// src/components/ListItem.tsx
import Link2 from "next/link";
import React22 from "react";
import { usePathname } from "next/navigation";
var ListItem = React22.forwardRef(
  ({ className, title, href, onClick, as = "link", variant = "solid", icon }, ref) => {
    const pathname = usePathname();
    const isActive = as === "link" && href === pathname;
    const variantClasses = variant === "solid" ? "rounded-radius-lg hover:bg-primary-50 text-dark group border border-transparent hover:border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:text-white leading-none no-underline outline-none transition-colors" : variant === "glass" ? "rounded-radius-lg group border border-transparent hover:border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:text-white leading-none no-underline outline-none transition-colors" : "";
    if (as === "button") {
      return /* @__PURE__ */ React22.createElement(
        "button",
        {
          className: cn(
            "px-4 py-[8px] group font-karla w-full text-left flex items-center gap-2",
            variantClasses,
            className
          ),
          onClick,
          ref
        },
        /* @__PURE__ */ React22.createElement(
          Typography_default,
          {
            variant: "h6",
            className: cn("font-karla group-hover:dark:text-dark", className)
          },
          title
        ),
        icon && /* @__PURE__ */ React22.createElement("span", { className: "text-dark dark:text-white" }, icon)
      );
    }
    return /* @__PURE__ */ React22.createElement(
      Link2,
      {
        href: href ?? "",
        passHref: true,
        className: cn(
          "px-4 py-[8px] font-karla w-full flex items-center gap-2 group",
          isActive ? "bg-primary-400 text-white border border-primary-200" : variantClasses,
          className
        ),
        ref
      },
      /* @__PURE__ */ React22.createElement(
        Typography_default,
        {
          variant: "h6",
          className: cn("font-karla group-hover:dark:text-dark", className)
        },
        title
      ),
      icon && /* @__PURE__ */ React22.createElement(
        Caption_default,
        {
          variant: "md",
          className: "text-dark dark:text-white group-hover:dark:text-dark"
        },
        icon
      )
    );
  }
);
ListItem.displayName = "ListItem";
var ListItem_default = ListItem;

// src/components/ListPagination.tsx
import React23, { useState as useState5 } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
var ListPagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  className
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const [expanded, setExpanded] = useState5(false);
  const renderPages = () => {
    if (totalPages <= 6 || expanded) {
      return [...Array(totalPages)].map((_, i) => /* @__PURE__ */ React23.createElement(PageBtn, { key: i, i, page, onPageChange }));
    }
    const start = [0, 1];
    const mid = [page - 1, page, page + 1].filter(
      (i) => i > 1 && i < totalPages - 2
    );
    const end = [totalPages - 2, totalPages - 1];
    const range = Array.from(/* @__PURE__ */ new Set([...start, ...mid, ...end]));
    return range.map(
      (i, idx) => typeof range[idx - 1] === "number" && i - range[idx - 1] > 1 ? /* @__PURE__ */ React23.createElement(
        Button_default,
        {
          key: `dots-${i}`,
          size: "sm",
          variant: "secondary",
          onClick: () => setExpanded(true)
        },
        "..."
      ) : /* @__PURE__ */ React23.createElement(PageBtn, { key: i, i, page, onPageChange })
    );
  };
  return /* @__PURE__ */ React23.createElement("section", { className: cn("flex items-center gap-1", className) }, /* @__PURE__ */ React23.createElement(
    NavBtn,
    {
      icon: /* @__PURE__ */ React23.createElement(RiArrowLeftSLine, { size: 28 }),
      onClick: () => onPageChange(page - 1),
      disabled: page === 0
    }
  ), /* @__PURE__ */ React23.createElement("div", { className: "max-w-[90vw] w-max overflow-auto flex items-center gap-2 p-2" }, renderPages()), /* @__PURE__ */ React23.createElement(
    NavBtn,
    {
      icon: /* @__PURE__ */ React23.createElement(RiArrowRightSLine, { size: 28 }),
      onClick: () => onPageChange(page + 1),
      disabled: page === totalPages - 1
    }
  ));
};
var PageBtn = ({
  i,
  page,
  onPageChange
}) => /* @__PURE__ */ React23.createElement(
  Button_default,
  {
    size: "sm",
    variant: "secondary",
    className: cn(
      // "dark:bg-transparent dark:border dark:text-gray-300 dark:border-gray-400",
      i === page && "bg-primary-50 shadow-[0px_0px_0px_2px] shadow-primary-700 hover:shadow-[0px_0px_0px_2px] hover:shadow-primary-700 dark:shadow-primary-200 dark:bg-primary-300"
    ),
    onClick: () => onPageChange(i)
  },
  i + 1
);
var NavBtn = ({
  icon,
  onClick,
  disabled
}) => /* @__PURE__ */ React23.createElement(
  Button_default,
  {
    size: "sm",
    variant: "primary-light",
    startIcon: icon,
    onClick,
    disabled,
    className: "border border-primary-100 px-1.5"
  }
);
var ListPagination_default = ListPagination;

// src/components/Loading.tsx
import React24 from "react";
var Loading = ({ width, height, loaderColor, variant }) => {
  return /* @__PURE__ */ React24.createElement(
    "div",
    {
      className: cn(
        "animate-spin-slow border-primary-600 border-t-gray-200/50 rounded-full",
        variant === "light" ? "border-2" : "border-4"
      ),
      style: {
        width,
        height,
        borderColor: loaderColor,
        borderTopColor: "rgb(234 236 240 / 0.5)"
      }
    }
  );
};
var Loading_default = Loading;

// src/components/Modal.tsx
import React25, { useEffect as useEffect5 } from "react";
import { RiCloseLine as RiCloseLine2 } from "react-icons/ri";
function Modal({
  children,
  showModal,
  setShowModal,
  closeModal = true,
  closeOnOutsideClick = true,
  className = "",
  width = "50%"
}) {
  useEffect5(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget && closeOnOutsideClick) {
      setShowModal(false);
    }
  };
  return /* @__PURE__ */ React25.createElement(React25.Fragment, null, showModal && /* @__PURE__ */ React25.createElement(
    "div",
    {
      onClick: handleClickOutside,
      className: "w-full h-full bg-backdrop dark:bg-white/25 bg-blend-overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[1000000] overflow-hidden"
    },
    /* @__PURE__ */ React25.createElement(
      "div",
      {
        style: { width },
        className: cn(
          "relative bg-white dark:bg-dark shadow-boxShadow rounded-xl p-[18px] transition-all duration-150 fade-in-grow mx-4",
          className
        )
      },
      /* @__PURE__ */ React25.createElement("div", null, children),
      closeModal && /* @__PURE__ */ React25.createElement(
        "div",
        {
          className: "absolute top-4 ml-5 right-5 z-10 shadow-backdrop dark:text-white dark:hover:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-100",
          onClick: () => setShowModal(false)
        },
        /* @__PURE__ */ React25.createElement(RiCloseLine2, { size: 24 })
      )
    )
  ));
}

// src/components/NestedDropdown.tsx
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import React26, {
  useState as useState6,
  useRef as useRef4,
  useEffect as useEffect6,
  useCallback as useCallback4,
  useMemo as useMemo2
} from "react";
var flattenData = (items, getChildren, parentPath = []) => {
  return items.reduce(
    (acc, item) => {
      const currentPath = [...parentPath, item];
      acc.push({ item, path: currentPath });
      const children = getChildren(item);
      if (children && children.length > 0) {
        acc.push(...flattenData(children, getChildren, currentPath));
      }
      return acc;
    },
    []
  );
};
var NestedDropdown = ({
  data,
  onSelect,
  placeholder = "Select",
  className,
  maxHeight = 200,
  getChildren = (item) => item.children
}) => {
  const [isOpen, setIsOpen] = useState6(false);
  const [selectedItem, setSelectedItem] = useState6(null);
  const [activePath, setActivePath] = useState6([]);
  const [searchQuery, setSearchQuery] = useState6("");
  const [focusedIndex, setFocusedIndex] = useState6(null);
  const dropdownRef = useRef4(null);
  const searchInputRef = useRef4(null);
  const itemRefs = useRef4(/* @__PURE__ */ new Map());
  const flattenedData = useMemo2(
    () => flattenData(data, getChildren),
    [data, getChildren]
  );
  const filteredData = useMemo2(() => {
    if (!searchQuery?.trim()) return data;
    const searchLower = searchQuery.toLowerCase();
    const matchingItems = flattenedData?.filter(
      ({ item }) => String(item.name).toLowerCase().includes(searchLower)
    );
    const rootIds = /* @__PURE__ */ new Set();
    matchingItems.forEach(({ path }) => {
      if (path[0]) rootIds.add(path[0]._id);
    });
    return data.filter((item) => rootIds.has(item._id));
  }, [data, flattenedData, searchQuery]);
  const getCurrentLevelData = useCallback4(() => {
    let currentData = filteredData;
    for (let i = 0; i < activePath?.length; i++) {
      const pathItem = activePath[i];
      const children = getChildren(pathItem);
      if (children && children.length > 0) {
        if (searchQuery.trim()) {
          const childIds = flattenedData.filter(({ path }) => path[i + 1] && path[i]._id === pathItem._id).map(({ item }) => item._id);
          currentData = children.filter(
            (child) => childIds.includes(child._id)
          );
        } else {
          currentData = children;
        }
      } else {
        break;
      }
    }
    return currentData;
  }, [filteredData, activePath, getChildren, flattenedData, searchQuery]);
  useEffect6(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActivePath([]);
        setSearchQuery("");
        setFocusedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect6(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);
  useEffect6(() => {
    setFocusedIndex(null);
  }, [activePath, searchQuery]);
  useEffect6(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      const currentLevelData = getCurrentLevelData();
      if (currentLevelData.length === 0) return;
      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          setActivePath([]);
          setSearchQuery("");
          setFocusedIndex(null);
          break;
        case "Tab":
          if (!e.shiftKey && focusedIndex === null) {
            e.preventDefault();
            setFocusedIndex({ level: activePath.length, index: 0 });
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          handleArrowNavigation(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          handleArrowNavigation(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          handleArrowNavigation(0, "right");
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (activePath.length > 0) {
            setActivePath((prev) => prev.slice(0, -1));
          }
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex) {
            const { level, index } = focusedIndex;
            const currentLevelData2 = getCurrentLevelData();
            const item = currentLevelData2[index];
            if (item) {
              handleCategoryClick(item, level);
            }
          }
          break;
      }
    };
    const handleArrowNavigation = (direction, horizontal) => {
      const currentLevelData = getCurrentLevelData();
      if (currentLevelData.length === 0) return;
      if (horizontal === "right") {
        const item2 = currentLevelData[focusedIndex?.index || 0];
        if (item2) {
          const children = getChildren(item2);
          if (children && children.length > 0) {
            handleCategoryClick(item2, activePath.length);
          }
        }
        return;
      }
      const currentIndex = focusedIndex?.index ?? -1;
      const newIndex = Math.max(
        0,
        Math.min(currentLevelData.length - 1, currentIndex + direction)
      );
      setFocusedIndex({ level: activePath.length, index: newIndex });
      const item = currentLevelData[newIndex];
      if (item) {
        const key = `${activePath.length}-${item._id}`;
        const element = itemRefs.current.get(key);
        element?.scrollIntoView({ block: "nearest" });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, activePath, getCurrentLevelData, getChildren]);
  const handleItemClick = (item, path) => {
    setSelectedItem(item);
    setIsOpen(false);
    setActivePath([]);
    setSearchQuery("");
    setFocusedIndex(null);
    onSelect?.(item, path);
  };
  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      setActivePath([]);
      setSearchQuery("");
      setFocusedIndex(null);
    }
  };
  const handleCategoryClick = useCallback4(
    (item, level, event) => {
      const children = getChildren(item);
      const currentPath = activePath.slice(0, level);
      currentPath[level] = item;
      const isDoubleClick = event?.detail === 2;
      if (children && children.length > 0 && !isDoubleClick) {
        setActivePath(currentPath);
      } else {
        handleItemClick(item, [...currentPath]);
      }
    },
    [activePath, getChildren]
  );
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActivePath([]);
    setFocusedIndex(null);
  };
  const handleItemFocus = (level, index) => {
    setFocusedIndex({ level, index });
  };
  const renderDropdownItems = (items, level) => {
    const currentData = items || [];
    return currentData.map((item, index) => {
      const children = getChildren(item);
      const hasChildren = children && children.length > 0;
      const isActive = activePath[level]?._id === item._id;
      const isFocused = focusedIndex?.level === level && focusedIndex.index === index;
      const itemKey = `${level}-${item._id}`;
      return /* @__PURE__ */ React26.createElement(
        "div",
        {
          key: item._id,
          ref: (el) => {
            if (el) {
              itemRefs.current.set(itemKey, el);
            } else {
              itemRefs.current.delete(itemKey);
            }
          },
          className: cn(
            "group flex items-center justify-between py-2 px-3 border border-transparent cursor-pointer",
            "transition-colors duration-200 relative",
            isActive ? "bg-primary-50 dark:bg-primary-900/40 text-primary-700 border border-primary-200 dark:border-primary-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            // isFocused && "ring-1 ring-primary-500 dark:ring-primary-400",
          ),
          onClick: (e) => handleCategoryClick(item, level, e),
          onMouseEnter: () => handleItemFocus(level, index),
          tabIndex: isFocused ? 0 : -1
        },
        /* @__PURE__ */ React26.createElement(
          "span",
          {
            className: cn(
              "text-sm",
              isActive ? "text-gray-900 dark:text-black font-medium" : "text-gray-800 dark:text-gray-200"
            )
          },
          item.name
        ),
        hasChildren && /* @__PURE__ */ React26.createElement(React26.Fragment, null, /* @__PURE__ */ React26.createElement(FiChevronRight, { className: "w-4 h-4 text-gray-400" }), /* @__PURE__ */ React26.createElement("div", { className: "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10" }, "Double-click to select", /* @__PURE__ */ React26.createElement("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800" })))
      );
    });
  };
  return /* @__PURE__ */ React26.createElement(
    "div",
    {
      className: cn("relative w-full max-w-[200px]", className),
      ref: dropdownRef
    },
    /* @__PURE__ */ React26.createElement(
      "button",
      {
        type: "button",
        className: cn(
          "w-full flex justify-between items-center py-2 px-3 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-500 hover:border-gray-400 transition-colors duration-200"
        ),
        onClick: toggleDropdown,
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen
      },
      /* @__PURE__ */ React26.createElement(
        "span",
        {
          className: cn(
            "whitespace-nowrap text-ellipsis overflow-hidden w-[180px]",
            selectedItem ? "font-medium text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
          )
        },
        selectedItem ? selectedItem.name : placeholder
      ),
      /* @__PURE__ */ React26.createElement(
        FiChevronDown,
        {
          className: `w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
        }
      )
    ),
    isOpen && /* @__PURE__ */ React26.createElement(
      "div",
      {
        className: "absolute z-50 w-[200px] mt-1 bg-white dark:bg-gray-900 rounded-lg rounded-b-lg border border-primary-600 shadow-xl max-h-96",
        role: "listbox"
      },
      /* @__PURE__ */ React26.createElement("div", { className: "flex flex-col h-full" }, /* @__PURE__ */ React26.createElement("div", { className: "border-b border-gray-200 dark:border-gray-700 " }, /* @__PURE__ */ React26.createElement("div", { className: "relative" }, /* @__PURE__ */ React26.createElement(
        "input",
        {
          ref: searchInputRef,
          type: "text",
          placeholder: "Search",
          value: searchQuery,
          onChange: handleSearchChange,
          className: "w-full rounded-t-lg pl-3 pr-4 py-2 focus:outline-none focus:border-b focus:border-b-primary-600 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
          "aria-label": "Search items"
        }
      ), /* @__PURE__ */ React26.createElement("div", { className: "absolute right-2 top-1/2 transform -translate-y-1/2" }, /* @__PURE__ */ React26.createElement("span", { className: "text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded" }, "Q")))), /* @__PURE__ */ React26.createElement(
        "div",
        {
          style: { maxHeight },
          className: "flex-1 overflow-y-auto bg-white rounded-b-lg dark:bg-gray-900"
        },
        /* @__PURE__ */ React26.createElement("div", { className: "" }, filteredData.length > 0 ? renderDropdownItems(filteredData, 0) : /* @__PURE__ */ React26.createElement("div", { className: "py-2 px-3 text-sm text-gray-500 dark:text-gray-400" }, "No results found"))
      )),
      activePath?.length > 0 && /* @__PURE__ */ React26.createElement("div", { className: "absolute left-full top-[36px] flex" }, activePath?.map((pathItem, level) => {
        const children = getChildren(pathItem);
        if (!children || children.length === 0) return null;
        const displayChildren = searchQuery.trim() ? children.filter(
          (child) => flattenedData.some(({ item }) => item._id === child._id)
        ) : children;
        if (displayChildren.length === 0) return null;
        return /* @__PURE__ */ React26.createElement(
          "div",
          {
            style: { maxHeight },
            key: pathItem._id,
            className: "w-[200px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-b-lg overflow-y-auto"
          },
          /* @__PURE__ */ React26.createElement("div", { className: "" }, renderDropdownItems(displayChildren, level + 1))
        );
      }))
    )
  );
};
var NestedDropdown_default = NestedDropdown;

// src/components/Notice.tsx
import React27 from "react";
import { cva as cva9 } from "class-variance-authority";
import {
  RiAlertFill,
  RiCloseLine as RiCloseLine3,
  RiErrorWarningLine,
  RiQuestionLine,
  RiThumbUpLine,
  RiShieldCheckLine
} from "react-icons/ri";
var variantIconMap = {
  success: /* @__PURE__ */ React27.createElement(RiThumbUpLine, { size: 20, color: "#fff" }),
  warning: /* @__PURE__ */ React27.createElement(RiQuestionLine, { size: 20, color: "#fff" }),
  info: /* @__PURE__ */ React27.createElement(RiErrorWarningLine, { size: 20, color: "#fff" }),
  error: /* @__PURE__ */ React27.createElement(RiAlertFill, { size: 20, color: "#fff" }),
  default: /* @__PURE__ */ React27.createElement(RiShieldCheckLine, { size: 20, color: "#fff" })
};
var VariantIcon = ({ variant }) => /* @__PURE__ */ React27.createElement("span", null, variantIconMap[variant]);
var noticeVariants = cva9(
  "fixed z-[10000000000] p-4 w-fit rounded-[6px] shadow-sm text-white transition-all duration-700",
  {
    variants: {
      variant: {
        success: "bg-success",
        warning: "bg-[#ffaa33]",
        info: "bg-primary-700",
        error: "bg-error",
        default: "bg-gray-800"
      },
      position: {
        "top-left": "top-4 left-4 mx-auto slide-in-top-left",
        "top-right": "top-4 right-4 mx-auto slide-in-top-right",
        "bottom-left": "bottom-4 left-4 slide-in-bottom-left",
        "bottom-right": "bottom-4 right-4 slide-in-bottom-right",
        "top-center": "top-4 left-0 right-0 mx-auto slide-in-top",
        "bottom-center": "bottom-4 left-0 right-0 mx-auto slide-in-bottom"
      }
    },
    defaultVariants: {
      position: "top-left",
      variant: "default"
    }
  }
);
var Notice = ({
  children,
  noticeTitle,
  variant = "default",
  position = "top-left",
  showIcon = true,
  open,
  setOpen,
  className,
  ...props
}) => {
  if (!open) return null;
  const hasTitle = Boolean(noticeTitle?.length);
  return /* @__PURE__ */ React27.createElement(
    "div",
    {
      ...props,
      className: cn(noticeVariants({ variant, position }), className)
    },
    /* @__PURE__ */ React27.createElement("div", { className: "relative pr-8" }, /* @__PURE__ */ React27.createElement(
      "button",
      {
        onClick: () => setOpen(false),
        className: "absolute top-0 right-0 cursor-pointer",
        "aria-label": "Close notice"
      },
      /* @__PURE__ */ React27.createElement(RiCloseLine3, { size: 20 })
    ), /* @__PURE__ */ React27.createElement("div", { className: "flex items-start gap-2" }, showIcon && /* @__PURE__ */ React27.createElement(VariantIcon, { variant }), /* @__PURE__ */ React27.createElement("div", null, hasTitle && /* @__PURE__ */ React27.createElement("p", { className: "font-bold text-sm mb-1" }, noticeTitle), /* @__PURE__ */ React27.createElement("p", { className: "text-sm" }, children))))
  );
};
var Notice_default = Notice;

// src/components/OTPInput.tsx
import React28, { useRef as useRef5, useState as useState7 } from "react";
var OTPInput = ({
  length,
  onChange,
  type = "text"
}) => {
  const [otpValues, setOtpValues] = useState7(Array(length).fill(""));
  const inputsRef = useRef5([]);
  const handleChange = (e, idx) => {
    let value = e.target.value;
    if (type === "number") value = value.replace(/\D/g, "");
    if (!value) return;
    const newOtp = [...otpValues];
    newOtp[idx] = value[0];
    setOtpValues(newOtp);
    onChange(newOtp.join(""));
    if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otpValues[idx]) {
        const newOtp = [...otpValues];
        newOtp[idx] = "";
        setOtpValues(newOtp);
        onChange(newOtp.join(""));
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    let pasteData = e.clipboardData.getData("Text");
    if (type === "number") pasteData = pasteData.replace(/\D/g, "");
    const newOtp = pasteData.split("").concat(Array(length).fill("")).slice(0, length);
    setOtpValues(newOtp);
    onChange(newOtp.join(""));
    inputsRef.current[Math.min(pasteData.length, length - 1)]?.focus();
  };
  return /* @__PURE__ */ React28.createElement("div", { className: "flex items-center gap-2" }, Array.from({ length }).map((_, idx) => /* @__PURE__ */ React28.createElement(
    Input_default,
    {
      key: idx,
      type,
      inputMode: type === "number" ? "numeric" : "text",
      maxLength: 1,
      value: otpValues[idx],
      onChange: (e) => handleChange(e, idx),
      onKeyDown: (e) => handleKeyDown(e, idx),
      onPaste: handlePaste,
      ref: (el) => {
        inputsRef.current[idx] = el ?? null;
      },
      className: "w-[40px] p-3.5"
    }
  )));
};
var OTPInput_default = OTPInput;

// src/components/Popover.tsx
import React29, { useEffect as useEffect7, useRef as useRef6, forwardRef as forwardRef4 } from "react";
var Popover = forwardRef4(
  ({
    isOpen,
    setIsOpen,
    trigger,
    children,
    className,
    postion = "bottom-right"
  }, ref) => {
    const triggerRef = useRef6(null);
    const contentRef = useRef6(null);
    useEffect7(() => {
      const handleClickOutside = (event) => {
        if (!triggerRef.current?.contains(event.target) && !contentRef.current?.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);
    return /* @__PURE__ */ React29.createElement("div", { className: "relative w-max", ref }, /* @__PURE__ */ React29.createElement(
      "div",
      {
        className: "cursor-pointer",
        ref: triggerRef,
        onClick: () => setIsOpen(!isOpen)
      },
      trigger
    ), isOpen && /* @__PURE__ */ React29.createElement(
      "div",
      {
        ref: contentRef,
        className: cn(
          "absolute z-10 bg-white dark:bg-dark dark:text-light border border-primary-200 dark:border-primary-700 dark:shadow-primary-600 shadow-primary-200 rounded-lg shadow-sm min-w-[200px] p-4",
          postion === "bottom-left" && "left-0 top-full mt-3",
          postion === "bottom-right" && "right-0 top-full mt-3",
          postion === "top-left" && "left-0 bottom-full mb-3",
          postion === "top-right" && "right-0 bottom-full mb-3",
          postion === "bottom-center" && "left-1/2 top-full mt-3 -translate-x-1/2",
          postion === "top-center" && "left-1/2 bottom-full mb-3 -translate-x-1/2",
          className
        )
      },
      /* @__PURE__ */ React29.createElement(
        "div",
        {
          className: cn(
            "absolute z-0 h-3 w-3 bg-white dark:bg-dark   border-primary-200 dark:border-primary-700 rotate-45",
            postion === "bottom-left" && "-top-1.5 left-4 border border-b-0 border-r-0",
            postion === "bottom-right" && "-top-1.5 right-4 border border-b-0 border-r-0",
            postion === "top-left" && "-bottom-1.5 left-4 border border-t-0 border-l-0",
            postion === "top-right" && "-bottom-1.5 right-4 border border-t-0 border-l-0",
            postion === "bottom-center" && "-top-1.5 left-1/2 -translate-x-1/2 border border-b-0 border-r-0",
            postion === "top-center" && "-bottom-1.5 left-1/2 -translate-x-1/2 border border-t-0 border-l-0"
          )
        }
      ),
      children
    ));
  }
);
Popover.displayName = "Popover";
var Popover_default = Popover;

// src/components/Progress.tsx
import React30 from "react";
var Progress = ({
  progress,
  progressText = "",
  progressColor,
  progressTextPosition,
  rounded,
  height = "4px"
}) => {
  const _progress = Math?.min(Math?.max(0, progress), 100);
  return /* @__PURE__ */ React30.createElement(
    "div",
    {
      className: cn(
        progressTextPosition === "right" ? "flex items-center gap-1" : progressTextPosition === "left" ? "flex items-center gap-1" : ""
      )
    },
    /* @__PURE__ */ React30.createElement(
      "span",
      {
        className: cn(
          "text-dark dark:text-light text-sm",
          progressTextPosition === "left" ? "inline-block" : progressTextPosition === "top" ? "flex justify-end" : "hidden"
        )
      },
      progressText
    ),
    /* @__PURE__ */ React30.createElement(
      "div",
      {
        className: cn(
          "w-full h-1 bg-gray-200 dark:bg-gray-800",
          rounded && "rounded"
        ),
        style: { height },
        role: "progressbar",
        "aria-valuenow": _progress,
        "aria-valuemin": 0,
        "aria-valuemax": 100
      },
      /* @__PURE__ */ React30.createElement(
        "div",
        {
          className: `${progressColor} h-full transition-all delay-100 duration-300 ease-in ${rounded && "rounded"}`,
          style: { width: `${_progress}%` }
        }
      )
    ),
    /* @__PURE__ */ React30.createElement(
      "span",
      {
        className: cn(
          "text-dark dark:text-light text-sm",
          progressTextPosition === "bottom" ? "flex justify-end" : progressTextPosition === "top" ? "hidden" : progressTextPosition === "right" ? "flex justify-end" : "hidden"
        )
      },
      progressText
    )
  );
};
var Progress_default = Progress;

// src/components/Radio.tsx
import React31, { forwardRef as forwardRef5 } from "react";
import { cva as cva10 } from "class-variance-authority";
var radioVariants = cva10("", {
  variants: {
    size: {
      sm: "h-3 w-3",
      lg: "h-4 w-4"
    }
  },
  defaultVariants: {
    size: "sm"
  }
});
var Radio = forwardRef5(
  ({ size, disabled, checked, className, id, name, ...props }, ref) => {
    return /* @__PURE__ */ React31.createElement("div", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React31.createElement(
      "input",
      {
        ...props,
        ref,
        id,
        name,
        checked,
        disabled,
        role: "radio",
        "aria-checked": checked,
        type: "radio",
        className: cn(
          "peer relative cursor-pointer appearance-none rounded-full checked:bg-primary-600 border border-gray-300 hover:border-primary-600 hover:bg-primary-50 checked:hover:bg-primary-700 transition-all checked:border-primary-600 disabled:opacity-30 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
          radioVariants({ size, className })
        )
      }
    ), /* @__PURE__ */ React31.createElement(
      "span",
      {
        "aria-hidden": "true",
        className: cn(
          "absolute transition-opacity opacity-0 ease-in-out pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 h-1.5 w-1.5 bg-white rounded-full duration-300",
          size === "sm" && "h-[4.5px] w-[4.5px]"
        )
      }
    ));
  }
);
Radio.displayName = "Radio";
var Radio_default = Radio;

// src/components/Skeleton.tsx
import React32 from "react";
var Skeleton = ({
  width = "100%",
  height = "100%",
  circle = false,
  animation = "shimmer"
}) => {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: circle ? "50%" : void 0,
    display: "block"
  };
  return /* @__PURE__ */ React32.createElement(
    "span",
    {
      className: cn(
        "skeleton rounded-lg",
        circle ? "circle" : "",
        animation === "shimmer" && "skeleton-shimmer",
        animation === "wave" && "skeleton-wave",
        animation === "pulse" && "skeleton-pulse"
      ),
      style
    }
  );
};
var Skeleton_default = Skeleton;

// src/components/Slider.tsx
import React33, { forwardRef as forwardRef6 } from "react";
var Slider = forwardRef6(
  ({ value, min = 0, max = 100, size = "sm", ...props }, ref) => {
    const progress = (value - min) / (max - min) * 100;
    return /* @__PURE__ */ React33.createElement(React33.Fragment, null, /* @__PURE__ */ React33.createElement(
      "input",
      {
        ref,
        type: "range",
        min,
        max,
        value,
        ...props,
        className: cn(
          "slider w-full rounded-full appearance-none bg-gray-300 h-4 cursor-pointer focus:outline-none",
          size === "sm" ? "h-1.5" : "h-4"
        ),
        style: {
          background: `linear-gradient(to right, var(--primary-300) ${progress}%, var(--gray-200) ${progress}%)`
        }
      }
    ));
  }
);
Slider.displayName = "Slider";
var Slider_default = Slider;

// src/components/StatsCard.tsx
import React34 from "react";
var StatsCard = ({
  statTitle,
  statDesc,
  className,
  cardIcon
}) => {
  return /* @__PURE__ */ React34.createElement(
    Card,
    {
      className: cn(
        "border border-gray-200 hover:border-primary-500 rounded-radius-xl bg-[#FFFFFFE5] bg-gradient-to-b bg-[#fff] hover:from-primary-300 hover:to-primary-600 dark:from-primary-800 dark:to-primary-700 dark:hover:from-primary-800 dark:hover:to-primary-900 backdrop-blur-sm px-[32px] py-[64px] group",
        className
      )
    },
    /* @__PURE__ */ React34.createElement("span", { className: "group-hover:text-white text-dark dark:text-white" }, cardIcon),
    /* @__PURE__ */ React34.createElement(CardTitle, { className: "group-hover:text-white text-[48px] font-bold text-primary-500 dark:text-white my-4" }, statTitle),
    /* @__PURE__ */ React34.createElement(CardDescription, { className: "group-hover:text-white text-[24px] hover:text-white text-dark leading-[25px]" }, statDesc)
  );
};
var StatsCard_default = StatsCard;

// src/components/Tabs.tsx
import React35 from "react";
var TabsContainer = ({
  children,
  className,
  position = "horizontal"
}) => {
  return /* @__PURE__ */ React35.createElement("div", { className: cn(position === "vertical" ? "flex" : "block", className) }, children);
};
var TabList = ({
  onChange,
  ariaLabel,
  children,
  box = false,
  className,
  position = "horizontal"
}) => {
  const [focusIndex, setFocusIndex] = React35.useState(0);
  const tabRefs = React35.useRef([]);
  const handleKeyDown = (e, index) => {
    const tabCount = React35.Children.count(children);
    switch (e.key) {
      case "ArrowRight": {
        if (position === "horizontal") {
          e.preventDefault();
          const nextIndex = (index + 1) % tabCount;
          setFocusIndex(nextIndex);
          tabRefs.current[nextIndex]?.focus();
        }
        break;
      }
      case "ArrowLeft": {
        if (position === "horizontal") {
          e.preventDefault();
          const prevIndex = (index - 1 + tabCount) % tabCount;
          setFocusIndex(prevIndex);
          tabRefs.current[prevIndex]?.focus();
        }
        break;
      }
      case "ArrowDown": {
        if (position === "vertical") {
          e.preventDefault();
          const nextIndex = (index + 1) % tabCount;
          setFocusIndex(nextIndex);
          tabRefs.current[nextIndex]?.focus();
        }
        break;
      }
      case "ArrowUp": {
        if (position === "vertical") {
          e.preventDefault();
          const prevIndex = (index - 1 + tabCount) % tabCount;
          setFocusIndex(prevIndex);
          tabRefs.current[prevIndex]?.focus();
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        setFocusIndex(0);
        tabRefs.current[0]?.focus();
        break;
      }
      case "End": {
        e.preventDefault();
        const lastIndex = tabCount - 1;
        setFocusIndex(lastIndex);
        tabRefs.current[lastIndex]?.focus();
        break;
      }
    }
  };
  return /* @__PURE__ */ React35.createElement(
    "div",
    {
      className: cn(
        position === "horizontal" ? "flex items-center" : "flex flex-col items-stretch",
        box ? "rounded-2xl bg-light dark:bg-gray-900 p-2" : position === "horizontal" ? "border-b border-gray-200 dark:border-gray-600" : "border-r border-gray-200 dark:border-gray-600",
        className
      ),
      role: "tablist",
      "aria-label": ariaLabel,
      "aria-orientation": position
    },
    React35.Children.map(children, (child, index) => {
      if (React35.isValidElement(child)) {
        return React35.cloneElement(child, {
          onChange,
          box,
          position,
          onKeyDown: (e) => handleKeyDown(e, index),
          tabIndex: index === focusIndex ? 0 : -1,
          ref: (el) => {
            tabRefs.current[index] = el;
          }
        });
      }
      return null;
    })
  );
};
var Tab = React35.forwardRef(
  ({
    label,
    value,
    onChange,
    icon,
    content,
    box = false,
    selectedTabValue,
    className,
    onKeyDown,
    tabIndex,
    position = "horizontal"
  }, ref) => {
    const isSelected = value === selectedTabValue;
    return /* @__PURE__ */ React35.createElement(
      "button",
      {
        ref,
        role: "tab",
        "aria-selected": isSelected,
        "aria-controls": `panel-${value}`,
        id: `tab-${value}`,
        tabIndex,
        onKeyDown,
        onClick: () => onChange(value),
        className: cn(
          "flex items-center gap-2 px-4 py-3 text-base font-medium cursor-pointer",
          // Default variant
          !box && [
            isSelected && position === "horizontal" ? "text-primary-400 border-b-2 border-primary-400" : isSelected && position === "vertical" ? "text-primary-400 border-r-2 border-primary-400" : "border-transparent text-gray-700 dark:text-gray-500"
          ],
          // Hover styles
          position === "horizontal" && !box ? "hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-t transition-all duration-200" : "hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200",
          // Vertical border for unselected
          position === "vertical" && !box && !isSelected ? "border-r-2" : "",
          // Box variant
          box && [
            "transition-all ease-linear duration-200 delay-75 rounded-radius-lg border border-transparent hover:bg-primary-50 dark:hover:bg-primary-900 hover:border-primary-200 dark:hover:border-primary-800 dark:text-light",
            position === "horizontal" ? "flex items-center gap-2" : "",
            isSelected ? "text-light bg-primary-600 dark:bg-primary-800 shadow-[inset_3px_4px_5.3px_0_#0d3374a3] shadow-primary-700 border-primary-200 dark:border-primary-600 hover:bg-primary-600 hover:shadow-[inset_-4px_-3px_4px_0_#94bcff4a]" : ""
          ],
          className
        )
      },
      icon && /* @__PURE__ */ React35.createElement("span", { "aria-hidden": "true" }, icon),
      label,
      content && /* @__PURE__ */ React35.createElement("span", { "aria-hidden": "true" }, content)
    );
  }
);
var TabPanel = ({
  value,
  currentValue,
  children,
  className
}) => {
  return value === currentValue ? /* @__PURE__ */ React35.createElement(
    "div",
    {
      role: "tabpanel",
      id: `panel-${value}`,
      "aria-labelledby": `tab-${value}`,
      tabIndex: 0,
      className: cn("dark:text-light", className)
    },
    children
  ) : null;
};
Tab.displayName = "Tab";
var Tabs_default = TabsContainer;

// src/components/Textarea.tsx
import { cva as cva11 } from "class-variance-authority";
import React36, {
  forwardRef as forwardRef7
} from "react";
var textareaVariants = cva11(
  "flex items-center gap-2 font-karla bg-transparent text-sm outline-none rounded-radius-md border py-2 px-4 disabled:opacity-60 disabled:select-none disabled:pointer-events-none w-full",
  {
    variants: {
      variant: {
        default: "dark:text-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:hover:text-light dark:hover:bg-gray-800 dark:hover:border-gray-700 dark:focus-within:bg-gray-100 dark:focus-within:border-gray-800 dark:focus-within:hover:bg-gray-700 dark:focus-within:text-dark dark:disabled:bg-gray-700 bg-gray-100 border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-500 hover:bg-gray-300 focus-within:bg-gray-50 focus-within:border-gray-400 focus-within:text-dark focus-within:hover:text-dark focus-within:hover:border-primary-100 focus-within:hover:bg-primary-50 disabled:bg-gray-25 disabled:border-gray-400",
        glass: "backdrop-blur-[3.5px] bg-white/10 dark:bg-dark/20 dark:border-gray-800 border-gray-200/50 text-light"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Textarea = forwardRef7(
  ({ className, rows, cols, variant, disabled, children, ...props }, ref) => {
    return /* @__PURE__ */ React36.createElement(
      "textarea",
      {
        ...props,
        ref,
        disabled,
        rows,
        cols,
        className: cn(textareaVariants({ variant, className }))
      },
      children
    );
  }
);
Textarea.displayName = "Textarea";
var Textarea_default = Textarea;

// src/components/Toggle.tsx
import { cva as cva12 } from "class-variance-authority";
import React37, { forwardRef as forwardRef8 } from "react";
var toggleVariants = cva12(
  "rounded-radius-xl bg-gray-300 transition-colors peer-checked:bg-primary-500 peer-active:ring-2 peer-active:ring-primary-300",
  {
    variants: {
      size: {
        sm: "w-8 h-[18px]",
        lg: "w-[52px] h-[27px]"
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
);
var Toggle = forwardRef8(
  ({ icon, children, disabled, size = "lg", ...props }, ref) => {
    return /* @__PURE__ */ React37.createElement(
      "label",
      {
        className: cn(
          "flex cursor-pointer select-none items-center",
          disabled && "opacity-50 pointer-events-none"
        )
      },
      /* @__PURE__ */ React37.createElement("div", { className: "relative" }, /* @__PURE__ */ React37.createElement(
        "input",
        {
          type: "checkbox",
          disabled,
          ref,
          ...props,
          className: "sr-only peer"
        }
      ), /* @__PURE__ */ React37.createElement("div", { className: cn(toggleVariants({ size })) }), /* @__PURE__ */ React37.createElement(
        "div",
        {
          className: cn(
            "absolute  flex items-center justify-center bg-white transition-transform",
            size === "sm" ? "peer-checked:translate-x-2 top-[1px] left-[2px] w-5 h-4 rounded-radius-md" : "peer-checked:translate-x-[11px] top-[2.5px] left-1 h-[22px] w-[34px] rounded-radius-lg"
          )
        },
        /* @__PURE__ */ React37.createElement("span", { className: "flex items-center justify-center" }, icon),
        children
      ))
    );
  }
);
Toggle.displayName = "Toggle";
var Toggle_default = Toggle;

// src/components/TreeView.tsx
import React38, {
  useState as useState8,
  Children as Children2,
  isValidElement as isValidElement2
} from "react";
import { HiChevronDown as HiChevronDown4, HiChevronRight } from "react-icons/hi";
var TreeViewLeadingVisual = ({
  children
}) => /* @__PURE__ */ React38.createElement("span", { className: "flex items-center shrink-0 w-5 h-5 justify-center" }, children);
var TreeViewTrailingVisual = ({ children, label }) => /* @__PURE__ */ React38.createElement("span", { "aria-label": label, className: "ml-auto flex items-center shrink-0" }, children);
var TreeViewSubTree = ({
  children,
  expanded = false,
  flat = false,
  className,
  state,
  count
}) => {
  if (flat) return null;
  return /* @__PURE__ */ React38.createElement(
    "ul",
    {
      role: "group",
      className: cn(
        "list-none m-0 overflow-hidden transition-all duration-200 ease-in-out",
        expanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0",
        className
      )
    },
    state === "loading" ? /* @__PURE__ */ React38.createElement("li", { className: "pl-6 py-1 text-gray-500 italic" }, "Loading", count ? ` ${count} items...` : "...") : children
  );
};
var TreeViewItem = ({
  id,
  children,
  className,
  expanded = false,
  selected = false,
  flat = false,
  level = 0,
  current,
  onToggle,
  onSelect
}) => {
  const leading = [];
  const trailing = [];
  const content = [];
  const subTrees = [];
  Children2.forEach(children, (child) => {
    if (!isValidElement2(child)) {
      content.push(child);
      return;
    }
    if (child.type === TreeViewLeadingVisual) leading.push(child);
    else if (child.type === TreeViewTrailingVisual) trailing.push(child);
    else if (child.type === TreeViewSubTree) subTrees.push(child);
    else content.push(child);
  });
  const hasSubTree = subTrees.length > 0;
  const handleItemClick = (e) => {
    e.stopPropagation();
    onSelect?.(id);
    if (hasSubTree && !flat) {
      onToggle?.(id);
    }
  };
  return /* @__PURE__ */ React38.createElement(React38.Fragment, null, /* @__PURE__ */ React38.createElement(
    "li",
    {
      role: "treeitem",
      "aria-expanded": hasSubTree && !flat ? expanded ? "true" : "false" : void 0,
      "aria-selected": selected ? "true" : "false",
      "aria-current": current ? "true" : void 0,
      tabIndex: selected ? 0 : -1,
      onClick: handleItemClick,
      style: { paddingLeft: level * 16 + 8 },
      className: cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors select-none",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        selected && "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium",
        className
      )
    },
    !leading.length && hasSubTree && !flat && /* @__PURE__ */ React38.createElement("span", { className: "text-gray-400" }, expanded ? /* @__PURE__ */ React38.createElement(HiChevronDown4, { size: 18 }) : /* @__PURE__ */ React38.createElement(HiChevronRight, { size: 18 })),
    leading,
    /* @__PURE__ */ React38.createElement("span", { className: "flex-1 truncate" }, content),
    trailing
  ), subTrees.map(
    (subTree, index) => React38.cloneElement(subTree, {
      expanded,
      flat,
      key: `${id}-subtree-${index}`
    })
  ));
};
var TreeView = ({
  children,
  "aria-label": ariaLabel,
  className,
  flat = false,
  defaultExpandedIds = [],
  expandedIds,
  onExpandedChange,
  allowMultiple = true
}) => {
  const [internalExpanded, setInternalExpanded] = useState8(
    () => new Set(defaultExpandedIds)
  );
  const [selectedId, setSelectedId] = useState8(null);
  const expandedSet = expandedIds ? new Set(expandedIds) : internalExpanded;
  const toggleNode = (id) => {
    const update = (prev) => {
      const next = new Set(prev);
      if (allowMultiple) {
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      } else {
        const wasExpanded = next.has(id);
        next.clear();
        if (!wasExpanded) next.add(id);
      }
      return next;
    };
    if (expandedIds && onExpandedChange) {
      onExpandedChange(Array.from(update(expandedSet)));
    } else {
      setInternalExpanded(update);
    }
  };
  const enhance = (nodes, level = 0) => Children2.map(nodes, (child) => {
    if (!isValidElement2(child)) return child;
    if (child.type === TreeViewItem) {
      return React38.cloneElement(child, {
        level,
        expanded: expandedSet.has(child.props.id),
        selected: selectedId === child.props.id,
        onToggle: toggleNode,
        onSelect: (id) => {
          setSelectedId(id);
          if (child.props.onSelect) child.props.onSelect(id);
        },
        flat,
        // Recurse into children (to handle nested SubTrees)
        children: enhance(child.props.children, level)
      });
    }
    if (child.type === TreeViewSubTree) {
      return React38.cloneElement(child, {
        // Increase level for items inside the SubTree
        children: enhance(child.props.children, level + 1)
      });
    }
    return child;
  });
  return /* @__PURE__ */ React38.createElement(
    "ul",
    {
      role: "tree",
      "aria-label": ariaLabel,
      className: cn("list-none p-0 m-0 text-sm", className)
    },
    enhance(children)
  );
};
TreeView.Item = TreeViewItem;
TreeView.SubTree = TreeViewSubTree;
TreeView.LeadingVisual = TreeViewLeadingVisual;
TreeView.TrailingVisual = TreeViewTrailingVisual;
var TreeView_default = TreeView;
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button_default as Button,
  Callout_default as Callout,
  Caption_default as Caption,
  Card,
  CardBg,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
  Checkbox_default as Checkbox,
  Chip_default as Chip,
  CircularProgress_default as CircularProgress,
  Drawer_default as Drawer,
  Dropdown_default as Dropdown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  FileUploadControl,
  FillButton_default as FillButton,
  FloatingButton_default as FloatingButton,
  Footer,
  FooterContent,
  FooterHeader,
  FooterIcons,
  FooterList,
  ImageCard_default as ImageCard,
  Input_default as Input,
  Label_default as Label,
  ListItem_default as ListItem,
  ListPagination_default as ListPagination,
  Loading_default as Loading,
  Modal,
  NestedDropdown_default as NestedDropdown,
  Notice_default as Notice,
  OTPInput_default as OTPInput,
  Paragraph_default as Paragraph,
  Popover_default as Popover,
  Progress_default as Progress,
  Radio_default as Radio,
  Skeleton_default as Skeleton,
  Slider_default as Slider,
  Spinner_default as Spinner,
  StatsCard_default as StatsCard,
  Tab,
  TabList,
  TabPanel,
  Tabs_default as TabsContainer,
  Textarea_default as Textarea,
  Toggle_default as Toggle,
  TreeView_default as TreeView,
  Typography_default as Typography,
  defaultGetFileIcon
};
