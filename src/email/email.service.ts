/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { EMAIL_SERVICE_NAME, EmailAddress, EmailServiceClient, RejectionEmail, Response } from './types/email';

@Injectable()
export class EmailService implements OnModuleInit {
  private emailServiceClient: EmailServiceClient;
  constructor(@Inject(EMAIL_SERVICE_NAME) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.emailServiceClient = this.client.getService<EmailServiceClient>(EMAIL_SERVICE_NAME);
  }

  sendRegConfirmEmail(request: EmailAddress): Observable<Response> {
    return this.emailServiceClient.sendRestaurantRegConfirmationEmail(request);
  }
  sendRegRejectEmail(request: RejectionEmail): Observable<Response> {
    return this.emailServiceClient.sendRejectionEmail(request);
  }

  sendDriverConfirmEmail(request: EmailAddress): Observable<Response> {
    return this.emailServiceClient.sendDriverConfirmEmail(request);
  }
  sendDriverRejectEmail(request: RejectionEmail): Observable<Response> {
    return this.emailServiceClient.sendDriverRejectEmail(request);
  }
  sendRefundEmail(request: RejectionEmail): Observable<Response> {
    return this.emailServiceClient.sendRefundConfirmationEmail(request);
  }
}
