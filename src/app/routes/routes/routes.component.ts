import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})


export class RoutesComponent implements OnInit {
  routeLocations: any [];

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.firebase.getTodaysRoute().subscribe((value: any) => {
      
      this.routeLocations= value.sort((a, b)=>  a.id - b.id );
    });
  }




}
   // this.firebase.getTodaysRoute().then(
    //   (event) => event.subscribe((value) => (this.routeLocations = value))

    //   // console.log(this.routeLocations)
    // );