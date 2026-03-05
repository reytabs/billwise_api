export class CreateBudgetDto {
  readonly category: string;
  readonly budget_amount: number;
  readonly month?: number;
  readonly year?: number;
  readonly account_id?: string;
  readonly user_id?: string;
  readonly goal_id?: string;
}
