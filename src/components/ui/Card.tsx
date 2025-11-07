import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const cardVariants = cva("card-base transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white border-warmGray-200 shadow-soft hover:shadow-medium",
      elevated: "bg-white border-warmGray-200 shadow-medium hover:shadow-large",
      craft: "bg-white border-craft-200 shadow-craft hover:shadow-warm",
      elegant:
        "bg-gradient-to-br from-white to-warmGray-50 border-craft-200 shadow-large hover:shadow-xl",
      minimal: "bg-white border-0 shadow-none hover:shadow-soft",
      outlined:
        "bg-transparent border-2 border-warmGray-300 shadow-none hover:border-craft-400 hover:shadow-soft",
      ghost: "bg-transparent border-0 shadow-none hover:bg-warmGray-50",
    },
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
    hover: {
      none: "",
      lift: "hover:-translate-y-1",
      scale: "hover:scale-105",
      glow: "hover:ring-4 hover:ring-craft-200",
    },
    clickable: {
      true: "cursor-pointer",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    hover: "none",
    clickable: false,
  },
});

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center items-center",
      right: "text-right items-end",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const cardContentVariants = cva("flex-1", {
  variants: {
    spacing: {
      none: "pt-0",
      sm: "pt-2",
      md: "pt-4",
      lg: "pt-6",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

const cardFooterVariants = cva("flex items-center", {
  variants: {
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    spacing: {
      none: "pt-0",
      sm: "pt-2",
      md: "pt-4",
      lg: "pt-6",
    },
  },
  defaultVariants: {
    align: "left",
    spacing: "md",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, size, hover, clickable, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? "div" : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          cardVariants({ variant, size, hover, clickable, className })
        )}
        {...props}
      />
    );
  }
);

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ align }), className)}
      {...props}
    />
  )
);

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, level = 3, ...props }, ref) => {
    const Heading = `h${level}` as const;

    return (
      <Heading
        ref={ref}
        className={cn(
          "font-serif font-semibold leading-none tracking-tight text-warmGray-900",
          level === 1 && "text-3xl",
          level === 2 && "text-2xl",
          level === 3 && "text-xl",
          level === 4 && "text-lg",
          level === 5 && "text-base",
          level === 6 && "text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-warmGray-600 leading-relaxed", className)}
    {...props}
  />
));

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ spacing }), className)}
      {...props}
    />
  )
);

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ align, spacing }), className)}
      {...props}
    />
  )
);

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  (
    { className, aspectRatio = "landscape", overlay, overlayContent, ...props },
    ref
  ) => (
    <div className="relative">
      <img
        ref={ref}
        className={cn(
          "w-full object-cover",
          aspectRatio === "square" && "aspect-square",
          aspectRatio === "video" && "aspect-video",
          aspectRatio === "portrait" && "aspect-[3/4]",
          aspectRatio === "landscape" && "aspect-[4/3]",
          className
        )}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          {overlayContent}
        </div>
      )}
    </div>
  )
);

// Product Card - Specialized for craft items
interface ProductCardProps extends CardProps {
  image: string;
  imageAlt: string;
  title: string;
  description?: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  maxRating?: number;
  badge?: string;
  onAddToCart?: () => void;
  onQuickView?: () => void;
  inStock?: boolean;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      image,
      imageAlt,
      title,
      description,
      price,
      originalPrice,
      rating,
      maxRating = 5,
      badge,
      onAddToCart,
      onQuickView,
      inStock = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        variant="craft"
        hover="lift"
        clickable={!!onQuickView}
        className={cn("group overflow-hidden", className)}
        onClick={onQuickView}
        {...props}
      >
        <div className="relative">
          <CardImage
            src={image}
            alt={imageAlt}
            aspectRatio="square"
            overlay={true}
            overlayContent={
              <div className="flex gap-2">
                {onQuickView && (
                  <button className="bg-white text-warmGray-800 px-4 py-2 rounded-lg hover:bg-warmGray-100 transition-colors">
                    Quick View
                  </button>
                )}
                {onAddToCart && inStock && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart();
                    }}
                    className="bg-craft-500 text-white px-4 py-2 rounded-lg hover:bg-craft-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            }
          />
          {badge && (
            <div className="absolute top-2 left-2 bg-terracotta-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {badge}
            </div>
          )}
          {!inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        <CardContent spacing="sm">
          <CardTitle
            level={4}
            className="mb-2 group-hover:text-craft-700 transition-colors"
          >
            {title}
          </CardTitle>

          {description && (
            <CardDescription className="mb-3">{description}</CardDescription>
          )}

          {rating !== undefined && (
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: maxRating }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-sm",
                    i < rating ? "text-yellow-400" : "text-warmGray-300"
                  )}
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-warmGray-500 ml-1">
                ({rating}/{maxRating})
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-warmGray-900">{price}</span>
            {originalPrice && (
              <span className="text-sm text-warmGray-500 line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
CardImage.displayName = "CardImage";
ProductCard.displayName = "ProductCard";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  ProductCard,
  cardVariants,
};

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
  ProductCardProps,
};
