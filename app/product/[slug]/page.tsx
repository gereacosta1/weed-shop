import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailPage from './ProductDetailPage';
import { products } from '@/data/products';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} - ${product.subtitle} | GreenLeaf`,
    description: product.description,
    openGraph: {
      title: `${product.title} - ${product.subtitle}`,
      description: product.description,
      images: [product.images[0]],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - ${product.subtitle}`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}