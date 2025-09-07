import { NextRequest, NextResponse } from 'next/server';
import { OrderData, CheckoutSession } from '@/lib/payments';

export async function POST(request: NextRequest) {
  try {
    const { order, gateway = 'mock' }: { order: OrderData; gateway?: string } = await request.json();

    // Validate order data
    if (!order || !order.items || order.items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      );
    }

    // Simulate different gateway behaviors
    let session: CheckoutSession;

    switch (gateway) {
      case 'paymentcloud':
        // Simulate PaymentCloud API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        session = {
          transactionId: `pc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'pending',
          paymentUrl: `https://secure.paymentcloud.com/checkout/${order.id}`,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        };
        break;

      case 'easypay':
        // Simulate EasyPayDirect API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        session = {
          transactionId: `ep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'pending',
          paymentUrl: `https://checkout.easypay.com/pay/${order.id}`,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        };
        break;

      default:
        // Mock adapter
        await new Promise(resolve => setTimeout(resolve, 800));
        session = {
          transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'pending',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        };
        break;
    }

    // Store order and session (in a real app, this would go to a database)
    console.log('Order created:', {
      orderId: order.id,
      transactionId: session.transactionId,
      total: order.total,
      gateway,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(session);

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}