import {ModalController} from "@ionic/angular";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-expense-datepicker-modal',
    templateUrl: './expense-datepicker-modal.component.html',
})
export class ExpenseDatePickerModalComponent implements OnInit {

    selectedDate: string = '';

    constructor(private modalController: ModalController) { }

    ngOnInit() {
        // Set up your date picker or any other date-related logic here
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
