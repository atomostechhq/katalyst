"use client";
import React, {
  useState,
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { cn } from "@/utils/util";

/* =========================================================
   Types
========================================================= */

interface TreeViewProps {
  children: React.ReactNode;
  "aria-label": string;
  className?: string;
  flat?: boolean;
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  allowMultiple?: boolean;
}

interface TreeViewItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  current?: boolean;
  level?: number;
  expanded?: boolean;
  selected?: boolean;
  flat?: boolean;
  onToggle?: (id: string) => void;
  onSelect?: (id: string) => void;
}

interface TreeViewSubTreeProps {
  children: React.ReactNode;
  expanded?: boolean;
  flat?: boolean;
  className?: string;
  state?: "loading";
  count?: number;
}

/* =========================================================
   Visuals
========================================================= */

const TreeViewLeadingVisual: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className="flex items-center shrink-0 w-5 h-5 justify-center">
    {children}
  </span>
);

const TreeViewTrailingVisual: React.FC<{
  children: React.ReactNode;
  label?: string;
}> = ({ children, label }) => (
  <span aria-label={label} className="ml-auto flex items-center shrink-0">
    {children}
  </span>
);

/* =========================================================
   SubTree 
========================================================= */

const TreeViewSubTree: React.FC<TreeViewSubTreeProps> = ({
  children,
  expanded = false,
  flat = false,
  className,
  state,
  count,
}) => {
  if (flat) return null;

  return (
    <ul
      role="group"
      className={cn(
        "list-none m-0 overflow-hidden transition-all duration-200 ease-in-out",
        expanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0",
        className,
      )}
    >
      {state === "loading" ? (
        <li className="pl-6 py-1 text-gray-500 italic">
          Loading{count ? ` ${count} items...` : "..."}
        </li>
      ) : (
        children
      )}
    </ul>
  );
};

/* =========================================================
   Item
========================================================= */

const TreeViewItem: React.FC<TreeViewItemProps> = ({
  id,
  children,
  className,
  expanded = false,
  selected = false,
  flat = false,
  level = 0,
  current,
  onToggle,
  onSelect,
}) => {
  const leading: ReactNode[] = [];
  const trailing: ReactNode[] = [];
  const content: ReactNode[] = [];
  const subTrees: React.ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      content.push(child);
      return;
    }
    if (child.type === TreeViewLeadingVisual) leading.push(child);
    else if (child.type === TreeViewTrailingVisual) trailing.push(child);
    else if (child.type === TreeViewSubTree) subTrees.push(child);
    else content.push(child);
  });

  const hasSubTree = subTrees.length > 0;

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(id);
    if (hasSubTree && !flat) {
      onToggle?.(id);
    }
  };

  return (
    <>
      <li
        role="treeitem"
        aria-expanded={
          hasSubTree && !flat ? (expanded ? "true" : "false") : undefined
        }
        aria-selected={selected ? "true" : "false"}
        aria-current={current ? "true" : undefined}
        tabIndex={selected ? 0 : -1}
        onClick={handleItemClick}
        style={{ paddingLeft: level * 16 + 8 }}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors select-none",
          "hover:bg-gray-100 dark:hover:bg-gray-800 text-dark dark:text-light",
          selected &&
            "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300 font-medium",
          className,
        )}
      >
        {/* Render Chevron only if no LeadingVisual is provided and it has children */}
        {!leading.length && hasSubTree && !flat && (
          <span className="text-gray-400">
            {expanded ? (
              <HiChevronDown size={18} />
            ) : (
              <HiChevronRight size={18} />
            )}
          </span>
        )}
        {leading}
        <span className="flex-1 truncate">{content}</span>
        {trailing}
      </li>

      {subTrees.map((subTree, index) =>
        React.cloneElement(subTree, {
          expanded,
          flat,
          key: `${id}-subtree-${index}`,
        }),
      )}
    </>
  );
};

/* =========================================================
   TreeView Root
========================================================= */

export const TreeView: React.FC<TreeViewProps> & {
  Item: React.FC<TreeViewItemProps>;
  SubTree: React.FC<TreeViewSubTreeProps>;
  LeadingVisual: typeof TreeViewLeadingVisual;
  TrailingVisual: typeof TreeViewTrailingVisual;
} = ({
  children,
  "aria-label": ariaLabel,
  className,
  flat = false,
  defaultExpandedIds = [],
  expandedIds,
  onExpandedChange,
  allowMultiple = true,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const expandedSet = expandedIds ? new Set(expandedIds) : internalExpanded;

  const toggleNode = (id: string) => {
    const update = (prev: Set<string>) => {
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

  const enhance = (nodes: React.ReactNode, level = 0): React.ReactNode =>
    Children.map(nodes, (child) => {
      if (!isValidElement(child)) return child;

      if (child.type === TreeViewItem) {
        return React.cloneElement(child as React.ReactElement<any>, {
          level,
          expanded: expandedSet.has(child.props.id),
          selected: selectedId === child.props.id,
          onToggle: toggleNode,
          onSelect: (id: string) => {
            setSelectedId(id);
            if (child.props.onSelect) child.props.onSelect(id);
          },
          flat,
          // Recurse into children (to handle nested SubTrees)
          children: enhance(child.props.children, level),
        });
      }

      if (child.type === TreeViewSubTree) {
        return React.cloneElement(child as React.ReactElement<any>, {
          // Increase level for items inside the SubTree
          children: enhance(child.props.children, level + 1),
        });
      }

      return child;
    });

  return (
    <ul
      role="tree"
      aria-label={ariaLabel}
      className={cn("list-none p-0 m-0 text-sm", className)}
    >
      {enhance(children)}
    </ul>
  );
};

TreeView.Item = TreeViewItem;
TreeView.SubTree = TreeViewSubTree;
TreeView.LeadingVisual = TreeViewLeadingVisual;
TreeView.TrailingVisual = TreeViewTrailingVisual;

export default TreeView;
