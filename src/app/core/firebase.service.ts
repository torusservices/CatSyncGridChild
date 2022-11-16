import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  snapshotChanges,
} from '@angular/fire/compat/database/';
import { async } from '@firebase/util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Product, CartItem, Order, Metals, User } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  cartsUrl = '/carts';
  ordersUrl = '/orders';
  productsUrl = '/products';
  categoriesUrl = '/categories';
  metalsUrl = '/metals';
  locationsUrl = '/locations';
  routesUrl = '/routes';
  commentsUrl = '/comments';
  usersUrl = '/users';
  userid: string;
  useremail: string;
  todaysroutekey: any;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser$.subscribe((res) => {
      this.userid = res.uid;
      this.useremail = res.email;
      return this.updateUser(this.userid, this.useremail);
    });

    if (!this.getCartKey()) {
      localStorage.setItem('cartKey', db.createPushId());
    }
  }

  updateUser(uid, email) {
    this.db.database
      .ref(this.usersUrl)
      .child(uid)
      .update({ uid: uid, email: email });
  }

  getProducts(): Observable<Product[]> {
    return this.db
      .list(this.productsUrl)
      .snapshotChanges()
      .pipe(
        map((products) =>
          products.map(
            (product) =>
              ({
                key: product.payload.key,
                ...(product.payload.val() as {}),
              } as Product)
          )
        )
      );
  }

  getLocations(): Observable<Location[]> {
    return this.db
      .list(this.locationsUrl)
      .snapshotChanges()
      .pipe(
        map((locations) =>
          locations.map(
            (location) =>
              ({
                key: location.payload.key,
                ...(location.payload.val() as {}),
              } as unknown as Location)
          )
        )
      );
  }

  // async getTodaysRoute(): Promise<Observable<Location[]>> {
  //   const date = new Date().toISOString().replace(/\T.*/, '');
  //   const userdate = `${this.useremail}${date}`;
  //   let todaysroutekey;
  //   await this.db.database
  //     .ref()
  //     .child('routes')
  //     .orderByChild('user_date')
  //     .equalTo(userdate)
  //     .on('child_added', function ( snapshot) {

  //       todaysroutekey =  snapshot.key;
  //       // console.log(todaysroutekey);
  //     });

  //   console.log(todaysroutekey);
  //   return this.db
  //     .list(`${this.routesUrl}/${todaysroutekey}/locations`)
  //     .snapshotChanges()
  //     .pipe(
  //      await map((locations) =>
  //         locations.map(
  //           (location) =>
  //             ({
  //               key: location.payload.key,
  //               ...(location.payload.val() as {}),
  //             } as unknown as Location)
  //         )
  //       )
  //     );
  // }

  // getTodaysRoute(): Observable<Location[]> {
  //   const date = new Date().toISOString().replace(/\T.*/, '');
  //   const userdate = `${this.useremail}${date}`;
  //   let todaysroutekey;
  //    this.db.database
  //     .ref()
  //     .child('routes')
  //     .orderByChild('user_date')
  //     .equalTo(userdate)
  //     .on('child_added', function ( snapshot) {

  //       todaysroutekey =  snapshot.key;
  //       // console.log(todaysroutekey);
  //       return
  //     });

  //   console.log(todaysroutekey);
  //   return this.db
  //     .list(`${this.routesUrl}/${todaysroutekey}/locations`)
  //     .snapshotChanges()
  //     .pipe(
  //       map((locations) =>
  //         locations.map(
  //           (location) =>
  //             ({
  //               key: location.payload.key,
  //               ...(location.payload.val() as {}),
  //             } as unknown as Location)
  //         )
  //       )
  //     );
  // }

  genkey() {
    // const date = new Date().toISOString().replace(/\T.*/, '');
    // const userdate = `${this.useremail}${date}`;
    // let todaysroutekey;
    // return this.db.database
    //   .ref()
    //   .child('routes')
    //   .orderByChild('user_date')
    //   .equalTo(userdate)
    //   .on('child_added', function (snapshot) {
    //     todaysroutekey = snapshot.key;
    //     return snapshot.key
    //   });
  
  }

  getTodaysRoute(): Observable<Location[]> {
    const snapshot = this.genkey();
    const date = new Date().toISOString().replace(/\T.*/, '');
    const userdate = `${this.useremail}${date}`;
    let todaysroutekey;
    this.db.database
      .ref()
      .child('routes')
      .orderByChild('user_date')
      .equalTo(userdate)
      .on('child_added', function (snapshot) {
        todaysroutekey = snapshot.key;
    
      });
    
    return this.db
      .list(`${this.routesUrl}/${todaysroutekey}/locations`)
      .snapshotChanges()
      .pipe(
        map((locations) =>
          locations.map(
            (location) =>
              ({
                key: location.payload.key,
                ...(location.payload.val() as {}),
              } as unknown as Location)
          )
        )
      );
  }

  //     getTodaysRouteKey() {
  //     const date = new Date().toISOString().replace(/\T.*/, '');
  //     const userdate = `${this.useremail}${date}`;
  //      this.db.database
  //       .ref()
  //       .child('routes')
  //       .orderByChild('user_date')
  //       .equalTo(userdate)
  //       .on('child_added', function ( snapshot) {
  //           const todaysroutekey =  snapshot.key;
  //         // console.log(todaysroutekey);
  //         return todaysroutekey
  //       });

  //   }

  //   getTodaysRoute(): Observable<Location[]> {
  //     console.log( this.getTodaysRouteKey())
  //   this.todaysroutekey = this.getTodaysRouteKey();
  //   return this.db
  //   .list(`${this.routesUrl}/${this.todaysroutekey}/locations`)
  //   .snapshotChanges()
  //   .pipe(
  //     map((locations) =>
  //       locations.map(
  //         (location) =>
  //           ({
  //             key: location.payload.key,
  //             ...(location.payload.val() as {}),
  //           } as unknown as Location)
  //       )
  //     )
  //   );
  //  }

  getCategories(): Observable<any[]> {
    return this.db.list(this.categoriesUrl).valueChanges();
  }

  getCartKey() {
    // return localStorage.getItem('cartKey');
    return this.userid;
  }

  getCart(): Observable<CartItem[]> {
    return this.db
      .list(`${this.cartsUrl}/${this.getCartKey()}`)
      .snapshotChanges()
      .pipe(
        map((cart) =>
          cart.map(
            (item) =>
              ({
                key: item.payload.key,
                ...(item.payload.val() as {}),
              } as CartItem)
          )
        )
      );
  }

  clearCart() {
    return this.db.list(`${this.cartsUrl}/${this.getCartKey()}`).remove();
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .list(`${this.ordersUrl}/${this.getCartKey()}`)
      .snapshotChanges()
      .pipe(
        map((orders) =>
          orders.map(
            (order) =>
              ({
                key: order.payload.key,
                items: order.payload.val(),
              } as Order)
          )
        )
      );
  }

  addOrder(order: CartItem[], comment, address) {
    this.db.database
      .ref(this.ordersUrl)
      .child(this.getCartKey())
      .child(new Date().toISOString().replace(/\..*/, '').replace('T', ', '))
      .update({ items: order, comments: comment, address: address });
  }

  addMetals(metals: Metals[]) {
    this.db.database.ref('/').update({ metals });
    // this.db.database
    // let dbCon = this.db.database.ref("/products/");
    this.db.database.ref('/products/').once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        child.ref.update({
          updated: new Date()
            .toISOString()
            .replace(/\..*/, '')
            .replace('T', ' '),
        });
      });
    });
    // .ref('/').child("products").set({updated: (new Date().toISOString())});
  }

  getCartCount(): Observable<number> {
    return this.getCart().pipe(
      map((cart) =>
        cart
          .map((item: CartItem) => item.quantity)
          .reduce((acc, curr) => acc + curr, 0)
      )
    );
  }

  getCartItem(key: string): Observable<any> {
    return this.db
      .object(`${this.cartsUrl}/${this.getCartKey()}/${key}`)
      .valueChanges();
  }

  getRoute(key: string): Observable<any> {
    return this.db
      .object(`${this.routesUrl}/${key}/${'locations'}`)
      .valueChanges();
  }

  getCartItemCount(key: string): Observable<number> {
    return this.getCartItem(key).pipe(
      map((item) => (item ? item.quantity : 0))
    );
  }

  AddCartItem(item: Product) {
    const data = {
      title: item.title,
      unitPrice: item.price,
      quantitative: item.quantitative,
      quantity: 1,
      priceMultiplier: 1,
    };
    return this.updateCartItem(item.key, data);
  }

  AddCartCustomItem(_itemname, _itemprice) {
    const data = {
      title: _itemname,
      unitPrice: _itemprice,
      quantitative: 'true',
      quantity: 1,
      priceMultiplier: 1,
      customItem: true,
    };
    return this.updateCartItem(data.title, data);
  }

  updateCartItem(itemKey, value) {
    this.db.database
      .ref(this.cartsUrl)
      .child(this.getCartKey())
      .child(itemKey)
      .update(value);
  }

  removeCartItem(key: string) {
    this.db.object(`${this.cartsUrl}/${this.getCartKey()}/${key}`).remove();
  }

  removeProduct(key: string) {
    this.db.object(`${this.productsUrl}/${key}`).remove();
  }

  updateProduct(value) {
    if (!value.key) {
      value.key = this.db.createPushId();
    }
    value.quantitative = 'true';
    this.db.database.ref(this.productsUrl).child(value.key).update(value);
  }

  updateUserGrid(value) {
    // if (!value.key) {value.key = this.db.createPushId()}
    this.db.database.ref(this.usersUrl).child(value.uid).update(value);
  }

  removeLocation(key: string) {
    this.db.object(`${this.locationsUrl}/${key}`).remove();
  }

  updateLocation(value) {
    this.db.database.ref(this.locationsUrl).child(value.postcode).update(value);
  }

  removeRoute(key: string) {
    this.db.object(`${this.routesUrl}/${key}`).remove();
  }

  removeRouteLoc(routekey: string, locationkey: string) {
    this.db
      .object(`${this.routesUrl}/${routekey}/${'locations'}/${locationkey}`)
      .remove();
  }

  updateRoute(value) {
    //generate key if none is available
    if (!value.key) {
      value.key = this.db.createPushId();
    }
    //generate identifier for daily user route selection
    // value.identifier= `${value.user}${value.date}`
    value.user_date = `${value.user}${value.date.replace(/\T.*/, '')}`;
    this.db.database.ref(this.routesUrl).child(value.key).update(value);
  }

  addRouteLocation(location: any, routekey) {
    this.db.database
      .ref(this.routesUrl)
      .child(routekey)
      .child('locations')
      .child(location.postcode)
      .update({
        address: location.address,
        name: location.name,
        postcode: location.postcode,
        coords: location.coords,
      });
 
  }

  // getRouteLocNumber(routekey) {
  //   this.db.database
  //     .ref(this.routesUrl)
  //     .child(routekey)
  //     .child('locations')
  //     .once('value', function (snapshot) {
  //       const currentordernum = snapshot.numChildren();
  //       console.log('Ordernum:' + currentordernum);
  //       return currentordernum;
  //     });
  // }

  updateRouteLocs(routekey, data) {
    this.db.database
      .ref(this.routesUrl)
      .child(routekey)
      .child('locations')
      .child(data.postcode)
      .update({id: data.id});
  }

  updatePrice(dataproduct, metals) {
    metals.recyclingfee = this.db.database
      .ref(this.productsUrl)
      .child(dataproduct.key)
      .update({
        price:
          (((dataproduct.ceramic / 1000) * dataproduct.palladium) / 100) *
            98 *
            (1 / metals.rates['LBXPDAM'] / 31.1034 - 7) +
          (((dataproduct.ceramic / 1000) * dataproduct.platinum) / 100) *
            98 *
            (1 / metals.rates['LBXPTAM'] / 31.1034 - 7) +
          (((dataproduct.ceramic / 1000) * dataproduct.rhodium) / 100) *
            87.5 *
            (metals.rates['XRH'] / 31.1034 - 70) +
          //refining fee
          (dataproduct.ceramic / 1000) * 2.3,
      });
  }

  getMetals(): Observable<any> {
    return this.db.object(`${this.metalsUrl}`).valueChanges();
  }

  getLocation(key): Observable<any> {
    return this.db.object(`${this.locationsUrl}/${key}`).valueChanges();
  }

  getComments(key): Observable<Comment[]> {
    return this.db
      .list(`${this.commentsUrl}/${key}`)
      .snapshotChanges()
      .pipe(
        map((comments) =>
          comments.map(
            (comment) =>
              ({
                key: comment.payload.key,
                ...(comment.payload.val() as {}),
              } as unknown as Comment)
          )
        )
      );
  }

  getUsers(): Observable<User[]> {
    return this.db
      .list(`${this.usersUrl}`)
      .snapshotChanges()
      .pipe(
        map((users) =>
          users.map(
            (user) =>
              ({
                key: user.payload.key,
                ...(user.payload.val() as {}),
              } as unknown as User)
          )
        )
      );
  }

  getUser(): Observable<any> {
    return this.db.object(`${this.usersUrl}/${this.userid}`).valueChanges();
    
  }

  addComment(key, comment) {
    const date = new Date()
      .toISOString()
      .replace(/\..*/, '')
      .replace('T', ', ');
    this.db.database
      .ref(`${this.commentsUrl}/${key}`)
      .child(date)
      .update({ comment: comment, user: this.useremail, date: date });
  }
}
