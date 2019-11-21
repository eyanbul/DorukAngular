import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from '../services/global.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin = false;

  constructor(private global: GlobalService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(data) {
    let reqData = {
      email: data[0].value,
      password: data[1].value,
      grant_type: "password"
    };
    
    this.global.reqPost("/token/login", reqData).subscribe(x => {
      localStorage.setItem("access_token", x["token"]);
      localStorage.setItem("expires_in", x["expiration"]);

      this.router.navigate(["/"]);
    })
  }

}
