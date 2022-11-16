import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';
import { GridComponent, IEditCell } from '@syncfusion/ej2-angular-grids';
import { AngularFireDatabase } from '@angular/fire/compat/database/';
import { EditSettingsModel, ToolbarItems, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent  {

  @ViewChild('productGrid')
  public productGrid: GridComponent;
  @ViewChild('userGrid')
  public userGrid: GridComponent;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public filterOption: FilterSettingsModel = { type: 'Excel' };
  metals;


  public userParams: IEditCell;
  public user: object[] = [
    { uid: 'admin', countryId: '1' },
    { uid: 'user', countryId: '2' },
    { uid: 'database', countryId: '3' }
];
  constructor(firebase:  AngularFireDatabase,
    private firebasedb: FirebaseService) {

      // firebase.list('/metals').valueChanges().subscribe(metals => {
      //   console.log(metals)
      //   this.metals=metals
      //   console.log(this.metals)
      // });
      this.firebasedb.getMetals().subscribe((value) => (this.metals = value));

    firebase.list('/products').valueChanges().subscribe(products => {
      this.productGrid.dataSource = products;   //intial data binding to grid
      products.forEach((product: any) => {this.firebasedb.updatePrice(product, this.metals)})
    });

    firebase.list('/products').snapshotChanges().subscribe(products => {
      this.productGrid.dataSource = products; // sync server data changes to grid
      products.forEach((product: any) => {this.firebasedb.updatePrice(product, this.metals)})
    });


    firebase.list('/users').valueChanges().subscribe(users => {
      this.userGrid.dataSource = users;   //intial data binding to grid
    });

    firebase.list('/users').snapshotChanges().subscribe(users => {
      this.userGrid.dataSource = users; // sync server data changes to grid
    });


    // firebase.list('/metals').snapshotChanges().subscribe(metals => {
    //   console.log(metals)
    //   this.metals=metals
    //   console.log(this.metals)
    // });
  }

  public actionComplete(args: any): void {
    switch (args.requestType) {
      case "save":
          this.firebasedb.updateProduct(JSON.parse( JSON.stringify(args.data)));
        break;
      case "delete":
        args.data.forEach((row: any) => {
          this.firebasedb.removeProduct(row.key);
          console.log(row.key)
        })
        break;
    }

  
  }

  public actionCompleteUser(args: any): void {
    switch (args.requestType) {
      case "save":
          this.firebasedb.updateUserGrid(JSON.parse( JSON.stringify(args.data)));
        break;
      // case "delete":
      //   args.data.forEach((row: any) => {
      //     this.firebasedb.removeProduct(row.key);
      //     console.log(row.key)
      //   })
      //   break;
    }

  
  }

 
  ngOnInit(): void {

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Search'];
    this.userParams = {
      params: {
          allowFiltering: true,
          dataSource: new DataManager(this.user),
          fields: { text: 'uid', value: 'uid' },
          query: new Query(),
          actionComplete: () => false
      }
  };
}

}


