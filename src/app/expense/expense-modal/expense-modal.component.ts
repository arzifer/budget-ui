import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { filter, from } from 'rxjs';
import { CategoryModalComponent } from '../../category/category-modal/category-modal.component';
import { ActionSheetService } from '../../shared/service/action-sheet.service';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, SortOption} from "../../shared/domain";

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
})
export class ExpenseModalComponent {
  readonly sortOptions: SortOption[] = [
    { label: 'Created at (newest first)', value: 'createdAt,desc' },
    { label: 'Created at (oldest first)', value: 'createdAt,asc' },
    { label: 'Name (A-Z)', value: 'name,asc' },
    { label: 'Name (Z-A)', value: 'name,desc' },
  ];
  // readonly categoryForm: FormGroup;
  // submitting = false;
  // category: Category = {} as Category;
  constructor(
    private modalController: ModalController,
    private readonly actionSheetService: ActionSheetService,
    private readonly modalCtrl: ModalController,
    // private readonly formBuilder: FormBuilder,
  ) {
    // this.categoryForm = this.formBuilder.group({
    // id: [], // hidden
    // name: ['', [Validators.required, Validators.maxLength(40)]],
  }


  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save(): void {
    this.modalCtrl.dismiss(null, 'save');
  }

  delete(): void {
    from(this.actionSheetService.showDeletionConfirmation('Are you sure you want to delete this expense?'))
      .pipe(filter((action) => action === 'delete'))
      .subscribe(() => this.modalCtrl.dismiss(null, 'delete'));
  }

  categories: any;

  async showCategoryModal(): Promise<void> {
    const categoryModal = await this.modalCtrl.create({component: CategoryModalComponent});
    categoryModal.present();
    const {role} = await categoryModal.onWillDismiss();
    console.log('role', role);
  }

  async openCategoryModal() {
    const categoryModal = await this.modalController.create({
      component: CategoryModalComponent,
      // You can pass data to the category modal if needed
    });
    await categoryModal.present();
  }
}
