"use client";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/utils/util";

// Base interface that users can extend
export interface BaseNestedItem {
  _id: string | number;
  name: string | number;
}

// Generic props interface
export interface NestedDropdownProps<T extends BaseNestedItem> {
  data: T[];
  onSelect?: (item: T, path: T[]) => void;
  placeholder?: string | number;
  getChildren?: (item: T) => T[] | undefined | null;
  className?: string;
  maxHeight?: number;
}

// Helper function to flatten nested data for searching
const flattenData = <T extends BaseNestedItem>(
  items: T[],
  getChildren: (item: T) => T[] | undefined | null,
  parentPath: T[] = [],
): Array<{ item: T; path: T[] }> => {
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
    [] as Array<{ item: T; path: T[] }>,
  );
};

// Generic component
const NestedDropdown = <T extends BaseNestedItem>({
  data,
  onSelect,
  placeholder = "Select",
  className,
  maxHeight = 200,
  getChildren = (item: T) => (item as any).children,
}: NestedDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [activePath, setActivePath] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<{
    level: number;
    index: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Flatten data for search
  const flattenedData = useMemo(
    () => flattenData(data, getChildren),
    [data, getChildren],
  );

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery?.trim()) return data;

    const searchLower = searchQuery.toLowerCase();
    const matchingItems = flattenedData?.filter(({ item }) =>
      String(item.name).toLowerCase().includes(searchLower),
    );

    // Get unique root items from matching items
    const rootIds = new Set<string | number>();
    matchingItems.forEach(({ path }) => {
      if (path[0]) rootIds.add(path[0]._id);
    });

    return data.filter((item) => rootIds.has(item._id));
  }, [data, flattenedData, searchQuery]);

  // Get current level data based on active path
  const getCurrentLevelData = useCallback(() => {
    let currentData = filteredData;

    for (let i = 0; i < activePath?.length; i++) {
      const pathItem = activePath[i];
      const children = getChildren(pathItem);
      if (children && children.length > 0) {
        // Filter children if searching
        if (searchQuery.trim()) {
          const childIds = flattenedData
            .filter(({ path }) => path[i + 1] && path[i]._id === pathItem._id)
            .map(({ item }) => item._id);

          currentData = children.filter((child) =>
            childIds.includes(child._id),
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  // Reset focus when active path changes
  useEffect(() => {
    setFocusedIndex(null);
  }, [activePath, searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
            const currentLevelData = getCurrentLevelData();
            const item = currentLevelData[index];
            if (item) {
              handleCategoryClick(item, level);
            }
          }
          break;
      }
    };

    const handleArrowNavigation = (direction: number, horizontal?: "right") => {
      const currentLevelData = getCurrentLevelData();
      if (currentLevelData.length === 0) return;

      if (horizontal === "right") {
        const item = currentLevelData[focusedIndex?.index || 0];
        if (item) {
          const children = getChildren(item);
          if (children && children.length > 0) {
            handleCategoryClick(item, activePath.length);
          }
        }
        return;
      }

      const currentIndex = focusedIndex?.index ?? -1;
      const newIndex = Math.max(
        0,
        Math.min(currentLevelData.length - 1, currentIndex + direction),
      );

      setFocusedIndex({ level: activePath.length, index: newIndex });

      // Scroll into view
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

  const handleItemClick = (item: T, path: T[]): void => {
    setSelectedItem(item);
    setIsOpen(false);
    setActivePath([]);
    setSearchQuery("");
    setFocusedIndex(null);
    onSelect?.(item, path);
  };

  const toggleDropdown = (): void => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      setActivePath([]);
      setSearchQuery("");
      setFocusedIndex(null);
    }
  };

  const handleCategoryClick = useCallback(
    (item: T, level: number, event?: React.MouseEvent): void => {
      const children = getChildren(item);

      // Build the current path up to this point
      const currentPath = activePath.slice(0, level);
      currentPath[level] = item;

      const isDoubleClick = event?.detail === 2;

      if (children && children.length > 0 && !isDoubleClick) {
        // On single click: show children
        setActivePath(currentPath);
      } else {
        // On double click OR if no children: select the item
        handleItemClick(item, [...currentPath]);
      }
    },
    [activePath, getChildren],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
    setActivePath([]);
    setFocusedIndex(null);
  };

  const handleItemFocus = (level: number, index: number): void => {
    setFocusedIndex({ level, index });
  };

  // Render dropdown items
  const renderDropdownItems = (items: T[], level: number) => {
    const currentData = items || [];

    return currentData.map((item, index) => {
      const children = getChildren(item);
      const hasChildren = children && children.length > 0;
      const isActive = activePath[level]?._id === item._id;
      const isFocused =
        focusedIndex?.level === level && focusedIndex.index === index;
      const itemKey = `${level}-${item._id}`;

      return (
        <div
          key={item._id}
          ref={(el) => {
            if (el) {
              itemRefs.current.set(itemKey, el);
            } else {
              itemRefs.current.delete(itemKey);
            }
          }}
          className={cn(
            "group flex items-center justify-between py-2 px-3 border border-transparent cursor-pointer",
            "transition-colors duration-200 relative",
            isActive
              ? "bg-primary-50 dark:bg-primary-900/40 text-primary-700 border border-primary-200 dark:border-primary-800"
              : "hover:bg-gray-100 dark:hover:bg-gray-800",
            // isFocused && "ring-1 ring-primary-500 dark:ring-primary-400",
          )}
          onClick={(e) => handleCategoryClick(item, level, e)}
          onMouseEnter={() => handleItemFocus(level, index)}
          tabIndex={isFocused ? 0 : -1}
        >
          <span
            className={cn(
              "text-sm",
              isActive
                ? "text-gray-900 dark:text-black font-medium"
                : "text-gray-800 dark:text-gray-200",
            )}
          >
            {item.name}
          </span>
          {hasChildren && (
            <>
              <FiChevronRight className="w-4 h-4 text-gray-400" />
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                Double-click to select
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={cn("relative w-full max-w-[200px]", className)}
      ref={dropdownRef}
    >
      {/* Dropdown Trigger */}
      <button
        type="button"
        className={cn(
          "w-full flex justify-between items-center py-2 px-3 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-500 hover:border-gray-400 transition-colors duration-200",
        )}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "whitespace-nowrap text-ellipsis overflow-hidden w-[180px]",
            selectedItem
              ? "font-medium text-gray-900 dark:text-gray-100"
              : "text-gray-500 dark:text-gray-400",
          )}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </span>
        <FiChevronDown
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Sideways Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 w-[200px] mt-1 bg-white dark:bg-gray-900 rounded-lg rounded-b-lg border border-primary-600 shadow-xl max-h-96"
          role="listbox"
        >
          <div className="flex flex-col h-full">
            {/* Header with Search */}
            <div className="border-b border-gray-200 dark:border-gray-700 ">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-t-lg pl-3 pr-4 py-2 focus:outline-none focus:border-b focus:border-b-primary-600 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  aria-label="Search items"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    Q
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{ maxHeight }}
              className="flex-1 overflow-y-auto bg-white rounded-b-lg dark:bg-gray-900"
            >
              <div className="">
                {filteredData.length > 0 ? (
                  renderDropdownItems(filteredData, 0)
                ) : (
                  <div className="py-2 px-3 text-sm text-gray-500 dark:text-gray-400">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Columns for Children */}
          {activePath?.length > 0 && (
            <div className="absolute left-full top-[36px] flex">
              {activePath?.map((pathItem, level) => {
                const children = getChildren(pathItem);
                if (!children || children.length === 0) return null;

                // Filter children if searching
                const displayChildren = searchQuery.trim()
                  ? children.filter((child) =>
                      flattenedData.some(({ item }) => item._id === child._id),
                    )
                  : children;

                if (displayChildren.length === 0) return null;

                return (
                  <div
                    style={{ maxHeight }}
                    key={pathItem._id}
                    className="w-[200px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-b-lg overflow-y-auto"
                  >
                    <div className="">
                      {renderDropdownItems(displayChildren, level + 1)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;
