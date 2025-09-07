import { NextRequest, NextResponse } from 'next/server';
import { PaymentResult } from '@/lib/payments';

export async function POST(request: NextRequest) {
  try {
    const { transactionId, gateway = 'mock' }: { transactionId: string; gateway?: string } = await request.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Simulate different gateway behaviors
    let result: PaymentResult;

    switch (gateway) {
      case 'paymentcloud':
        await new Promise(resolve => setTimeout(resolve, 2000));
        result = {
          transactionId,
          status: Math.random() > 0.05 ? 'success' : 'failed', // 95% success rate
          amount: 0, // Would get from order data in real implementation
          message: 'PaymentCloud capture completed'
        };
        break;

      case 'easypay':
        await new Promise(resolve => setTimeout(resolve, 1500));
        result = {
          transactionId,
          status: Math.random() > 0.08 ? 'success' : 'failed', // 92% success rate
          amount: 0,
          message: 'EasyPayDirect capture completed'
        };
        break;

      default:
        // Mock adapter
        await new Promise(resolve => setTimeout(resolve, 1000));
        result = {
          transactionId,
          status: Math.random() > 0.1 ? 'success' : 'failed', // 90% success rate
          amount: 0,
          message: 'Mock capture completed'
        };
        break;
    }

    // Log the capture attempt
    console.log('Payment capture:', {
      transactionId,
      status: result.status,
      gateway,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}