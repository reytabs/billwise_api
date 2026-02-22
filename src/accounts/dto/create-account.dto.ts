import { User } from 'src/auth/schemas/user.schema';

export class CreateAccountDto {
  readonly account_name: string;
  readonly bank_name: string;
  readonly account_type: string;
  readonly current_balance: string;
  readonly last_4_digits?: string;

  readonly user: User;
}
