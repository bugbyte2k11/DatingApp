import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  //store only single data
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  /*
  1. Call the account/login api using http post
  2. When the response return back then check to see if there is a user object then add the user object as a map into the local storage of the browser
  */
  login(model: any){
    //return back the user model and also perform the storage of the user info
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));   //add user with the key user to browser local storage
          this.currentUserSource.next(user);  //set the user to currentUserSource
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  //logout by removed the user from the localStorage and also set currentUserSource to null
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);  //empty out the current user
  }
}
