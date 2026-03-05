import { User } from 'src/auth/schemas/user.schema';

export class CreateGoalDto {
  readonly name: string;
  readonly target_amount: string;
  readonly current_amount: string;
  readonly category: string;
  readonly target_date: Date;

  // optionally associate with a user
  readonly user: User;
}
