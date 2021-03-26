export interface Transfer {
  recipientAccountNumber: number;
  senderAccountNumber: number;
  description: string;
  originalCurrency: string;
  amount: number;
  date: string;
}
