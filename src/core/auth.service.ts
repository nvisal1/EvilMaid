import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user;

  constructor(private http: HttpClient) { }

  login(
    username: string,
    password: string
  ): Promise<any>  {
    let submission;
    if (username.includes('{') && password.includes('{')) {
      submission = {
        username: JSON.parse(username),
        password: JSON.parse(password)
      };
    } else {
      submission = {
        username: username,
        password: password
      };
    }
    return this.http
      .post(environment.apiURL + '/users/tokens', submission, {
        withCredentials: true
      })
      .toPromise()
      .then(
        val => {
          this.user = val;
          return this.user;
        },
        error => {
          if (error.status === 400) {
            return error.error;
          }
        }
      );
  }
}
