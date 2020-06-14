import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface Token {
  token: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private tokensCollection: AngularFirestoreCollection<Token>;

  constructor(private swUpdate: SwUpdate, private angularFireMessaging: AngularFireMessaging,
    private angularFirestore: AngularFirestore) {
    this.tokensCollection = this.angularFirestore.collection<Token>('tokens');
  }

  ngOnInit() {
    this.updatePwa();
    this.requestNotificationsPermission();
    this.listenNotifications();
  }

  updatePwa() {
    this.swUpdate.available.subscribe(value => {
      console.log('Update PWA: ' + value);
      window.location.reload();
    });
  }

  requestNotificationsPermission() {
    this.angularFireMessaging.requestToken.subscribe(token => {
      this.tokensCollection.add({ token });
    });
  }

  // Estar escuchando notificaciones, que hacer cuando llega una notificación
  listenNotifications() {
    this.angularFireMessaging.messages.subscribe(message => {
    });
  }

}
