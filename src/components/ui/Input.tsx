import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const inputVariants = cva(
  "input-base focus:ring-craft-500 border-warmGray-300",
  {
    variants: {
      variant: {
        default:
          "bg-white border-warmGray-300 focus:border-craft-500 text-warmGray-900 placeholder:text-warmGray-400",
        filled:
          "bg-warmGray-50 border-warmGray-200 focus:bg-white focus:border-craft-500 text-warmGray-900 placeholder:text-warmGray-400",
        elegant:
          "bg-gradient-to-r from-white to-warmGray-50 border-craft-200 focus:border-craft-500 text-warmGray-900 placeholder:text-warmGray-400 shadow-soft",
        minimal:
          "bg-transparent border-0 border-b-2 border-warmGray-300 focus:border-craft-500 rounded-none px-0 text-warmGray-900 placeholder:text-warmGray-400",
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm rounded-md",
        md: "h-11 px-4 py-3 text-base rounded-lg",
        lg: "h-12 px-6 py-4 text-lg rounded-xl",
      },
      state: {
        default: "",
        error:
          "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50",
        warning:
          "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default",
    },
  }
);

const textareaVariants = cva(
  "input-base focus:ring-craft-500 border-warmGray-300 min-h-[100px] resize-y",
  {
    variants: {
      variant: {
        default:
          "bg-white border-warmGray-300 focus:border-craft-500 text-warmGray-900 placeholder:text-warmGray-400",
        filled:
          "bg-warmGray-50 border-warmGray-200 focus:bg-white focus:border-craft-500 text-warmGray-900 placeholder:text-warmGray-400",
        elegant:
          "bg-gradient-to-r from-white to-warmGray-50 border-craft-200 focus:border-craft-500 text-warmGray-900 placeholder:text-warmGray-400 shadow-soft",
        minimal:
          "bg-transparent border-0 border-b-2 border-warmGray-300 focus:border-craft-500 rounded-none px-0 text-warmGray-900 placeholder:text-warmGray-400",
      },
      size: {
        sm: "p-3 text-sm rounded-md",
        md: "p-4 text-base rounded-lg",
        lg: "p-6 text-lg rounded-xl",
      },
      state: {
        default: "",
        error:
          "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50",
        warning:
          "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default",
    },
  }
);

const selectVariants = cva(
  "input-base focus:ring-craft-500 border-warmGray-300 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white border-warmGray-300 focus:border-craft-500 text-warmGray-900",
        filled:
          "bg-warmGray-50 border-warmGray-200 focus:bg-white focus:border-craft-500 text-warmGray-900",
        elegant:
          "bg-gradient-to-r from-white to-warmGray-50 border-craft-200 focus:border-craft-500 text-warmGray-900 shadow-soft",
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm rounded-md",
        md: "h-11 px-4 py-3 text-base rounded-lg",
        lg: "h-12 px-6 py-4 text-lg rounded-xl",
      },
      state: {
        default: "",
        error:
          "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50",
        warning:
          "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default",
    },
  }
);

interface BaseInputProps extends VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    BaseInputProps {}

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    BaseInputProps {
  rows?: number;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    Omit<BaseInputProps, "variant" | "size" | "state">,
    VariantProps<typeof selectVariants> {
  options?: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      size,
      state,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      required,
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = React.useMemo(
      () => {
        if (id) return id;
        // Use a static counter instead of Date.now() to ensure stable IDs
        return `input-${
          props.placeholder?.replace(/\s+/g, "-").toLowerCase() || "field"
        }-${Math.random().toString(36).substr(2, 9)}`;
      },
      [id, props.placeholder] // Only depend on id and placeholder which should be stable
    );
    const finalState = errorMessage ? "error" : state;

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-warmGray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-warmGray-400">{leftIcon}</span>
            </div>
          )}

          <input
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              inputVariants({ variant, size, state: finalState }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-warmGray-400">{rightIcon}</span>
            </div>
          )}
        </div>

        {(helperText || errorMessage) && (
          <p
            className={cn(
              "text-sm",
              errorMessage ? "text-red-600" : "text-warmGray-500"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      state,
      label,
      helperText,
      errorMessage,
      required,
      fullWidth = true,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = React.useMemo(() => {
      if (id) return id;
      return `textarea-${
        props.placeholder?.replace(/\s+/g, "-").toLowerCase() || "field"
      }-${Math.random().toString(36).substr(2, 9)}`;
    }, [id, props.placeholder]);
    const finalState = errorMessage ? "error" : state;

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-warmGray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            textareaVariants({ variant, size, state: finalState }),
            className
          )}
          {...props}
        />

        {(helperText || errorMessage) && (
          <p
            className={cn(
              "text-sm",
              errorMessage ? "text-red-600" : "text-warmGray-500"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      state,
      label,
      helperText,
      errorMessage,
      required,
      fullWidth = true,
      id,
      options = [],
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = React.useMemo(() => {
      if (id) return id;
      return `select-${
        placeholder?.replace(/\\s+/g, "-").toLowerCase() || "field"
      }-${Math.random().toString(36).substr(2, 9)}`;
    }, [id, placeholder]);
    const finalState = errorMessage ? "error" : state;

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-warmGray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <select
          id={selectId}
          ref={ref}
          className={cn(
            selectVariants({ variant, size, state: finalState }),
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>

        {(helperText || errorMessage) && (
          <p
            className={cn(
              "text-sm",
              errorMessage ? "text-red-600" : "text-warmGray-500"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
Textarea.displayName = "Textarea";
Select.displayName = "Select";

export {
  Input,
  Textarea,
  Select,
  inputVariants,
  textareaVariants,
  selectVariants,
};
export type { InputProps, TextareaProps, SelectProps };
