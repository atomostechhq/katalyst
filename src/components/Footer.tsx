import React, { type ReactNode } from "react";
import Paragraph from "./Paragraph";
import { cn } from "@/utils/util";
import Link from "next/link";

interface FooterProps {
  children: ReactNode;
  className?: string;
  footerBottom?: JSX.Element;
}

interface FooterHeaderProps {
  children: ReactNode;
  className?: string;
}

interface FooterContentProps {
  children: ReactNode;
  className?: string;
}

type FooterListType = {
  text: string;
  link: string;
};

interface FooterListProps {
  footerItems: {
    label: string;
    content: FooterListType[];
  }[];
  target?: "_blank" | "_self" | "_top" | "_parent";
}

type FooterIconType = {
  icon: JSX.Element;
  link: string;
};

interface FooterIconsProps {
  icons: FooterIconType[];
}

export default function Footer({
  children,
  className,
  footerBottom,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-gradient-to-b from-gray-25 to-primary-100 dark:from-primary-900 dark:to-dark",
        className,
      )}
    >
      {children}
      {footerBottom && (
        <section className="border-t border-primary-500 dark:border-primary-800 text-center py-spacing-md">
          {footerBottom}
        </section>
      )}
    </footer>
  );
}

export const FooterHeader = ({ children, className }: FooterHeaderProps) => {
  return (
    <div
      className={cn(
        "md:w-[30%] space-y-4 flex flex-col items-center lg:items-start",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FooterContent = ({ children, className }: FooterContentProps) => {
  return (
    <section
      className={cn(
        "max-w-6xl mx-auto flex md:flex-row flex-col items-center md:items-start justify-between gap-14 px-4 md:px-20 py-20",
        className,
      )}
    >
      {children}
    </section>
  );
};

export const FooterList = ({ footerItems, target }: FooterListProps) => {
  // console.log("Footer Length", footerItems.length);
  return (
    <div
      className={cn(
        "grid place-items-start gap-8 text-center md:text-left",
        footerItems.length === 2 && "md:grid-cols-2",
        (footerItems.length > 3 || footerItems.length === 3) &&
          "lg:grid-cols-3 md:grid-cols-2",
      )}
    >
      {footerItems?.map((data, i) => (
        <div key={i} className="space-y-3 w-full">
          <Paragraph variant={"b3"} className="text-primary-600">
            {data?.label}
          </Paragraph>
          <ul className="space-y-2 list-none">
            {data?.content?.map((data, i) => (
              <li key={i}>
                <Link href={data?.link} target={target}>
                  <Paragraph
                    variant={"b4"}
                    className="dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-600 font-semibold text-gray-900"
                  >
                    {data?.text}
                  </Paragraph>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const FooterIcons = ({ icons }: FooterIconsProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-5 text-primary-700 dark:text-primary-200">
      {icons.map((icon, index) => (
        <Link
          href={icon.link}
          key={index}
          target="_blank"
          className="hover:bg-primary-200 dark:hover:bg-primary-800 p-1 rounded-radius-sm"
        >
          {icon.icon}
        </Link>
      ))}
    </div>
  );
};
