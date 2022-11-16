import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FirebaseService } from 'src/app/core/firebase.service';


export interface DialogData {
  price_multi: number;
  price: number;
}

@Component({
  selector: 'check-price',
  templateUrl: './check-price.component.html',
})
export class CheckPriceComponent {



  @Input() price: number;
  user;
 


  constructor(
    public dialog: MatDialog,
    public firebase: FirebaseService,) {
       this.firebase.getUser().subscribe((value) => {
        this.user = value
       });
   
    }

 


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',
      data: {
        price: this.price, 
        price_multi: this.user.price_multi},
    });
    
  }
}




@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: './dialog-overview-example-dialog2.html',
  styleUrls: ['./check-price.component.scss'],
})
export class DialogOverviewExampleDialog2 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}