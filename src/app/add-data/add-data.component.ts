import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from '../models/person';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  addPersonForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddDataComponent>,
     private fb: FormBuilder ) {


      this.addPersonForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        dob: [''],
        email: ['', [Validators.required]],
        salary: [''],
        address:[''],
        imageurl:[''],
        contractnumber: ['']
        // Add more form controls as needed
      });
      }

      onSubmit() {
        // Check if the form is valid before closing the dialog
        if (this.addPersonForm.valid) {
          // You can return the form value or a modified object
          this.dialogRef.close(this.addPersonForm.value);
        }
      }
    
      onCancel() {
        // Close the dialog without submitting
        this.dialogRef.close();
      }

  ngOnInit(): void {
  }

}
