import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {
  cart: any[];
  free = false;
  loading = true;
  comment = "";
  address = "";
  user: any;

  constructor(private firebase: FirebaseService) {}

  placeOrder() {
    this.firebase.addOrder(this.cart, this.comment, this.address );
    // console.log(this.comment+"asd")
    this.firebase.clearCart();
  }
  locationpicked(data) {
    this.free= data;
  }

  parentFunction(data) {
    console.warn(data)
    this.comment = data 
  }

  selectedAddress(data) {
    console.warn(data)
    this.address = data 
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
}

