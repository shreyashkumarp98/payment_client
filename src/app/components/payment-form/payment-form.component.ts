import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent {

  payment: Payment = {
    reference: '',
    amount: 0,
    currency: '',
    clientRequestId: ''
  };

   isEditMode = false;

  currencies: string[] = ['USD', 'INR', 'GBP', 'EUR'];

  constructor(private paymentService: PaymentService, private router:Router, private route:ActivatedRoute){}

  ngOnInit() {

    const reference = this.route.snapshot.paramMap.get('reference');

    if (reference) {
      this.isEditMode =true;

      this.paymentService.getByReference(reference).subscribe(data => {
        this.payment = data;
      });
    }
    else{
      this.payment.clientRequestId = uuidv4();
    }


  }


  submit() {
    if (this.isEditMode){ 
        this.paymentService.updateReference(this.payment.reference, this.payment).subscribe({
          next: () => this.router.navigate(['/payments']),
          error: (err) => {
            alert(err.error.message || 'Invalid Payment Data');
          }
        });
    }
    else {
      this.paymentService.create(this.payment).subscribe({
        next: () => this.router.navigate(['/payments']),
        error: (err) =>{
            alert(err.error.message || 'Invalid Payment Data');
        }
      });
    }
  }

}
