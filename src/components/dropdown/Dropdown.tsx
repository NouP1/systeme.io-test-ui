import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown";
import { Check, ChevronsUpDown, LucideChevronDown } from "lucide-react";
import { SearchInput } from "./Search";
import clsx from "clsx";

export interface Item {
  value: string | number | boolean;
  label: string;
}

interface DropdownStyleOverrides {
  captionClassName?: string;
  trigerClassName?: string;
  selectedLabelClassName?: string;
}

interface DropdownProps {
  disabled?: boolean;
  value?: string[];
  options?: Item[];
  caption?: string;
  helpLink?: string;
  helpText?: string;
  isLoading?: boolean;
  placeholder?: string;
  standalone?: boolean;
  showHelpLink?: boolean;
  selectedChoice?: string | null;
  searchPlaceholder?: string;
  disableContinueButton?: boolean;
  disablePrevButton?: boolean;
  allowMultipleSelection?: boolean;
  helpLinkContainerClassName?: string;
  styleOverrides?: DropdownStyleOverrides;
  setSelectedChoice?: React.Dispatch<React.SetStateAction<string | null>>;
  onChange?: (value: (string | number | boolean)[]) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  disabled,
  value,
  options = [],
  caption = null,
  isLoading,
  placeholder = "Select item",
  searchPlaceholder = "Search...",
  allowMultipleSelection = false,
  styleOverrides = {},
  onChange,
  setSelectedChoice,
}) => {
  const [open, setOpen] = useState(false);
  const [filteredChoices, setFilteredChoices] = useState<Item[]>(options);
  const [selectedKeys, setSelectedKeys] = useState<
    (string | number | boolean)[]
  >([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<string>("auto");
  const {
    captionClassName = "",
    selectedLabelClassName = "",
    trigerClassName = "",
  } = styleOverrides;

  useEffect(() => {
    setFilteredChoices(options);
  }, [options]);

  useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        const width = triggerRef.current.offsetWidth;
        setTriggerWidth(`${width}px`);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
// console.log(value)
    return () => window.removeEventListener("resize", updateWidth);
  }, [selectedLabel, options.length]);

  useEffect(() => {
    if (value) {
      setSelectedKeys(value);
      if (value.length === 1) {
        const found = options.find((opt) => opt.value === value[0]);
        found ? setSelectedLabel(found.label) : setSelectedLabel(null);
      } else if (value.length > 1) {
        setSelectedLabel(`${value.length} selected`);
      } else {
        setSelectedLabel(null);
      }
    } else {
      setSelectedKeys([]);
      setSelectedLabel(null);
    }
  }, [value, options]);

  const handleChoiceSelect = (
    key: string | number | boolean,
    label: string
  ) => {
    if (allowMultipleSelection) {
      const newKeys = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key];

      setSelectedKeys(newKeys);

      if (newKeys.length === 0) {
        setSelectedLabel(null);
      } else if (newKeys.length === 1) {
        const found = options.find((opt) => opt.value === newKeys[0]);
        found && setSelectedLabel(found.label);
      } else {
        setSelectedLabel(`${newKeys.length} selected`);
      }

      onChange?.(newKeys);
    } else {
      setSelectedKeys([key]);
      setSelectedLabel(label);
      setTimeout(() => setOpen(false), 50);
      onChange?.([key]);
    }
  };
// console.log("selectedkeys",selectedKeys)
  return (
    <div className="flex-col">
      <DropdownMenu open={open} onOpenChange={setOpen} >
        <div className="flex flex-col max-w-[310px]">
          <DropdownMenuTrigger asChild disabled={disabled}>
            <div
              ref={triggerRef}
              className={clsx(
                "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full",
                trigerClassName
              )}
            >
              <div className="flex items-center overflow-hidden">
                <p
                  className={clsx(
                    "text-muted-foreground shrink-0",
                    captionClassName
                  )}
                >
                  {caption}
                </p>
                <p
                  className={clsx(
                    "truncate",
                    selectedLabel
                      ? selectedLabelClassName
                      : "text-muted-foreground"
                  )}
                >
                  {selectedLabel ?? placeholder}
                </p>
              </div>
              <LucideChevronDown
                size={20}
                strokeWidth={1.25}
                className="ml-auto"
              />
            </div>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent
          align="start"
          style={{ width: triggerWidth, position: "relative" }}
          className="!p-0 border border-gray-300 shadow-md text-sm"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {isLoading ? (
            <DropdownMenuItem
              disabled
              className="flex items-center font-primary h-8"
            >
              Loading...
            </DropdownMenuItem>
          ) : (
            <>
              <div className="flex items-center h-8 px-3 py-2">
                <SearchInput
                  sizeIcon={17}
                  disabled={false}
                  strokeWidth={2}
                  data={options}
                  containerClassName="m-0"
                  placeholder={searchPlaceholder}
                  onFilter={(filtered: Item[]) => setFilteredChoices(filtered)}
                />
              </div>
              <DropdownMenuSeparator />

              {filteredChoices.map((option) => (
                <div
                  key={String(option.value)}
                  onClick={() => handleChoiceSelect(option.value, option.label)}
                  data-selected={selectedKeys.includes(option.value)}
                  className={`truncate items-center rounded-md flex p-1 px-1.5 m-1 font-primary cursor-pointer hover:bg-blue-50
      ${
        selectedKeys.includes(option.value)
          ? "bg-sidebar-accent text-sm font-primary hover:bg-sidebar-accent"
          : "bg-white text-normal font-primary"
      }`}
                >
                  {option.label}
                  {selectedKeys.includes(option.value) && (
                    <Check
                      size={18}
                      strokeWidth={3}
                      className="ml-auto mr-1 text-muted-foreground"
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
