import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnInit {
  constructor(private firebase: FirebaseService) {}
  @Input() free = false;
  @Output() locationpicked: EventEmitter<any>= new EventEmitter()
  @Output() selectedAddress: EventEmitter<any>= new EventEmitter()
  locations: any[];
  OrderAddress= "";

  selected() {
    this.locationpicked.emit(true)
}

emitAddress() {
  this.selectedAddress.emit(this.OrderAddress)

}


ngOnInit(): void {
  this.firebase.getTodaysRoute().subscribe((value: any) => {
    this.locations = value.sort((a, b)=>  a.id - b.id );

    console.log(this.locations)
  });
}

// this.firebase.getTodaysRoute().then(
//   (event) => event.subscribe((value) => (this.routeLocations = value))

//   // console.log(this.routeLocations)
// );
}
