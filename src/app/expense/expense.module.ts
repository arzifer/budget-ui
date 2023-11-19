import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import {ExpenseDatePickerModalComponent} from "./expense-datepicker/expense-datepicker-modal.component";

@NgModule({
  declarations: [ExpenseModalComponent, ExpenseListComponent, ExpenseDatePickerModalComponent],
    imports: [CommonModule, IonicModule, ReactiveFormsModule, ExpenseRoutingModule, FormsModule],
})
export class ExpenseModule {}
