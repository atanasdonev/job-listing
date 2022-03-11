import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  sendNewData(data: any) {
    this.dataService.sendData(data);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.registerService.getUsers$().subscribe({
        next: (res) => {
          this.loggedUser = res.find((a: any) => {
            return (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password
            );
          });
          if (this.loggedUser) {
            this.loginForm.reset();
            this.router.navigate(['ads']);
            this.dataService.sendData(this.loggedUser);
          } else {
            alert('User not found');
          }
        },
        error: (err) => {
          alert('Errow while logging in');
        }
      });
    }
  }
}
