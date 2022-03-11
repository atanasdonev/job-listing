import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  ads!: Ad[];

  constructor(private adsService: AdsService) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.adsService.getAds$().subscribe({
      next: (response: Ad[]) => {
        this.ads = response;
      },
      error: (error) => {
        alert('Error');
      }
    });
  }
}
