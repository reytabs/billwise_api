import { User } from 'src/auth/schemas/user.schema';

export class UpdateGoalDto {
  readonly name: string;
  readonly target_amount: string;
  readonly current_amount: string;
  readonly category: string;
  readonly target_date: Date;

  readonly user: User;
}
