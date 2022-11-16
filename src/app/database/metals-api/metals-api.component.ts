import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';


@Component({
  selector: 'metals-api',
  templateUrl: './metals-api.component.html',
  styleUrls: ['./metals-api.component.css']
})
export class MetalsApiComponent {
  constructor(private http: HttpClient,
    private firebase: FirebaseService) {}

    //not required? remove this.metals as well?
    metals: any[];
    base_currency = 'GBP'
    // symbol = 'XAU' 
    // +'&symbols='+this.symbol
    endpoint = 'latest'
    access_key = 'o5tlqh1113zig153od19gvfb4qxm51i3czc2gvou5bi2gmj8a94eksy37dds'
    
    loadMetals(){
      this.http
      .get('https://metals-api.com/api/'+this.endpoint+'?access_key='+this.access_key+'&base='+this.base_currency)
      .subscribe((metals: any[])=>{
        this.metals = metals;
        this.firebase.addMetals(this.metals);
      });
      }





      

    }
    
  //still need to set this to run every day at 
  

  


