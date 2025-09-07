# GreenLeaf - Premium Cannabis E-commerce Platform

A modern, production-ready cannabis dispensary website built with Next.js 14, TypeScript, and Tailwind CSS. Features a complete e-commerce experience with age verification, product catalog, shopping cart, and payment processing.

## 🌟 Features

### Core Functionality
- **Age Gate**: Mandatory 21+ verification with persistent storage
- **Product Catalog**: Searchable catalog with filters, sorting, and categories
- **Shopping Cart**: Persistent cart with quantity management and local storage
- **Checkout Process**: Multi-step checkout with form validation
- **Payment Processing**: Pluggable payment gateway system with multiple adapters
- **Responsive Design**: Mobile-first design that works on all devices

### Products & Categories
- **12+ Seed Products**: Realistic flower, vapes, gummies, and pre-rolls
- **Detailed Product Pages**: Gallery, specifications, COA links, shipping restrictions
- **Inventory Management**: Stock levels and out-of-stock handling
- **Lab Testing**: COA (Certificate of Analysis) links for all products

### User Experience
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Smooth Animations**: Framer Motion animations with reduced-motion support
- **Toast Notifications**: User feedback for all actions
- **Search & Filters**: Advanced product filtering and search capabilities

### Compliance & Legal
- **Shipping Restrictions**: State-by-state shipping limitations
- **Legal Disclaimers**: Proper compliance messaging and age verification
- **COA Integration**: Lab report links for all products

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cannabis-dispensary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💳 Payment Gateway Configuration

The application includes a pluggable payment system supporting multiple high-risk payment processors:

### Available Adapters

1. **MockAdapter** (Development)
   - Simulates payment processing for development/testing
   - Default adapter when no configuration is provided

2. **PaymentCloudAdapter** (Production)
   - Integration with PaymentCloud high-risk processing
   - Requires API credentials in environment variables

3. **EasyPayDirectAdapter** (Production)
   - Integration with EasyPayDirect
   - Alternative high-risk payment solution

### Switching Payment Gateways

To change payment gateways, update your `.env.local`:

```env
# For development/testing
NEXT_PUBLIC_PAYMENT_GATEWAY=mock

# For PaymentCloud
NEXT_PUBLIC_PAYMENT_GATEWAY=paymentcloud
PAYMENTCLOUD_API_KEY=your_api_key
PAYMENTCLOUD_MERCHANT_ID=your_merchant_id
PAYMENTCLOUD_WEBHOOK_SECRET=your_webhook_secret

# For EasyPayDirect
NEXT_PUBLIC_PAYMENT_GATEWAY=easypay
EASYPAY_API_KEY=your_api_key
EASYPAY_MERCHANT_ID=your_merchant_id
EASYPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Testing Webhooks Locally

To test payment webhooks in development:

1. **Install ngrok** (for webhook testing)
   ```bash
   npm install -g ngrok
   ```

2. **Expose your local server**
   ```bash
   ngrok http 3000
   ```

3. **Configure webhook URL** in your payment provider dashboard:
   ```
   https://your-ngrok-url.ngrok.io/api/webhooks/payments
   ```

4. **Test webhook delivery** by triggering payments through your provider's dashboard

## 🏗 Project Structure

```
app/
├── (storefront)/           # Main storefront pages
│   ├── page.tsx           # Homepage
│   ├── shop/              # Product catalog
│   ├── product/[slug]/    # Product detail pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── about/             # About page
│   ├── faq/               # FAQ page
│   ├── contact/           # Contact page
│   ├── legal/             # Legal pages
│   └── coa/               # COA reports
├── api/                   # API routes
│   ├── payments/          # Payment processing
│   └── webhooks/          # Webhook handlers
└── layout.tsx             # Root layout

components/
├── ui/                    # shadcn/ui components
├── AgeGate.tsx           # Age verification modal
├── Header.tsx            # Site header
├── Footer.tsx            # Site footer
├── ProductCard.tsx       # Product display card
├── ProductModal.tsx      # Quick view modal
├── CartDrawer.tsx        # Shopping cart drawer
└── ThemeProvider.tsx     # Theme management

lib/
├── payments/             # Payment gateway system
│   ├── index.ts          # Main interfaces
│   ├── MockAdapter.ts    # Mock payment adapter
│   ├── PaymentCloudAdapter.ts
│   └── EasyPayDirectAdapter.ts
├── store.ts              # Zustand state management
└── utils/                # Utility functions

data/
└── products.ts           # Product seed data

i18n/
├── en.json              # English translations
└── es.json              # Spanish translations (prepared)
```

## 🎨 Customization

### Updating Products

Edit `data/products.ts` to modify the product catalog:

```typescript
export const products: Product[] = [
  {
    id: '1',
    slug: 'product-slug',
    title: 'Product Name',
    category: 'flower', // flower, vape, gummies, prerolls
    price: 99.99,
    images: ['https://example.com/image.jpg'],
    // ... other properties
  }
];
```

### Styling & Theming

The application uses Tailwind CSS with a custom color system. Modify `tailwind.config.ts` to adjust the theme:

```typescript
theme: {
  extend: {
    colors: {
      // Custom colors for your brand
    }
  }
}
```

### Adding New Payment Gateways

1. Create a new adapter in `lib/payments/`:
   ```typescript
   export class YourGatewayAdapter implements PaymentGateway {
     // Implement required methods
   }
   ```

2. Update the factory in `lib/payments/index.ts`
3. Add environment variables and configuration

## 🔒 Security Considerations

- Age verification is enforced with persistent storage
- Shipping restrictions are checked at checkout
- Payment data is never stored locally
- All forms include proper validation
- HTTPS is required for production
- Webhook signatures are verified

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**: Set all required environment variables
2. **Payment Gateway**: Configure your production payment processor
3. **Legal Compliance**: Ensure all legal pages are updated for your jurisdiction
4. **Age Gate**: Test age verification flow
5. **Shipping**: Configure shipping zones and restrictions
6. **SSL Certificate**: Ensure HTTPS is properly configured
7. **Analytics**: Set up tracking if desired

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run check

# Linting
npm run lint
```

## 📝 Legal Notice

This is a demonstration e-commerce platform. When using this code for actual cannabis commerce:

1. Ensure compliance with all local and state laws
2. Obtain proper licensing and permits
3. Implement proper age and identity verification
4. Configure appropriate shipping restrictions
5. Include all required legal disclaimers
6. Consult with legal professionals

## 🤝 Contributing

This project is designed to be a comprehensive starting point for cannabis e-commerce. Key areas for contribution:

- Additional payment gateway integrations
- Enhanced compliance features
- Improved accessibility
- Performance optimizations
- Additional product types

## 📄 License

This project is provided as-is for educational and commercial use. Please ensure compliance with all applicable laws and regulations in your jurisdiction.

---

Built with ❤️ using Next.js 14, TypeScript, and modern web technologies.