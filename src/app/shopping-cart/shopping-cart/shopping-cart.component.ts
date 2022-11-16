import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';




@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: any[] = [];
  loading = true;

  displayedColumns: string[] = ['item', 'qty', 'cost'];
  user: any;

  constructor(public firebase: FirebaseService,) {}

  getTotalCost() {
    if (this.cart) {
      return this.cart
        .map((t) => (t.customItem) ? t.unitPrice * t.quantity * t.priceMultiplier  : t.unitPrice * t.quantity * t.priceMultiplier * this.user.price_multi )
        .reduce((acc, value) => acc + value, 0);
    }
  }



  ngOnInit(): void {
    this.firebase.getCart().subscribe((value) => {
      this.cart = value;
      this.loading = false;
    });
    this.firebase.getUser().subscribe((value) => {
      this.user = value;
    });
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SliderConfigurableExample, {
  //     width: '250px',
  //     data: {
  //       pricemult: this.PriceMultiplier, 
  //       itemKey: this.Key},
  //   });
}




 
// @Component({
//   selector: 'price-multiplier',
//   templateUrl: './price-multiplier.html',
//   styleUrls: ['./slider-configurable-example.scss'],
// })
// export class PriceMultiplier {}





// @Component({
//   selector: 'slider-configurable-example',
//   templateUrl: './slider-configurable-example.html',
//   styleUrls: ['./slider-configurable-example.scss'],
// })
// export class SliderConfigurableExample {
//   autoTicks = false;
//   disabled = false;
//   invert = false;
//   max = 100;
//   min = 0;
//   showTicks = false;
//   step = 1;
//   thumbLabel = false;
//   value = 1;
//   vertical = false;
//   tickInterval = .1;

//   constructor(
//     public dialogRef: MatDialogRef<SliderConfigurableExample>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) {}

//   getSliderTickInterval(): number | 'auto' {
//     if (this.showTicks) {
//       return this.autoTicks ? 'auto' : this.tickInterval;
//     }

//     return 0;
//   }

  
  // pricemulti() {
  //   this.firebase.updateCartItem(this.itemKey, {
  //     priceMultiplier: 5,
  //   });
  // }

// }