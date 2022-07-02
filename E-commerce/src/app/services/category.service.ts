import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  observableCategories$: Observable<any>;
  constructor(private db: AngularFireDatabase) { 
    this.observableCategories$ = this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges();
  }

  getCategories() {
    return this.observableCategories$.pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
}
