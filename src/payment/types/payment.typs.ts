/* eslint-disable prettier/prettier */
export interface PaymentServiceGrpc {
  CreatePayment(data: CreatePaymentRequest): any;
  GetPayment(data: { paymentId: string }): any;
  RefundPayment(data: { paymentId: string }): any;
  UpdatePaymentStatus(data: { transactionId: string; status: string }): any;
}

export interface CreatePaymentRequest {
  orderId: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
}
