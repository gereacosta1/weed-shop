'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Product } from '@/data/products';
import { formatPrice, formatPotency } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const isOutOfStock = product.inventory === 0;
  const isLowStock = product.inventory > 0 && product.inventory <= 5;

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Card className="overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleQuickView}
                className="backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                Quick View
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.badges.slice(0, 2).map((badge) => (
                <Badge
                  key={badge}
                  variant={badge === 'New' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Stock status */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight mb-1">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewsCount})
                </span>
              </div>

              {/* Potency */}
              <p className="text-sm text-muted-foreground mb-3">
                {formatPotency(product.potency)} • {product.weight}
              </p>
            </div>

            {/* Price and Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                {isLowStock && !isOutOfStock && (
                  <Badge variant="outline" className="text-xs">
                    Only {product.inventory} left
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full"
                size="sm"
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <ProductModal
        product={product}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
}