import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Webhook secrets (in production, these would be from environment variables)
const WEBHOOK_SECRETS = {
  paymentcloud: process.env.PAYMENTCLOUD_WEBHOOK_SECRET || 'pc_webhook_secret_dev',
  easypay: process.env.EASYPAY_WEBHOOK_SECRET || 'ep_webhook_secret_dev',
  mock: 'mock_webhook_secret'
};

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const headersList = headers();
    
    // Get signature and gateway from headers
    const signature = headersList.get('x-webhook-signature') || '';
    const gateway = headersList.get('x-gateway') || 'mock';
    
    // Verify webhook signature
    const secret = WEBHOOK_SECRETS[gateway as keyof typeof WEBHOOK_SECRETS];
    if (!secret) {
      console.error('Unknown gateway:', gateway);
      return NextResponse.json({ error: 'Unknown gateway' }, { status: 400 });
    }

    // For demo purposes, we'll skip signature verification in mock mode
    if (gateway !== 'mock' && !verifyWebhookSignature(payload, signature, secret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse webhook data
    const webhookData = JSON.parse(payload);
    
    // Process different webhook events
    switch (webhookData.event) {
      case 'payment.completed':
      case 'payment.captured':
        // Update order status to paid
        console.log('Payment completed:', {
          transactionId: webhookData.transactionId,
          orderId: webhookData.orderId,
          amount: webhookData.amount,
          gateway,
          timestamp: new Date().toISOString()
        });

        // In a real application, you would:
        // 1. Update order status in database
        // 2. Send confirmation email
        // 3. Trigger fulfillment process
        // 4. Update inventory
        
        break;

      case 'payment.failed':
        console.log('Payment failed:', {
          transactionId: webhookData.transactionId,
          orderId: webhookData.orderId,
          reason: webhookData.reason,
          gateway,
          timestamp: new Date().toISOString()
        });
        
        // Handle failed payment
        break;

      case 'payment.refunded':
        console.log('Payment refunded:', {
          transactionId: webhookData.transactionId,
          orderId: webhookData.orderId,
          amount: webhookData.refundAmount,
          gateway,
          timestamp: new Date().toISOString()
        });
        
        // Handle refund
        break;

      default:
        console.log('Unhandled webhook event:', webhookData.event);
        break;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}