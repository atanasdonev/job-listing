import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ad } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit {
  adForm!: FormGroup;
  actionBtn: string = 'Post';
  ad!: Ad;

  constructor(
    private formBuilder: FormBuilder,
    private adsService: AdsService,
    private dialogRef: MatDialogRef<AdFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (!this.editData) {
      if (this.adForm.valid) {
        const ad: Ad = this.adForm.value;
        ad.likes = 0;
        this.adsService.postAd$(ad).subscribe({
          next: (res) => {
            this.adForm.reset();
            this.dialogRef.close('save');
            location.reload();
          },
          error: () => {
            alert('Error while posting ad');
          }
        });
      }
    } else {
      this.updateAd();
    }
  }

  updateAd() {
    this.adsService.putAd$(this.adForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.adForm.reset();
        this.dialogRef.close('update');
        location.reload();
      },
      error: (err) => {
        alert('Error while updating ad');
      }
    });
  }

  private initForm(): void {
    this.adForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required]
    });

    if (this.editData) {
      this.adForm.controls['title'].setValue(this.editData.title);
      this.adForm.controls['category'].setValue(this.editData.category);
      this.adForm.controls['type'].setValue(this.editData.type);
      this.adForm.controls['description'].setValue(this.editData.description);
      this.actionBtn = 'Update';
    }
  }
}
