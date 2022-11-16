import { Component, Input, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FirebaseService } from 'src/app/core/firebase.service';

export interface DialogData2 {
  primeMulti: string;
  itemKey: number;
  itemQty: number;
  itemPrice: number;
  data: any;
  userPriceMulti: number;
  customItem: boolean;
}

@Component({
  selector: 'price-multiplier',
  templateUrl: './price-multiplier.component.html',
  styleUrls: ['./price-multiplier.component.scss'],
})
export class PriceMultiplierComponent {
  @Input() data: any;
  @Input() user;

  constructor(public dialog: MatDialog) {
 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSlider, {
      width: '350px',
      data: {
        itemKey: this.data.key,
        primeMulti: this.data.priceMultiplier,
        itemQty: this.data.quantity,
        itemPrice: this.data.unitPrice,
        userPriceMulti: this.user.price_multi,
        customItem: this.data.customItem
      },
    });
  }
}

@Component({
  selector: 'DialogSlider',
  templateUrl: './slider-configurable-example.html',
  styleUrls: ['./price-multiplier.component.scss'],
})
export class DialogSlider {
  constructor(
    public firebase: FirebaseService,
    public dialogRef: MatDialogRef<DialogSlider>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  pricemulti() {
    this.firebase.updateCartItem(this.data.itemKey, {
      priceMultiplier: this.value,
    });
  }

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = Number(this.data.primeMulti);
  vertical = false;
  tickInterval = 0.1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
