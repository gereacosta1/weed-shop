export interface PaymentGateway {
  createCheckoutSession(order: OrderData): Promise<CheckoutSession>;
  capture(transactionId: string): Promise<PaymentResult>;
  refund(transactionId: string, amount?: number): Promise<PaymentResult>;
}

export interface OrderData {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
}

export interface CheckoutSession {
  transactionId: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  paymentUrl?: string;
  expiresAt: Date;
}

export interface PaymentResult {
  transactionId: string;
  status: 'success' | 'failed';
  amount: number;
  message?: string;
}

// Payment gateway factory
export class PaymentGatewayFactory {
  static create(): PaymentGateway {
    const gateway = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY || 'mock';
    
    switch (gateway) {
      case 'paymentcloud':
        return new PaymentCloudAdapter();
      case 'easypay':
        return new EasyPayDirectAdapter();
      default:
        return new MockAdapter();
    }
  }
}

// Mock adapter for development
export class MockAdapter implements PaymentGateway {
  async createCheckoutSession(order: OrderData): Promise<CheckoutSession> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    return {
      transactionId: `mock_txn_${Date.now()}`,
      status: 'pending',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    };
  }

  async capture(transactionId: string): Promise<PaymentResult> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      transactionId,
      status: Math.random() > 0.1 ? 'success' : 'failed', // 90% success rate
      amount: 0,
      message: 'Mock payment processed'
    };
  }

  async refund(transactionId: string, amount = 0): Promise<PaymentResult> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      transactionId,
      status: 'success',
      amount,
      message: 'Mock refund processed'
    };
  }
}

// PaymentCloud adapter
export class PaymentCloudAdapter implements PaymentGateway {
  private apiKey = process.env.PAYMENTCLOUD_API_KEY;
  private merchantId = process.env.PAYMENTCLOUD_MERCHANT_ID;

  async createCheckoutSession(order: OrderData): Promise<CheckoutSession> {
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, gateway: 'paymentcloud' })
      });

      if (!response.ok) throw new Error('Failed to create session');
      return await response.json();
    } catch (error) {
      console.error('PaymentCloud session creation failed:', error);
      throw error;
    }
  }

  async capture(transactionId: string): Promise<PaymentResult> {
    const response = await fetch('/api/payments/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, gateway: 'paymentcloud' })
    });

    if (!response.ok) throw new Error('Failed to capture payment');
    return await response.json();
  }

  async refund(transactionId: string, amount?: number): Promise<PaymentResult> {
    const response = await fetch('/api/payments/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, amount, gateway: 'paymentcloud' })
    });

    if (!response.ok) throw new Error('Failed to refund payment');
    return await response.json();
  }
}

// EasyPayDirect adapter
export class EasyPayDirectAdapter implements PaymentGateway {
  private apiKey = process.env.EASYPAY_API_KEY;
  private merchantId = process.env.EASYPAY_MERCHANT_ID;

  async createCheckoutSession(order: OrderData): Promise<CheckoutSession> {
    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order, gateway: 'easypay' })
    });

    if (!response.ok) throw new Error('Failed to create session');
    return await response.json();
  }

  async capture(transactionId: string): Promise<PaymentResult> {
    const response = await fetch('/api/payments/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, gateway: 'easypay' })
    });

    if (!response.ok) throw new Error('Failed to capture payment');
    return await response.json();
  }

  async refund(transactionId: string, amount?: number): Promise<PaymentResult> {
    const response = await fetch('/api/payments/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, amount, gateway: 'easypay' })
    });

    if (!response.ok) throw new Error('Failed to refund payment');
    return await response.json();
  }
}