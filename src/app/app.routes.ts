import { Routes } from '@angular/router';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'payments', pathMatch: 'full'},
    {path: 'payments', component: PaymentListComponent},
    {path: 'add', component: PaymentFormComponent},
    {path: 'edit/:reference', component: PaymentFormComponent} 
];
