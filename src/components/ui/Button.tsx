import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva("btn-base relative overflow-hidden group", {
  variants: {
    variant: {
      primary:
        "bg-craft-500 hover:bg-craft-600 text-white shadow-craft border-craft-500 focus:ring-craft-500",
      secondary:
        "bg-sage-500 hover:bg-sage-600 text-white shadow-medium border-sage-500 focus:ring-sage-500",
      outline:
        "border-2 border-craft-500 text-craft-700 hover:bg-craft-50 hover:border-craft-600 bg-transparent focus:ring-craft-500",
      ghost:
        "text-craft-700 hover:bg-craft-100 hover:text-craft-800 bg-transparent focus:ring-craft-500",
      terracotta:
        "bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-medium border-terracotta-500 focus:ring-terracotta-500",
      forest:
        "bg-forest-600 hover:bg-forest-700 text-white shadow-medium border-forest-600 focus:ring-forest-500",
      elegant:
        "bg-gradient-to-r from-craft-500 to-sage-500 hover:from-craft-600 hover:to-sage-600 text-white shadow-large border-transparent focus:ring-craft-500",
      destructive:
        "bg-red-500 hover:bg-red-600 text-white shadow-medium border-red-500 focus:ring-red-500",
      link: "text-craft-600 hover:text-craft-700 underline-offset-4 hover:underline bg-transparent p-0 h-auto focus:ring-craft-500",
    },
    size: {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-11 px-6 text-base rounded-lg",
      lg: "h-12 px-8 text-lg rounded-xl",
      xl: "h-14 px-10 text-xl rounded-2xl",
      icon: "h-11 w-11 rounded-lg",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    loading: {
      true: "cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </div>
        )}

        <div
          className={cn(
            "flex items-center justify-center gap-2",
            loading && "opacity-0"
          )}
        >
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </div>

        {/* Elegant hover effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </>
    );

    if (asChild) {
      return (
        <span
          className={cn(
            buttonVariants({ variant, size, fullWidth, loading, className })
          )}
        >
          {content}
        </span>
      );
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, loading, className })
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
