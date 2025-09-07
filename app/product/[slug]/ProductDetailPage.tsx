'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Minus, Plus, ShoppingCart, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import { Product, products } from '@/data/products';
import { formatPrice, formatPotency, getStateFromZip } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userState, setUserState] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const isOutOfStock = product.inventory === 0;
  const isLowStock = product.inventory > 0 && product.inventory <= 5;
  const isRestricted = userState && product.shippingRestrictions.includes(userState);

  // Get related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.badges.some(badge => product.badges.includes(badge))))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isRestricted) {
      toast.error('This product cannot be shipped to your state');
      return;
    }
    addItem(product, quantity);
    toast.success(`${quantity}x ${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    if (isRestricted) {
      toast.error('This product cannot be shipped to your state');
      return;
    }
    addItem(product, quantity);
    window.location.href = '/checkout';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

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
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">{product.subtitle}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
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
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <Badge variant="destructive">
                    Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                  </Badge>
                )}
              </div>
              
              {isLowStock && !isOutOfStock && (
                <p className="text-orange-600 font-medium">
                  Only {product.inventory} left in stock
                </p>
              )}
            </div>

            <Separator />

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">Potency:</span>
                <p className="font-semibold text-lg">{formatPotency(product.potency)}</p>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Weight/Size:</span>
                <p className="font-semibold text-lg">{product.weight}</p>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Category:</span>
                <p className="font-semibold text-lg capitalize">{product.category}</p>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Stock:</span>
                <p className="font-semibold text-lg">
                  {isOutOfStock ? 'Out of Stock' : `${product.inventory} available`}
                </p>
              </div>
            </div>

            <Separator />

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-6 py-2 min-w-[80px] text-center font-medium">
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

              <div className="space-y-3">
                <Button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock || isRestricted}
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isRestricted}
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Shipping Restrictions */}
            {isRestricted && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-medium text-destructive mb-1">
                  Shipping Restriction
                </h4>
                <p className="text-sm text-destructive/80">
                  This product cannot be shipped to your state ({userState}).
                </p>
              </div>
            )}

            {/* COA Link */}
            <div>
              <Button variant="outline" asChild className="w-full">
                <a
                  href={product.coaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Lab Report (COA)
                </a>
              </Button>
            </div>

            {/* Legal Notice */}
            <div className="text-xs text-muted-foreground p-4 bg-muted/50 rounded-lg">
              <p className="mb-2">
                🔞 <strong>Must be 21+ to purchase.</strong> Hemp-derived products with &lt;0.3% Δ9 THC.
              </p>
              <p>
                Products have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold">About This Product</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              {product.strain && (
                <div>
                  <h4 className="font-medium mb-2">Strain Information</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.strain} is known for its unique characteristics and carefully cultivated genetics.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Delivery Options</h4>
                  <ul className="space-y-1">
                    <li>• Same-day delivery available in select areas</li>
                    <li>• Standard shipping: 2-3 business days</li>
                    <li>• Express shipping: 1-2 business days</li>
                    <li>• Free shipping on orders over $75</li>
                  </ul>
                </div>
                
                {product.shippingRestrictions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Shipping Restrictions</h4>
                    <p>
                      This product cannot be shipped to: {product.shippingRestrictions.join(', ')}
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Packaging</h4>
                  <p>All orders are packaged discreetly with no cannabis-related branding or labeling.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">You May Also Like</h2>
              <p className="text-muted-foreground">
                Similar products that other customers have enjoyed
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}