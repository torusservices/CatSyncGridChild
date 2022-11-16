import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FirebaseService } from 'src/app/core/firebase.service';
/**
 * @title Dialog elements
 */
 @Component({
  selector: 'app-custom-item',
  templateUrl: './custom-item.component.html',

})
export class CustomItemComponent{

constructor(public dialog: MatDialog) {}

openDialog(): void {
  this.dialog.open(DialogOverviewExampleDialog, {
    width: '250px',
   
  });
}

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./custom-item.component.scss'],
})
export class DialogOverviewExampleDialog {

  @Input() data: any;


  itemname=""
  itemprice=""



  constructor(private firebase: FirebaseService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,) {}


  addcustom() {
    this.firebase.AddCartCustomItem(this.itemname,this.itemprice);
  }

  onNoClick(): void {
    this.dialogRef.close();
  
  }

}



