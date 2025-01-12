import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 import { User } from '../models/user.model';// Import User model

interface LoginResponse {
  message: string;
  emailId:string;
  subscriptionId:string;
  mobileNo:string;
  firstName:string;
  lastName:string;
  userId:number;
}
// interface User {
//   firstName: string;
//   lastName: string;
//   mobileno: string;
//   userId:number;
//   subscriptionId:string;
//   emailId:string;
// }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  arrLoginResponse:any = [];
  loggedIn:boolean=false;
  // https://localhost:7110/api/Auth/login
  private apiUrl = 'https://localhost:7110/api/Auth/login';
    // Use a BehaviorSubject to store the user info globally
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable(); // Expose the user as an observable

  private loggedInSubject = new BehaviorSubject<boolean>(false); // Default is false
  loggedIn$ = this.loggedInSubject.asObservable(); // Observable to track login status


  constructor(private http:HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedInSubject.next(true); // User is logged in
    }
   }
  // login(data:any): Observable<any> {
  //   return this.http.post(environment.apiUrl + 'Auth/login', data);
  // }
  login(data:any): Observable<LoginResponse[]> {
    return this.http.post<LoginResponse[]>(this.apiUrl, data)
    .pipe(
      map((response:LoginResponse[])=> {
        if (response && response.length > 0) {
          const user = response[0];
          // Ensure the response has the correct structure
          // console.log('Response from API:', response);
          const userData:User = {
            firstName : user.firstName,
            lastName : user.lastName,
            mobileno : user.mobileNo,
            emailId : user.emailId,
            subscriptionId : user.subscriptionId,
            userId : user.userId
          };
        this.userSubject.next(userData);// Update the stored user data
        localStorage.setItem('user', JSON.stringify(user)); // Store in local storage

        return response;
      }else {
        throw new Error('User not found');
      }
  })
    );
  }
 // Method to get the currently logged-in user
  getUser(): Observable<User | null> {
    // const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log(storedUser)
    return this.user$;

  }
   // Optionally, you can also add a method to clear the user on logout
   logout(): void {

    // this.loggedInSubject.next(false);
    localStorage.removeItem('user'); // Optionally remove from localStorage
    this.userSubject.next(null);
  }
  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  checkUserLoginStatus(){
    this.loggedInSubject.next(true);
    localStorage.setItem('user', JSON.stringify({ firstName: 'krishna' })); // Example login
  }
  // logout() {
  //   this.loggedInSubject.next(false);
  //   localStorage.removeItem('user');
  // }
  isLoggedIn(): boolean {

    const token = this.getToken();
    return token ? true : false;
  }
}
