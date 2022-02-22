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
  currentIndex: number | null = null;
  editingEnabled: boolean = false;
  openDialogBox: boolean = false;

  updatedData = {
    name: '',
    number: 0,
  };

  constructor(
    public dialogService: DialogService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  /**
   * Edit's current contact
   * @param name accepts in string format
   * @returns void
   */
  addContact(): void {
    this.editingEnabled = !this.editingEnabled;
    const ref = this.dialogService
      .open(AddFormComponent, {
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
  deleteContact(name: string): void {
    this.deleteCurrentContact.emit(name);
  }

  confirm(event: Event) {
    this.confirmService.confirm({
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
      },
      reject: () => {
        //reject action
      },
    });
  }
}
