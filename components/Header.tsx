'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCartStore, useAppStore } from '@/lib/store';
import { categories } from '@/data/products';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCartStore();
  const { darkMode, toggleDarkMode } = useAppStore();
  
  const itemCount = getItemCount();

  const navigation = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold hidden sm:block">GreenLeaf</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Category Dropdown */}
              <div className="relative group">
                <button className="text-foreground/80 hover:text-foreground transition-colors">
                  Categories
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop?category=${category.id}`}
                      className="flex items-center px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.div
                initial={false}
                animate={{ width: isSearchOpen ? 'auto' : '40px' }}
                className="relative"
              >
                {isSearchOpen ? (
                  <div className="flex items-center">
                    <Input
                      placeholder="Search products..."
                      className="w-64 pr-10"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                )}
              </motion.div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="hidden sm:flex"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Cart */}
              <CartDrawer>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Button>
              </CartDrawer>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-lg font-semibold">Menu</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleDarkMode}
                      >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </Button>
                    </div>
                    
                    <nav className="space-y-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2 text-lg font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-4">Categories</h3>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="flex items-center py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="mr-3">{category.icon}</span>
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}