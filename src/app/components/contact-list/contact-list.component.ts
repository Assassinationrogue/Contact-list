import { Subscription } from 'rxjs';
import { AddFormComponent } from '../add-form/add-form.component';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/user';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [DialogService],
})
export class ContactListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private _contacts_list: User[];
  get contacts_list(): User[] {
    return this._contacts_list;
  }
  @Input() set contacts_list(value: User[]) {
    if (value) {
      this._contacts_list = value;
    }
  }


  @Output() editCurrentContact: any = new EventEmitter<User>();

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  /**
   * Adds contact
   * @param name accepts in string format
   * @returns void
   */
  addContact(): void {
    this.subscription.add(
      this.dialogService
        .open(AddFormComponent, {
          header: 'Add contact',
          width: '40%',
        })
        .onClose.subscribe((data) => {
          this.editCurrentContact.emit(data);
        })
    );
  }

  /**
   * Delete current contact
   * @param name accepts in string format
   * @returns void
   */
  deleteContact(id: any): void {
    this._contacts_list.splice(id, 1);
  }

  /**
   * Sorts names alphabatically
   * @param sortedName is default array no need to pass any array additionally
   * @returns an array
   */
  private sortByName(sortedName: string[] = []): string[] {
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
        sortedName.push(data['name']);
      });
    return sortedName.sort();
  }

  /**
   * Sorts contacts list based on sorted names
   * @param sortedName accepts a sorted name array
   * @param contact_list default and optional value not required to be passed
   * @returns User[]
   */
  private sortContactList(
    sortedName: string[],
    contact_list: User[] = []
  ): User[] {
    sortedName.forEach((name) => {
      this._contacts_list.forEach((data) => {
        if (
          data.first_name === name.split(' ')[0] &&
          data.last_name === name.split(' ')[name.split(' ').length - 1]
        ) {
          contact_list.push(data);
        }
      });
    });

    return contact_list;
  }

  /**
   * Sorts the contact list alphabatically
   * @returns void
   */
  sortByAZ(): void {
    this._contacts_list = this.sortContactList(this.sortByName());
  }

  /**
   * Sorts the contact list reversed alphabatically
   * @returns void
   */
  sortByZA(): void {
    this._contacts_list = this.sortContactList(this.sortByName().reverse());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
