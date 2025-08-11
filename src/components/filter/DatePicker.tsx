import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

type SingleValue = Date | undefined;
type RangeValue = DateRange | undefined;

interface BaseProps {
  disabled?: boolean;
}

type SingleProps = BaseProps & {
  mode: "single";
  value: SingleValue;
  onChange: (value: SingleValue) => void;
};

type RangeProps = BaseProps & {
  mode: "range";
  value: RangeValue;
  onChange: (value: RangeValue) => void;
};

type Props = SingleProps | RangeProps;

export function DatePickerWithRange(props: Props) {
  const [open, setOpen] = useState(false);

  const displayText =
    props.mode === "single"
      ? props.value
        ? props.value.toLocaleDateString()
        : "Select date"
      : props.value?.from && props.value.to
      ? `${props.value.from.toLocaleDateString()} - ${props.value.to.toLocaleDateString()}`
      : props.value?.from
      ? `${props.value.from.toLocaleDateString()}`
      : "Select date range";

      function handleSelectSingle(date:(Date & DateRange) | undefined) {
        if (date === undefined) return;
        props.onChange(date);
      }

  return (
    <div className="flex flex-col gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={props.disabled}>
          <Button
            variant="outline"
            className={cn(
              "justify-between w-full font-normal",
              (props.mode === "single" ? !props.value : !props.value?.from) &&
                "text-muted-foreground"
            )}
          >
            {displayText}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {props.mode === "single" ? (
            <Calendar
              mode="single"
              selected={props.value}
              onSelect={handleSelectSingle}

              captionLayout="dropdown"
              required={false}
            />
          ) : (
            <Calendar
              mode="range"
              selected={props.value}
              onSelect={props.onChange}
              captionLayout="dropdown"
              required={false}
              numberOfMonths={2}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
