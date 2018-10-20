import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent implements OnInit {

  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
      this.items = db.collection('/projects').valueChanges();
  }

  ngOnInit() {
  }

}
