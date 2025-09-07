export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'flower' | 'vape' | 'gummies' | 'prerolls';
  price: number;
  compareAtPrice?: number;
  images: string[];
  potency: {
    thca?: number;
    delta8?: number;
    cbd?: number;
  };
  weight: string;
  badges: ('Sativa' | 'Indica' | 'Hybrid' | 'New' | 'Popular' | 'Lab Tested')[];
  inventory: number;
  description: string;
  features: string[];
  coaUrl: string;
  shippingRestrictions: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  strain?: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'super-lemon-haze-14g',
    title: 'Super Lemon Haze',
    subtitle: 'Premium Sativa Flower',
    category: 'flower',
    price: 119.99,
    compareAtPrice: 149.99,
    images: [
      'https://images.pexels.com/photos/7671914/pexels-photo-7671914.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop',
      'https://images.pexels.com/photos/7671915/pexels-photo-7671915.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop'
    ],
    potency: { thca: 26.4, cbd: 0.8 },
    weight: '14g',
    badges: ['Sativa', 'Popular', 'Lab Tested'],
    inventory: 47,
    description: 'Energizing citrus strain perfect for daytime use with uplifting effects and bright lemony aroma.',
    features: ['Citrus & Lemon Aroma', 'Energizing Effects', 'Daytime Use', 'Premium Quality'],
    coaUrl: 'https://example.com/coa/super-lemon-haze-batch-001',
    shippingRestrictions: ['ID', 'UT', 'OR', 'VT', 'RI', 'HI', 'AR', 'KS', 'LA', 'OK'],
    rating: 4.8,
    reviewsCount: 124,
    featured: true,
    strain: 'Super Lemon Haze'
  },
  {
    id: '2',
    slug: 'granddaddy-purple-7g',
    title: 'Granddaddy Purple',
    subtitle: 'Classic Indica Flower',
    category: 'flower',
    price: 69.99,
    images: [
      'https://images.pexels.com/photos/7671920/pexels-photo-7671920.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { thca: 23.1, cbd: 1.2 },
    weight: '7g',
    badges: ['Indica', 'Lab Tested'],
    inventory: 32,
    description: 'Deep relaxation with grape and berry flavors. Perfect for evening wind-down sessions.',
    features: ['Grape & Berry Flavors', 'Relaxing Effects', 'Evening Use', 'Classic Strain'],
    coaUrl: 'https://example.com/coa/granddaddy-purple-batch-002',
    shippingRestrictions: ['ID', 'UT', 'VT', 'RI'],
    rating: 4.6,
    reviewsCount: 89,
    strain: 'Granddaddy Purple'
  },
  {
    id: '3',
    slug: 'blue-dream-3-5g',
    title: 'Blue Dream',
    subtitle: 'Balanced Hybrid Flower',
    category: 'flower',
    price: 39.99,
    images: [
      'https://images.pexels.com/photos/7671921/pexels-photo-7671921.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { thca: 21.8, cbd: 0.6 },
    weight: '3.5g',
    badges: ['Hybrid', 'New', 'Lab Tested'],
    inventory: 58,
    description: 'Perfect balance of mental stimulation and physical relaxation with sweet berry aroma.',
    features: ['Sweet Berry Aroma', 'Balanced Effects', 'All-Day Use', 'Beginner Friendly'],
    coaUrl: 'https://example.com/coa/blue-dream-batch-003',
    shippingRestrictions: ['ID', 'UT'],
    rating: 4.7,
    reviewsCount: 156,
    featured: true,
    strain: 'Blue Dream'
  },
  {
    id: '4',
    slug: 'og-kush-14g',
    title: 'OG Kush',
    subtitle: 'Classic Hybrid Flower',
    category: 'flower',
    price: 109.99,
    images: [
      'https://images.pexels.com/photos/7671922/pexels-photo-7671922.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { thca: 24.5, cbd: 0.9 },
    weight: '14g',
    badges: ['Hybrid', 'Popular', 'Lab Tested'],
    inventory: 21,
    description: 'Legendary strain with earthy pine flavor and balanced euphoric effects.',
    features: ['Earthy Pine Flavor', 'Euphoric Effects', 'Stress Relief', 'Legendary Genetics'],
    coaUrl: 'https://example.com/coa/og-kush-batch-004',
    shippingRestrictions: ['ID', 'UT', 'VT'],
    rating: 4.9,
    reviewsCount: 203,
    strain: 'OG Kush'
  },
  {
    id: '5',
    slug: 'wedding-cake-7g',
    title: 'Wedding Cake',
    subtitle: 'Premium Indica Flower',
    category: 'flower',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/7671923/pexels-photo-7671923.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { thca: 25.2, cbd: 0.4 },
    weight: '7g',
    badges: ['Indica', 'Lab Tested'],
    inventory: 15,
    description: 'Sweet vanilla flavor with deeply relaxing effects. Perfect for evening relaxation.',
    features: ['Sweet Vanilla Flavor', 'Deeply Relaxing', 'Evening Use', 'Premium Quality'],
    coaUrl: 'https://example.com/coa/wedding-cake-batch-005',
    shippingRestrictions: ['ID', 'UT', 'OR', 'VT'],
    rating: 4.8,
    reviewsCount: 78,
    strain: 'Wedding Cake'
  },
  {
    id: '6',
    slug: 'sativa-blend-vape-cart',
    title: 'Sativa Blend Cartridge',
    subtitle: '1g Premium Vape Cart',
    category: 'vape',
    price: 49.99,
    compareAtPrice: 59.99,
    images: [
      'https://images.pexels.com/photos/7262765/pexels-photo-7262765.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { delta8: 87.5 },
    weight: '1g',
    badges: ['Sativa', 'Popular', 'Lab Tested'],
    inventory: 89,
    description: 'Energizing sativa blend in a premium 510-thread cartridge with natural terpenes.',
    features: ['510-Thread Compatible', 'Natural Terpenes', 'Energizing Effects', 'Lab Tested'],
    coaUrl: 'https://example.com/coa/sativa-vape-batch-001',
    shippingRestrictions: ['ID', 'UT', 'VT', 'RI', 'HI'],
    rating: 4.5,
    reviewsCount: 67,
    featured: true
  },
  {
    id: '7',
    slug: 'indica-blend-vape-cart',
    title: 'Indica Blend Cartridge',
    subtitle: '1g Premium Vape Cart',
    category: 'vape',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/7262766/pexels-photo-7262766.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { delta8: 89.2 },
    weight: '1g',
    badges: ['Indica', 'Lab Tested'],
    inventory: 76,
    description: 'Relaxing indica blend with smooth vapor production and calming effects.',
    features: ['510-Thread Compatible', 'Smooth Vapor', 'Calming Effects', 'Premium Hardware'],
    coaUrl: 'https://example.com/coa/indica-vape-batch-001',
    shippingRestrictions: ['ID', 'UT', 'VT', 'RI'],
    rating: 4.6,
    reviewsCount: 45
  },
  {
    id: '8',
    slug: 'hybrid-vape-pen',
    title: 'Hybrid Disposable Pen',
    subtitle: '0.5g Disposable Vape',
    category: 'vape',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/7262767/pexels-photo-7262767.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { delta8: 85.8 },
    weight: '0.5g',
    badges: ['Hybrid', 'New', 'Lab Tested'],
    inventory: 134,
    description: 'Convenient disposable pen with balanced hybrid effects. No charging required.',
    features: ['No Charging Required', 'Balanced Effects', 'Portable Design', 'Draw Activated'],
    coaUrl: 'https://example.com/coa/hybrid-pen-batch-001',
    shippingRestrictions: ['ID', 'UT'],
    rating: 4.4,
    reviewsCount: 23
  },
  {
    id: '9',
    slug: 'mixed-berry-gummies',
    title: 'Mixed Berry Gummies',
    subtitle: '10mg Delta-8 Each',
    category: 'gummies',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/8030976/pexels-photo-8030976.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { delta8: 10 },
    weight: '20 pieces',
    badges: ['Popular', 'Lab Tested'],
    inventory: 156,
    description: 'Delicious mixed berry flavored gummies with 10mg Delta-8 per piece. Perfect for micro-dosing.',
    features: ['10mg Per Piece', 'Mixed Berry Flavor', 'Precise Dosing', 'Vegan Friendly'],
    coaUrl: 'https://example.com/coa/berry-gummies-batch-001',
    shippingRestrictions: ['ID', 'UT', 'OR', 'VT', 'RI', 'HI', 'AR'],
    rating: 4.7,
    reviewsCount: 189,
    featured: true
  },
  {
    id: '10',
    slug: 'watermelon-gummies',
    title: 'Watermelon Gummies',
    subtitle: '25mg Delta-8 Each',
    category: 'gummies',
    price: 34.99,
    images: [
      'https://images.pexels.com/photos/8030977/pexels-photo-8030977.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { delta8: 25 },
    weight: '12 pieces',
    badges: ['Lab Tested'],
    inventory: 87,
    description: 'High-potency watermelon gummies with 25mg Delta-8 per piece. For experienced users.',
    features: ['25mg Per Piece', 'Watermelon Flavor', 'High Potency', 'Sugar Coated'],
    coaUrl: 'https://example.com/coa/watermelon-gummies-batch-001',
    shippingRestrictions: ['ID', 'UT', 'OR', 'VT', 'RI', 'HI'],
    rating: 4.6,
    reviewsCount: 92
  },
  {
    id: '11',
    slug: 'peach-rings-gummies',
    title: 'Peach Ring Gummies',
    subtitle: '15mg Delta-8 Each',
    category: 'gummies',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/8030978/pexels-photo-8030978.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { delta8: 15 },
    weight: '16 pieces',
    badges: ['New', 'Lab Tested'],
    inventory: 134,
    description: 'Sweet peach ring gummies with perfectly balanced 15mg Delta-8 per piece.',
    features: ['15mg Per Piece', 'Peach Ring Shape', 'Balanced Dose', 'Natural Flavors'],
    coaUrl: 'https://example.com/coa/peach-rings-batch-001',
    shippingRestrictions: ['ID', 'UT', 'VT'],
    rating: 4.5,
    reviewsCount: 34
  },
  {
    id: '12',
    slug: 'premium-preroll-pack',
    title: 'Premium Pre-Roll Pack',
    subtitle: '5x 1g Mixed Strains',
    category: 'prerolls',
    price: 59.99,
    compareAtPrice: 74.99,
    images: [
      'https://images.pexels.com/photos/7671924/pexels-photo-7671924.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop'
    ],
    potency: { thca: 22.5 },
    weight: '5g total',
    badges: ['Popular', 'Lab Tested'],
    inventory: 43,
    description: 'Hand-rolled premium pre-rolls featuring a mix of our best-selling strains. Ready to smoke.',
    features: ['5 Pre-Rolls Included', 'Mixed Premium Strains', 'Hand Rolled', 'Ready to Smoke'],
    coaUrl: 'https://example.com/coa/preroll-pack-batch-001',
    shippingRestrictions: ['ID', 'UT', 'OR', 'VT', 'RI', 'HI', 'AR', 'KS'],
    rating: 4.8,
    reviewsCount: 167,
    featured: true
  }
];

export const categories = [
  { id: 'flower', name: 'Flower', icon: '🌸' },
  { id: 'vape', name: 'Vapes', icon: '💨' },
  { id: 'gummies', name: 'Gummies', icon: '🟢' },
  { id: 'prerolls', name: 'Pre-Rolls', icon: '🚬' }
];

export const strainTypes = ['Sativa', 'Indica', 'Hybrid'];

export const potencyRanges = [
  { label: 'Low (0-15%)', min: 0, max: 15 },
  { label: 'Medium (16-22%)', min: 16, max: 22 },
  { label: 'High (23-28%)', min: 23, max: 28 },
  { label: 'Very High (29%+)', min: 29, max: 100 }
];

export const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: 1000 }
];