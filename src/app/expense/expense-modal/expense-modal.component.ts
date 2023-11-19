import {Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { filter, from } from 'rxjs';
import { CategoryModalComponent } from '../../category/category-modal/category-modal.component';
import { ActionSheetService } from '../../shared/service/action-sheet.service';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, ExpenseUpsertDto, SortOption} from "../../shared/domain";
import {ExpenseService} from "../expense.service";
import {ToastService} from "../../shared/service/toast.service";
import {CategoryService} from "../../category/category.service";
import {formatISO, parseISO} from "date-fns";
import {ExpenseDatePickerModalComponent} from "../expense-datepicker/expense-datepicker-modal.component";

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
})
export class ExpenseModalComponent {

  readonly expenseForm: FormGroup;
  submitting = false;
  expense: ExpenseUpsertDto = {amount: 0, categoryId: '', date: '', name: ''}
  categories: Category[] = [];
  openDatePicker() {
    this.modalController.create({
      component: ExpenseDatePickerModalComponent,
      componentProps: {
        selectedDate: this.expense.date,
      },
      cssClass: 'expense-date-picker-modal',
    }).then(modal => {
      modal.present();
    });
  }
    updateExpenseDate(newDate: string | string[] | undefined) {
        console.log('New Date:', newDate);
        if (newDate !== undefined) {
            const dateString = Array.isArray(newDate) ? newDate[0] : newDate;

            this.expenseForm.patchValue({
                date: dateString,
            });
        }
    }


  constructor(
    private modalController: ModalController,
    private readonly actionSheetService: ActionSheetService,
    private readonly modalCtrl: ModalController,
    private readonly formBuilder: FormBuilder,
    private readonly expenseService: ExpenseService,
    private readonly toastService: ToastService,
    private readonly categoryService: CategoryService
  ) {
    this.expenseForm = this.formBuilder.group({
      id: [this.expense.id], // hidden
      amount: [this.expense.amount, [Validators.required]],
      categoryId: [this.expense.categoryId, [Validators.required]],
      date: [formatISO(new Date()), [Validators.required]],
      name: [this.expense.name, [Validators.required, Validators.maxLength(40)]],
    });
  }

  private loadAllCategories(): void {
    this.categoryService.getAllCategories({ sort: 'name,asc' }).subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => this.toastService.displayErrorToast('Could not load categories', error),
    });
  }
  ionViewWillEnter(): void {
    this.loadAllCategories();
  }

  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save(): void {
      console.log('Form Value:', this.expenseForm.value);

      if (this.expenseForm.invalid) {
          console.log('Form is invalid. Cannot submit.');
          return;
      }
       this.modalCtrl.dismiss(null, 'save');
    this.expenseService
        .upsertExpense({
          ...this.expenseForm.value,
          date: formatISO(parseISO(this.expenseForm.value.date), { representation: 'date' }),
        })
      .subscribe(
      );
  }

  delete(): void {
    from(this.actionSheetService.showDeletionConfirmation('Are you sure you want to delete this expense?'))
      .pipe(filter((action) => action === 'delete'))
      .subscribe(() => this.modalCtrl.dismiss(null, 'delete'));
  }

  async showCategoryModal(): Promise<void> {
    const categoryModal = await this.modalCtrl.create({component: CategoryModalComponent});
    categoryModal.present();
    const {role} = await categoryModal.onWillDismiss();
    console.log('role', role);
  }

  async openCategoryModal() {
    const categoryModal = await this.modalController.create({
      component: CategoryModalComponent,
    });
    await categoryModal.present();
  }
}
