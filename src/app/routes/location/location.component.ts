import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable } from 'rxjs';
import { FirebaseService } from 'src/app/core/firebase.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
  static inputComment: any;
  inputComment ="";
  locationid: any;
  location:any;
  comments: any;


  constructor(private route: ActivatedRoute,
    private firebase: FirebaseService) {}




  pushComment() {
    this.firebase.addComment(this.locationid,this.inputComment);
    this.inputComment=""
  }

  ngOnInit(): void {

    this.locationid = this.route.snapshot.queryParamMap.get('postcode');
    this.firebase.getLocation(this.locationid).subscribe((value) => {
      this.location = value;
      // this.comments = value.comments;
    });
    this.firebase.getComments(this.locationid).subscribe((value) => {
      this.comments = value.reverse();
      console.log(this.comments)
    });

  }

}
  
 


