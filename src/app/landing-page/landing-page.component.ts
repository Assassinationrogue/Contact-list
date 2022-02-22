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
  fg: FormGroup;
  fieldSettings: Fields = {
    name: {
      readonly: false,
      required: true,
      max: 50,
      min: 2,
    },
    phoneNumber: {
      readonly: false,
      required: true,
      max: 0, // ITU imposed
      min: 4, // if Saint Helena
    },
  };

  constructor(private crudServices: CrudService) {}

  ngOnInit(): void {
    this.fg = this.createForm();
    this.crudServices.getAllContact().subscribe(data=> this.getContacts = data)
  }

  /**
   * Generates form with null value and validators
   * @param none
   * @returns FormGroup
   */
  private createForm(): FormGroup {
    const control = {};
    Object.keys(this.fieldSettings).forEach((field) => {
      control[field] = [
        {
          value: '',
          disabled: this.fieldSettings[field]?.readonly,
        },
        [
          this.fieldSettings[field]?.required
            ? Validators.required
            : Validators.nullValidator,
          this.fieldSettings[field]?.max
            ? Validators.max(this.fieldSettings[field]?.max)
            : Validators.nullValidator,
          this.fieldSettings[field]?.min
            ? Validators.min(this.fieldSettings[field]?.min)
            : Validators.nullValidator,
        ],
      ];
    });

    return new FormBuilder().group(control);
  }

  /**
   * Calls the function on submitting the form
   * @param none
   * @returns void
   */
  onSubmit(): void {
    this.crudServices.postContact(
      this.fg.getRawValue()['name'],
      this.fg.getRawValue()['phoneNumber']
    );
    this.fg.reset();
    
  }


  /**
   * 
   * @param name 
   */
  deleteCurrentContact(id: string): void{
    this.crudServices.deleteContact(id);
  }
}
