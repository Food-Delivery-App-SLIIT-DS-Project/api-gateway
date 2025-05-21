import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RejectionEmailDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;

    @IsString({ message: 'Reason must be a string' })
    @IsNotEmpty({ message: 'Reason cannot be empty' })
    reason: string;
}