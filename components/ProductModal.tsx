'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ExternalLink, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Product } from '@/data/products';
import { formatPrice, formatPotency } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity}x ${product.title} added to cart!`);
    onOpenChange(false);
  };

  const isOutOfStock = product.inventory === 0;
  const isLowStock = product.inventory > 0 && product.inventory <= 5;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <h2>{product.title}</h2>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/5] relative overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold">{product.title}</h1>
                  <p className="text-muted-foreground">{product.subtitle}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant={badge === 'New' ? 'default' : 'secondary'}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              
              {isLowStock && !isOutOfStock && (
                <p className="text-sm text-orange-600">
                  Only {product.inventory} left in stock
                </p>
              )}
            </div>

            <Separator />

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Potency:</span>
                <p className="font-medium">{formatPotency(product.potency)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <p className="font-medium">{product.weight}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium capitalize">{product.category}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Stock:</span>
                <p className="font-medium">
                  {isOutOfStock ? 'Out of Stock' : `${product.inventory} available`}
                </p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-green-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* COA Link */}
            <div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={product.coaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Lab Report (COA)
                </a>
              </Button>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.inventory}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button variant="outline" size="lg" disabled={isOutOfStock}>
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Shipping Restrictions */}
            {product.shippingRestrictions.length > 0 && (
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-1">
                  Shipping Restrictions
                </h4>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  This product cannot be shipped to:{' '}
                  {product.shippingRestrictions.join(', ')}
                </p>
              </div>
            )}

            {/* Legal Notice */}
            <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
              <p>
                🔞 Must be 21+ to purchase. Hemp-derived products with &lt;0.3% Δ9 THC.
                Products have not been evaluated by the FDA.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}