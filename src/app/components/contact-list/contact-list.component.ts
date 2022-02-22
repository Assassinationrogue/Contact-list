import { AddFormComponent } from '../add-form/add-form.component';
import { ConfirmationService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [DialogService, ConfirmationService],
})
export class ContactListComponent implements OnInit {
  @Input() getContacts: any;
  @Output() editCurrentContact: any = new EventEmitter<any>();
  @Output() deleteCurrentContact: any = new EventEmitter<string>();
  constructor(
    public dialogService: DialogService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  /**
   * Adds contact
   * @param name accepts in string format
   * @returns void
   */
  addContact(): void {
    const ref = this.dialogService
      .open(AddFormComponent, {
        header: "Add contact",
        width: "50%"
      })
      .onClose.subscribe((data) => {
        this.editCurrentContact.emit(data);
      });
  }

  /**
   * Delete current contact
   * @param name accepts in string format
   * @returns void
   */
  deleteContact(id: any): void {
    this.deleteCurrentContact.emit(id);
  }

 
}
