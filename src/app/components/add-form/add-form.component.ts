import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Fields } from 'src/app/model/user';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  constructor(private ref: DynamicDialogRef) {}

  REQUIRED_MESSAGE: string = 'Field is required!';
  INVALID_EMAIL: string = 'Please enter a valid email address.';

  fg: FormGroup;

  fieldSettings: Fields = {
    first_name: {
      readonly: false,
      required: true,
    },
    last_name: {
      readonly: false,
      required: true,
    },
    email: {
      readonly: false,
      required: true,
    },
    avatar: {
      readonly: false,
      required: true,
    },
  };

  ngOnInit(): void {
    this.fg = this.createForm();
  }

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
          field === 'email' ? Validators.email : Validators.nullValidator,
        ],
      ];
    });

    return new FormBuilder().group(control);
  }

  onSubmit() {
    this.ref.close(this.fg.getRawValue());
  }
}
