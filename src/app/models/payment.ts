export interface Payment {

    id?: number;
    reference: string;
    amount: number;
    currency: string;
    createdAt?: string;
    clientRequestId: string;
}