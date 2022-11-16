import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CommandModel,
  DataStateChangeEventArgs,
  DialogEditEventArgs,
  EditSettingsModel,
  GridComponent,
  IEditCell,
  RowSelectEventArgs,
  SearchSettingsModel,
  ToolbarItems,
  Column,
  DataSourceChangedEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { FirebaseService } from 'src/app/core/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database/';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { MaterialModule } from 'src/app/material/material.module';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { DropDownListModel } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('locationGrid') public locationGrid: GridComponent;

  @ViewChild('routelocationGrid') public routelocationGrid: GridComponent;
  public sortOptions: object;

  public state: DataStateChangeEventArgs;


  public key: string = '-NF6rTbhGu2eUd0J04t1';
  public data: any;
  public routeToolbar: ToolbarItems[];
  public editSettings: EditSettingsModel;
  public locToolbar: ToolbarItems[];
  public editSettingsRouteLoc: EditSettingsModel;
  public filterSettings: object;
  public searchOptions: SearchSettingsModel;
  public commands: CommandModel[];
  firebase;
  routename: any;
  selectedRow: Object | Object[];
  locationdata: any;
  path = [];
  // path2: google.maps.LatLngLiteral[] = [
  //   { lat: 13, lng: 13 },
  //   { lat: -13, lng: 0 },
  //   { lat: 13, lng: -13 },
  // ];
  // https://ej2.syncfusion.com/angular/documentation/grid/editing/edit-types/#provide-custom-data-source-and-enabling-filtering-to-dropdownlist

  // comments
  static inputComment: any;
  inputComment = '';
  locationid: any;
  location: any;
  comments: any;

  // public userParams: IEditCell;
  //RouteGrid
  @ViewChild('routeGrid') public routeGrid: GridComponent;
  // user dropdown
  public users: object[];
  public editparams: Object;
  locations;

  ngOnInit(): void {
    //RouteGrid user dropdown
    this.editparams = {
      params: {
        allowFiltering: true,
        // dataSource: new DataManager(this.users),
        fields: { text: 'email', value: 'email' },
        query: new Query(),
        actionComplete: () => false,
      },
    };

    this.firebasedb.getUsers().subscribe((value) => {
      this.users = value;
      (
        (this.routeGrid.columns[1] as Column).edit.params as DropDownListModel
      ).dataSource = new DataManager(this.users);
    });

    //Grid Settigns

    this.filterSettings = { type: 'Excel' };
    this.routeToolbar = ['Add', 'Edit', 'Delete', 'Search'];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
    this.locToolbar = ['Add', 'Edit', 'Delete', 'Search'];
    this.editSettingsRouteLoc = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
    this.searchOptions = {
      fields: ['CustomerID'],
      operator: 'contains',
      key: 'Ha',
      ignoreCase: true,
    };
    this.commands = [
      {
        type: 'Delete',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' },
      },
    ];
    this.sortOptions = {
      columns: [{ field: 'id', direction: 'Ascending' }],
    };


  }

  constructor(
    firebase: AngularFireDatabase,
    private firebasedb: FirebaseService
  ) {


    //fetch locations
    this.firebase = firebase;
    firebase
      .list('/locations')
      .valueChanges()
      .subscribe((locations) => {
        this.locations = locations;
        this.locationGrid.dataSource = locations; //intial data binding to grid
      });

    firebase
      .list('/locations')
      .snapshotChanges()
      .subscribe((locations) => {
        this.locations = locations;
        this.locationGrid.dataSource = locations; // sync server data changes to grid
      });

    //fetch routes
    firebase
      .list('/routes')
      .valueChanges()
      .subscribe((routes) => {
        this.routeGrid.dataSource = routes; //intial data binding to grid
      });

    firebase
      .list('/routes')
      .snapshotChanges()
      .subscribe((routes) => {
        this.routeGrid.dataSource = routes; // sync server data changes to grid
      });

    this.firebase
      .list(`/routes/${this.key}/locations`)
      .valueChanges()
      .subscribe((routelocs) => {
        this.routelocationGrid.dataSource = routelocs; //intial data binding to grid
      });
    this.firebase
      .list(`/routes/${this.key}/locations`)
      .snapshotChanges()
      .subscribe((routelocs) => {
        this.routelocationGrid.dataSource = routelocs; // sync server data changes to grid
      });

  }

  //LocationGrid
  public actionComplete(args: any): void {
    switch (args.requestType) {
      case 'save':
        if (args.data.postcode) {
          new google.maps.Geocoder().geocode(
            { address: args.data.address },
            (results, status) => {
              if (status == 'OK' && results !== null) {
                args.data.coords = {
                  lng: results[0].geometry.location.lng(),
                  lat: results[0].geometry.location.lat(),
                };
                this.firebasedb.updateLocation(
                  JSON.parse(JSON.stringify(args.data))
                );
              }
            }
          );
        }
        break;
      case 'delete':
        args.data.forEach((row: any) => {
          this.firebasedb.removeLocation(row.postcode);
        });
        break;

      case 'filtering':
        this.locations.forEach((location) => {
          location.options = {
            opacity: 0.3,
          };
        });
        const locationsCurrentView2: any = this.locationGrid.currentViewData;
        locationsCurrentView2.forEach((location) => {
          location.options = {
            opacity: 1,
          };
        });
        break;

      case 'searching':
        this.locations.forEach((location) => {
          location.options = {
            opacity: 0.3,
          };
        });
        const locationsCurrentView: any = this.locationGrid.currentViewData;
        locationsCurrentView.forEach((location) => {
          location.options = {
            opacity: 1,
          };
        });
        break;
    }
  }
  onLocRowSelected(args: any): void {
    // maps zoom
    this.map.panTo(args.data.coords);
    this.zoom = 10;
    this.map.zoom = 10;

    // Comments
    this.locationid = args.data.postcode;
    this.firebasedb.getComments(this.locationid).subscribe((value) => {
      this.comments = value.reverse();
    });
  }

  pushComment() {
    this.firebasedb.addComment(this.locationid, this.inputComment);
    this.inputComment = '';
  }
  //RouteGrid

  public actionCompleteRoute(args: any): void {
    switch (args.requestType) {
      case 'save':
        this.firebasedb.updateRoute(JSON.parse(JSON.stringify(args.data)));

        break;
      case 'delete':
        args.data.forEach((row: any) => {
          this.firebasedb.removeRoute(row.key);
        });
        break;
    }
  }

  //RouteLocationGrid

  public onRowSelected(args: any): void {
    this.key = args.data.key;
    this.routename = args.data.name;
    console.log(this.key)

        this.firebase
      .list(`/routes/${this.key}/locations`)
      .valueChanges()
      .subscribe((routelocs) => {
        this.routelocationGrid.dataSource = routelocs; //intial data binding to grid
        console.log(this.routelocationGrid.dataSource)
      });
    this.firebase
      .list(`/routes/${this.key}/locations`)
      .snapshotChanges()
      .subscribe((routelocs) => {
        this.routelocationGrid.dataSource = routelocs; // sync server data changes to grid
        console.log(this.routelocationGrid.dataSource)
      });
     
  }


 public actionFailure (args) {

    console.log(args);

}


  public actionCompleteRouteLoc(args: any): void {
    
    switch (args.requestType) {
      // case "save":
      //     this.firebasedb.updateRoute(JSON.parse( JSON.stringify(args.data )));
      //
      //   break;
      case 'delete':
        args.data.forEach((row: any) => {
          this.firebasedb.removeRouteLoc(this.key, row.postcode);
        });
        break;
        
    }
    this.routelocationGrid.currentViewData.forEach((row: any, index) => { 
      row.id = index 
      this.firebasedb.updateRouteLocs(this.key, row);
     })
    this.drawPath(this.routelocationGrid.currentViewData)
  }

  rowDrop(args) {
    args.cancel = true; // prevent the default action
    let moveposition = {
      oldIndex: args.fromIndex,
      newIndex: args.dropIndex,
    };
    const next = this.routelocationGrid.currentViewData;
    const moved = next.splice(moveposition.oldIndex, 1);
    next.splice(moveposition.newIndex, 0, moved[0])
    next.forEach((row: any, index) => { 
      row.id = index 
      this.firebasedb.updateRouteLocs(this.key, row);
     })

  }

  onRouteLocRowSelected(args: any): void {
    // maps zoom
    this.map.panTo(args.data.coords);
    this.zoom = 10;
  }

  drawPath(data) {
    this.path = [];
    data.forEach((routloc: any) => {
     this.path.push(routloc.coords);
   });
  }

  
  //Googlemaps

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  zoom = 6;
  center: google.maps.LatLngLiteral = { lat: 54.506, lng: -4.448 };
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 4,
  };

  markers = [] as any;
  infoContent = [] as any;
  polylineOptions = {
    // path: [],
    // strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

  addLocation() {
    // const newid = this.routelocationGrid.currentViewData.length ;
    this.firebasedb.addRouteLocation(this.infoContent, this.key);
   
  }

  // Unecessary stuff -----------

  eventHandler(event: any, name: string) {
    // console.log(event, name);

    // Add marker on double click event
    if (name === 'mapDblclick') {
      this.addMarker(event);
    }
  }

  addPolyline(data) {
    this.path.push(new google.maps.LatLng(data.coords));
  }

  addMarker(location: any) {
    this.map.panTo(location.coords);
    this.markers.push({
      position: location.coords,
      // label: {
      //   color: 'blue',
      //   text: 'Marker label ' + (this.markers.length + 1),
      // },
      // title: 'Marker title ' + (this.markers.length + 1),
      info: location,
      options: {
        opacity: 1,
      },
    });
  }
}
