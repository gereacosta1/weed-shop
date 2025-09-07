'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      toast.success('Thanks for subscribing!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Flower', href: '/shop?category=flower' },
      { name: 'Vapes', href: '/shop?category=vape' },
      { name: 'Gummies', href: '/shop?category=gummies' },
      { name: 'Pre-Rolls', href: '/shop?category=prerolls' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'COA Reports', href: '/coa' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Compliance', href: '/legal/compliance' },
      { name: 'Returns & Refunds', href: '/legal/returns' },
    ],
  };

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">GreenLeaf</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Premium cannabis products delivered discreetly to your door. 
              Lab-tested quality you can trust.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest products and deals
                </p>
              </div>
              
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-500" />
              <span>support@greenleaf.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-500" />
              <span>1-800-GREEN-LEAF</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-500" />
              <span>Licensed in 12+ states</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 GreenLeaf. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <span>💳</span>
              <span>Visa, Mastercard, ACH accepted</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-4 border-t">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Products have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease. 
            Hemp-derived products contain less than 0.3% Δ9 THC by dry weight. Must be 21+ to purchase. 
            Please consume responsibly and keep out of reach of children and pets.
          </p>
        </div>
      </div>
    </footer>
  );
}