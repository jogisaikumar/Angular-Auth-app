import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl : string = 'http://localhost:3000/users';
  private isAuthenticated : boolean = false;
  private currentUser: any = null;
  constructor(private http: HttpClient, private router: Router)  {
    const storedUser = localStorage.getItem('currentUser');
    if(storedUser){
      this.currentUser = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
    console.log('Auth service Initiated')
   }

   login(username: string, password: string):Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.isAuthenticated = true;
          this.currentUser = users[0];
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          console.log('saved user to local storage', this.currentUser);
          return this.currentUser;
        }
        else{
          this.currentUser = null;
          return null;
        }
      })
    );
   }

   signUp(user: any):Observable<any> {
    return this.http.post(this.apiUrl, user)
   }

   logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    console.log("Logged out Succesfully");
    alert("Logged out succesfully");
    this.router.navigate(['/login']);
   }

   getIsAuthenticated(): boolean {
    return this.isAuthenticated;
   }

   getCurrentUser(): any {
    return this.currentUser;
   }
}
