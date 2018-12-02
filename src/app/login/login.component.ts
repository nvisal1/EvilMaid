import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authInfo: { username: string; password: string } = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    const auth = await this.auth.login(this.authInfo.username, this.authInfo.password);
    if (auth['token']) {
      this.router.navigate(['/home']);
    }
  }

}
