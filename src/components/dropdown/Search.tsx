import { Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { useEffect } from "react";
import clsx from "clsx";

export interface Data {
  value: string | number | boolean;
  label: string;
}


export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  placeholder: string;
  sizeIcon: number;
  strokeWidth: number;
  disabled: boolean;
  data: Data[];
  onFilter: (filtered: Data[]) => void;
}


export const SearchInput: React.FC<SearchInputProps> = ({
  containerClassName,
  placeholder,
  sizeIcon,
  strokeWidth,
  disabled,
  className,
  data,
  onFilter,
  ...props
}) => {
  const [query, setQuery] = React.useState("");

  useEffect(() => {
    if (query.trim() === "") {
      onFilter(data);
    } else {
      const filtered = data.filter((row) =>
        JSON.stringify(row).toLowerCase().includes(query.toLowerCase())
      );
      onFilter(filtered);
    }
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className={clsx(
        "rounded-md flex items-center w-40 h-7",
        containerClassName
      )}
    >
      <Search
        size={sizeIcon}
        strokeWidth={strokeWidth}
        className="text-muted-foreground mr-1"
      />
      <Input
        type="text"
        disabled={disabled}
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={clsx(
          "border-none font-primary shadow-none font-[100] text-sm bg-transparent px-1 focus-visible:ring-0 focus-visible:ring-offset-0",
          className
        )}
        {...props}
      />
    </div>
  );
};
export { Search };

