import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Payment []> {
    return this.http.get<Payment[]>(`${this.baseUrl}/getAll`);
  }


  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/add`, payment);
  }

  delete(reference: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${reference}`);
  }

    getByReference(reference: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/get/${reference}`);
  }
    updateReference(reference: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/update/${reference}`, payment);
  }



}
