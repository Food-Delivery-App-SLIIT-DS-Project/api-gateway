export interface PaymentServiceGrpc {
  CreatePayment(data: CreatePaymentRequest): any;
  GetPayment(data: { paymentId: string }): any;
  RefundPayment(data: { paymentId: string }): any;
}

export interface CreatePaymentRequest {
  orderId: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
}
