import React from "react";
import { cn } from "../../utils/cn";

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const SimpleInput = React.forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-warmGray-700">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-warmGray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-warmGray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-craft-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

SimpleInput.displayName = "SimpleInput";

export { SimpleInput };
