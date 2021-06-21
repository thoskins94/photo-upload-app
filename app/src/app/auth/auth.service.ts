import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';

export interface AuthObject {
  firstName: String,
  lastName: String,
  email: String,
  password: String
  authSubject: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  options: any;
  authObject: any;
  constructor(private http: HttpClient, private router: Router) {
    this.options = {
      'headers' : {
        'accept': 'application/json'
      }
    }
    this.authObject = new BehaviorSubject(false)
  }

  async login(email: string, password: string) {
    return await this.http.post('http://localhost:3000/api/auth/login', {email: email, password: password}, this.options).toPromise().then((data:any) => {
      if(data.user)
      {
        localStorage.setItem('ACCESS_TOKEN', data.user.access_token);
        localStorage.setItem('EXPIRES_IN', data.user.expiresIn);
        localStorage.setItem('USER_ID', data.user._id);
        this.router.navigateByUrl(data.user._id + '/photos') 
      }
    })
  }

  register(user: User) {
    return this.http.post('http://localhost:3000/api/auth/register', user, this.options).toPromise().then((data:any) => {
      localStorage.setItem('ACCESS_TOKEN', data.user.access_token);
      localStorage.setItem('EXPIRES_IN', data.user.expiresIn);
      localStorage.setItem('USER_ID', data.user._id);
      this.router.navigateByUrl(data.user._id + '/photos')
    })
  }

  logout(): Observable<void> {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('EXPIRES_IN');
      localStorage.removeIte,("USER_ID");
      this.router.navigateByUrl('/login');
      return this.http.get<void>('http://localhost:3000/auth/logout');
  }

  isLoggedIn() {
    return localStorage.getItem("ACCESS_TOKEN") == null ? false : true;
  }
}

export default AuthService;
