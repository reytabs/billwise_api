// import { Category } from '../../book/schemas/book.schema';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateBillDto {
  readonly name: string;
  readonly amount: string;
  readonly due_date: Date;
  readonly category: string;
  readonly status: string;
  readonly is_recurring: Boolean;
  readonly frequency: string;
  readonly notes: string;
  readonly user: User;
  // readonly category: Category;
}
