import { User, Fields } from './../model/user';
import { CrudService } from './../services/crud.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  getContacts: User;
  newContact: User;

  constructor(private crudServices: CrudService) {}

  ngOnInit(): void {
    this.crudServices
      .getAllContact()
      .subscribe((data) => (this.getContacts = data));
  }

  postContact(data:User){
    this.crudServices.postContact(data).subscribe(data=>{
      console.log(data)
    });
  }

  /**
   *
   * @param name
   */
  deleteCurrentContact(id: string): void {
    this.crudServices.deleteContact(id);
  }
}
