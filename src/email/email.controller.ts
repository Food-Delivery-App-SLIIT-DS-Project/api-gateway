import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';
import { lastValueFrom } from 'rxjs';
import { RejectionEmailDto } from './dto/rejection-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  
  @Post('confirm')
  async acceptOrder(@Body() email: EmailDto) {
    try {
      console.log('Accepting email with DTO:', email);
      const response = await lastValueFrom(this.emailService.sendRegConfirmEmail(email));
      return response;
    } catch (err) {
      console.error('Error sending email:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

    @Post('reject')
    async rejectOrder(@Body() rejectionDto: RejectionEmailDto) {
        try {
            console.log('Rejecting email with DTO:', rejectionDto);
            const response = await lastValueFrom(this.emailService.sendRegRejectEmail(rejectionDto));
            return response;
        } catch (err) {
            console.error('Error sending email:', err);
            throw new HttpException(
                {
                    code: '500',
                    message: 'Internal server error',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

  @Post('driver-confirm')
  async driverConfirm(@Body() email: EmailDto) {
    try {
      console.log('Driver confirming email with DTO:', email);
      const response = await lastValueFrom(this.emailService.sendDriverConfirmEmail(email));
      return response;
    } catch (err) {
      console.error('Error sending email:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('driver-reject')
  async driverReject(@Body() rejectionDto: RejectionEmailDto) {
    try {
      console.log('Driver rejecting email with DTO:', rejectionDto);
      const response = await lastValueFrom(this.emailService.sendDriverRejectEmail(rejectionDto));
      return response;
    } catch (err) {
      console.error('Error sending email:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('refund-confirm')
  async refundConfirm(@Body() rejectionDto: RejectionEmailDto) {
    try {
      console.log('Refund confirming email with DTO:', rejectionDto);
      const response = await lastValueFrom(this.emailService.sendRefundEmail(rejectionDto));
      return response;
    } catch (err) {
      console.error('Error sending email:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
  