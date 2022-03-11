import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdsService } from 'src/app/services/ads.service';
import { DataService } from 'src/app/services/data.service';
import { AdFormComponent } from '../ad-form/ad-form.component';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss']
})
export class AdItemComponent implements OnInit {
  @Input() ad!: any;
  loggedUser!: any;
  constructor(
    private dialog: MatDialog,
    private adsService: AdsService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  editAd(ad: any) {
    this.dialog.open(AdFormComponent, { width: '30%', data: ad });
  }

  deleteAd(id: any) {
    this.adsService.deleteAd$(id).subscribe({
      next: (res) => {
        location.reload();
      },
      error: (err) => {
        alert('Error while deleting ad');
      }
    });
  }

  likeAd(id: any) {
    this.adsService.getAd$(id).subscribe({
      next: (res) => {
        const currentAd = res;
        if (currentAd.likes === 0) {
          currentAd.likes = 1;
        } else {
          currentAd.likes++;
        }
        this.adsService.putAd$(currentAd, id).subscribe({
          next: (res) => {
            location.reload();
          }
        });
      },
      error: (err) => {
        alert('Error while liking ad');
      }
    });
  }

  getData() {
    this.dataService.data.subscribe((response) => {
      this.loggedUser = response;
    });
  }
}
