import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  typeList = ['Company', 'Individual User'];
  actionBtn: string = 'Register';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router // @Inject(MAT_DIALOG_DATA) public editData: any,
  ) // private dialogRef: MatDialogRef<RegisterComponent>
  {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      type: ['', Validators.required]
    });

    // if (this.editData) {
    //   this.registerForm.controls['email'].setValue(this.editData.email);
    //   this.registerForm.controls['password'].setValue(this.editData.password);
    //   this.registerForm.controls['type'].setValue(this.editData.type);
    //   this.registerForm.controls['name'].setValue(this.editData.name);
    //   this.actionBtn = 'Update';
    // }
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.type === 'Individual User') {
        this.registerService.postUser$(this.registerForm.value).subscribe({
          next: (res) => {
            this.registerForm.reset();
            // this.dialogRef.close('register');
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert('Error while registereing');
          }
        });
      } else {
        this.registerService.postUser$(this.registerForm.value).subscribe({
          next: (res) => {
            this.registerForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert('Error while registereing');
          }
        });
      }
    }
    // if (!this.editData) {

    // } else {
    //   this.updateUser();
    // }
  }

  // updateUser() {
  //   this.registerService
  //     .putUser$(this.registerForm.value, this.editData.id)
  //     .subscribe({
  //       next: (res) => {
  //         this.registerForm.reset();
  //         this.dialogRef.close('update');
  //         location.reload();
  //       },
  //       error: (err) => {
  //         alert('Error while updating user');
  //       }
  //     });
  // }
}
