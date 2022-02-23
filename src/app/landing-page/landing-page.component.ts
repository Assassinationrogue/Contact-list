import { User, Fields } from './../model/user';
import { CrudService } from './../services/crud.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  getContacts: User[];
  newContact: User;
  private subscription: Subscription = new Subscription();

  constructor(private crudServices: CrudService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.crudServices
        .getAllContact()
        .subscribe((data) => (this.getContacts = data))
    );
  }

  postContact(data: User) {
    this.subscription.add(
      this.crudServices.postContact(data).subscribe((data) => {
        console.log(data);
      })
    );
  }

  ngOnDestroy(): void {
    // to avoid memory leak
    this.subscription.unsubscribe();
  }
}
