'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils/format';
import Link from 'next/link';

interface CartDrawerProps {
  children: ReactNode;
}

export default function CartDrawer({ children }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, isOpen, closeCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.0875; // Example 8.75% tax
  const total = subtotal + shipping + tax;

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">
              Add some products to get started
            </p>
            <Button asChild>
              <Link href="/shop" onClick={closeCart}>
                Shop Now
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.product.subtitle}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-muted-foreground hover:text-destructive p-0 h-auto"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              {/* Order Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {subtotal < 75 && (
                <div className="text-xs text-center p-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 rounded">
                  Add {formatPrice(75 - subtotal)} more for free shipping!
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/cart" onClick={closeCart}>
                    View Full Cart
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}