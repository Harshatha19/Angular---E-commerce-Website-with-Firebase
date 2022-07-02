import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as auth from 'firebase/auth';
import  * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import {of} from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User | null>
  constructor(private userservice: UserService,private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }
  
  Login(){  //Login Method
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem('returnUrl', returnUrl);
   
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  
}

logout(){ //logout method
  this.afAuth.signOut().then(() => {
  this.router.navigate(['/login']);
  }, err => {
    alert(err.message);
  
  })
    }

    get appUser$(): Observable<any> { //appUser object
      return this.user$.pipe(
        switchMap((user) => {
          if (user) return this.userservice.get(user.uid);
          return of(null);
        })
      );
    }
}



