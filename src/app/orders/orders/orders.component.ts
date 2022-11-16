import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any[];
  loading = true;
  user: any;

  
  constructor(private firebase: FirebaseService) {}

  itemsCount(order) {
    
    return order.items.items
      .map((t) => t.quantity)
      .reduce((acc, curr) => acc + curr, 0);
      
  }

  totalPrice(order) {
    return order.items.items
      .map((t) =>  (t.customItem) ? t.unitPrice * t.quantity * t.priceMultiplier  : t.unitPrice * t.quantity * t.priceMultiplier * this.user.price_multi)
      .reduce((acc, curr) => acc + curr, 0);
  }

  // private orderByDateDesc(orders: any[]) {
  //   return orders.sort((o1, o2) => Date.parse(o1.key) - Date.parse(o2.key));
  // }

  ngOnInit(): void {
    this.firebase.getOrders().subscribe((value) => {
      this.orders = value.reverse();
      this.loading = false;
      console.log(this.orders)
    });
    this.firebase.getUser().subscribe((value) => {
      this.user = value;
    });
  }
}
