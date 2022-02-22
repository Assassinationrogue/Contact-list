import { AddFormComponent } from '../add-form/add-form.component';
import { ConfirmationService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/user';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [DialogService, ConfirmationService],
})
export class ContactListComponent implements OnInit {
  private _contacts_list: User[];
  get contacts_list(): User[] {
    return this._contacts_list;
  }
  @Input() set contacts_list(value: User[]) {
    if (value) {
      this._contacts_list = value;
    }
  }

  deleteCard: boolean = false;

  @Output() editCurrentContact: any = new EventEmitter<User>();
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
        header: 'Add contact',
        width: '50%',
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
    this._contacts_list.splice(id, 1);
    this.deleteCard = true;
  }

  sortByAZ() {
    let dummy: User[] = [];
    const sortedDummy: any[] = [];
    this._contacts_list
      .map((data) => {
        return {
          id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          avatar: data.avatar,
          email: data.email,
        };
      })
      .forEach((data) => {
        sortedDummy.push(data['name']);
      });

    sortedDummy.sort();
    sortedDummy.forEach((name) => {
      this._contacts_list.forEach((data) => {
        if (
          data.first_name === name.split(' ')[0] &&
          data.last_name === name.split(' ')[name.split(' ').length - 1]
        ) {
          dummy.push(data);
        }
      });
    });

    this._contacts_list = dummy;
  }

  sortByZA() {
    let dummy: User[] = [];
    const sortedDummy: any[] = [];
    this._contacts_list
      .map((data) => {
        return {
          id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          avatar: data.avatar,
          email: data.email,
        };
      })
      .forEach((data) => {
        sortedDummy.push(data['name']);
      });

    sortedDummy.sort().reverse();
    sortedDummy.forEach((name) => {
      this._contacts_list.forEach((data) => {
        if (
          data.first_name === name.split(' ')[0] &&
          data.last_name === name.split(' ')[name.split(' ').length - 1]
        ) {
          dummy.push(data);
        }
      });
    });

    this._contacts_list = dummy;
  }
}
