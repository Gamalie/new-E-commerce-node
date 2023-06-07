import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Newuser, AddedUserSuccess, LogInuser, LoggedInUserSuccess } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  addUser(newUser:Newuser):Observable<AddedUserSuccess>{
    return this.http.post<AddedUserSuccess>('http://localhost:4000/user',newUser)
  }

  loginUser(logInuser:LogInuser):Observable<LoggedInUserSuccess>{
    return this.http.post<LoggedInUserSuccess>('http://localhost:4000/user/login',logInuser)

  }
}
