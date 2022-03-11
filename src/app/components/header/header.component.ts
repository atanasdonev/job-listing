import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';
import { AdFormComponent } from '../ad-form/ad-form.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user!: any;
  loggedUser!: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.data.subscribe((response) => {
      this.loggedUser = response;
    });
  }

  openAdDialog() {
    this.dialog.open(AdFormComponent, {
      width: '30%'
    });
  }

  openRegisterForm() {
    this.router.navigate(['register']);
  }

  openLoginForm() {
    this.router.navigate(['login']);
  }

  deleteAccount(id: number) {
    this.registerService.deleteUser$(id).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert('Error while deleting account');
      }
    });
  }

  editAccount(user: any) {
    this.dialog.open(RegisterComponent, {
      data: user
    });
  }
}
