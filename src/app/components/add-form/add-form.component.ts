import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Fields } from 'src/app/model/user';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  constructor(
    private ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig
  ) {}

  fg: FormGroup;

  fieldSettings: Fields = {
    first_name: {
      readonly: false,
      required: true,
      max: 50,
      min: 2,
    },
    last_name: {
      readonly: false,
      required: true,
      max: 50,
      min: 2,
    },
    email: {
      readonly: false,
      required: true,
      max: 50,
      min: 2,
    },
    avatar: {
      readonly: false,
      required: true,
      max: 0, // ITU imposed
      min: 4, // if Saint Helena
    },
  };

  ngOnInit(): void {
    this.fg = this.createForm();
   console.log(this.fg)
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

  onSubmit() {
    this.ref.close({
      name: this.fg.getRawValue().name,
      number: this.fg.getRawValue().phoneNumber,
      id: this.dialogConfig.data.id,
    });
  }
}
