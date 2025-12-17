import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent implements OnInit{


  payments: Payment[] = [];

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getAll().subscribe(data => {
      this.payments = data;
    });
  }

  delete(reference: string) {
    const confirmed = confirm(`Are you sure you want to delete payment "${reference}"?`);

    if (!confirmed){
      return;
    }

    this.paymentService.delete(reference).subscribe(() => {
      this.loadPayments();
    });
  }

  edit(reference: string) {
    this.router.navigate(['/edit', reference]);
  }

  add() {
    this.router.navigate(['/add'])
  }


}
