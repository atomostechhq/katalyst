"use client";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";

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
}

// Generic component
const NestedDropdown = <T extends BaseNestedItem>({
  data,
  onSelect,
  placeholder = "Select Industry",
  getChildren = (item: T) => (item as any).children,
}: NestedDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  // const [selectedPath, setSelectedPath] = useState<T[]>([]);
  const [activePath, setActivePath] = useState<T[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActivePath([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: T, path: T[]): void => {
    setSelectedItem(item);
    // setSelectedPath(path);
    setIsOpen(false);
    setActivePath([]);
    onSelect?.(item, path);
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActivePath([]);
    }
  };

  const handleCategoryClick = (
    item: T,
    level: number,
    event?: React.MouseEvent,
  ): void => {
    const children = getChildren(item);

    // Build the current path up to this point
    const currentPath = activePath.slice(0, level);
    currentPath[level] = item;

    // Check if this is a double click (for parent selection)
    const isDoubleClick = event?.detail === 2;

    if (children && children.length > 0 && !isDoubleClick) {
      // On single click: show children (existing behavior)
      setActivePath(currentPath);
    } else {
      // On double click OR if no children: select the item
      handleItemClick(item, [...currentPath]);
    }
  };

  // // Alternative approach: Add a dedicated handler for parent selection
  // const handleParentSelection = (item: T, level: number): void => {
  //   const currentPath = activePath.slice(0, level);
  //   currentPath[level] = item;
  //   handleItemClick(item, [...currentPath]);
  // };

  return (
    <div className="relative w-full max-w-[200px]" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        className="w-full flex justify-between items-center py-3 px-4 text-sm bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-500 hover:border-gray-400 transition-colors duration-200"
        onClick={toggleDropdown}
      >
        <span
          className={`whitespace-nowrap text-ellipsis overflow-hidden w-[180px] ${
            selectedItem ? "text-gray-900 font-medium" : "text-gray-500"
          }`}
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
        <div className="absolute z-50 w-[200px] mt-1 bg-white rounded-lg shadow-xl max-h-96">
          <div className="flex flex-col h-full">
            {/* Header with Search */}
            <div className="border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-3 pr-4 py-2 focus:outline-none focus:border-b focus:border-b-primary-600 text-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    Q
                  </span>
                </div>
              </div>
            </div>

            {/* Industries List */}
            <div className="flex-1 overflow-y-auto bg-white max-h-[200px]">
              <div className="">
                {data?.map((item) => {
                  const children = getChildren(item);
                  const hasChildren = children && children.length > 0;
                  const isActive = activePath[0]?._id === item._id;

                  return (
                    <div
                      key={item._id}
                      className={`
                        group flex items-center justify-between py-2 px-3 border border-transparent cursor-pointer
                        transition-colors duration-200 relative
                        ${
                          isActive
                            ? "bg-primary-50 text-primary-700 border border-primary-200"
                            : "hover:bg-gray-50"
                        }
                      `}
                      onClick={(e) => handleCategoryClick(item, 0, e)}
                    >
                      <span className="text-sm text-gray-800">{item.name}</span>
                      {hasChildren && (
                        <>
                          <FiChevronRight className="w-4 h-4 text-gray-400" />
                          {/* <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                            Double-click to select
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                          </div> */}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Columns for Children */}
          {activePath?.length > 0 && (
            <div className="absolute left-full top-[36px] flex">
              {activePath?.map((pathItem, level) => {
                const children = getChildren(pathItem);
                return (
                  <div
                    key={pathItem._id}
                    className="w-[200px] bg-white border border-gray-200 shadow-xl rounded-b-lg max-h-[200px] overflow-y-auto"
                  >
                    <div className="">
                      <div className="">
                        {children?.map((child) => {
                          const childChildren = getChildren(child);
                          const hasChildren =
                            childChildren && childChildren.length > 0;
                          const isActive =
                            activePath[level + 1]?._id === child._id;

                          return (
                            <div
                              key={child._id}
                              className={`
                                group flex items-center justify-between py-2 px-3 border border-transparent cursor-pointer
                                transition-colors duration-200 relative
                                ${
                                  isActive
                                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                                    : "hover:bg-gray-50"
                                }
                              `}
                              onClick={(e) =>
                                handleCategoryClick(child, level + 1, e)
                              }
                            >
                              <span className="text-sm text-gray-800">
                                {child.name}
                              </span>
                              {hasChildren && (
                                <>
                                  <FiChevronRight className="w-4 h-4 text-gray-400" />
                                  {/* Tooltip for parent selection */}
                                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                                    Double-click to select
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
