import { User, Fields } from './../model/user';
import { CrudService } from './../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  getContacts: User;

  constructor(private crudServices: CrudService) {}

  ngOnInit(): void {
    this.crudServices
      .getAllContact()
      .subscribe((data) => (this.getContacts = data));
  }

  /**
   *
   * @param name
   */
  deleteCurrentContact(id: string): void {
    this.crudServices.deleteContact(id);
  }
}
