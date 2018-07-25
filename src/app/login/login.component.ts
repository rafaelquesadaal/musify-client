import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../models/user';
import { UserService } from "../services/user.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userRegister: User;
  user;
  identity;
  token;
  loginError: string;
  registerError: string;
  registerMessage: string;

  constructor(private userService: UserService, private utilsService: UtilsService, private router: Router) {
    this.user = new User('','','','','','ROLE_USER','');
    this.userRegister = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {}

  onLogin():void{
    if(!this.user.email || !this.user.password) return;
    this.userService.singup(this.user).subscribe(
      res => {
        this.loginError = null;
        this.registerError = null;
        this.registerMessage = null;
        let identity = res.user;
        this.identity = identity;

        if(!this.identity._id) alert('Error');
        else{
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.userService.singup(this.user, true).subscribe(
            res => {
              this.loginError = null;
              let token = res.token;
              this.token = token;
      
              if(this.token.length < 1) alert('Token was not generated');
              else{
                localStorage.setItem('token', this.token);
                this.utilsService.emitUpdate(true);
                this.router.navigate(['/']);
              }
            }, err =>{
              let errorResponse = <any>err;
              if(errorResponse != null) {
                console.log(errorResponse);
                this.loginError = errorResponse.error.message;
              }
            }
          ); 
        }
      }, err =>{
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse);
          this.loginError = errorResponse.error.message;
        }
      }
    );
  }

  onRegister():void{
    this.loginError = null;
    this.registerError = null;
    this.registerMessage = null;
    this.userService.signIn(this.userRegister).subscribe(
      res => {
        let user = res.user;
        if(!user) return this.registerError = "";
        this.userRegister = user;
        if(!user._id) this.registerError = "The user was not registered";
        else {
          this.registerMessage = `Register complete, please login with ${this.userRegister.email}`;
          this.userRegister = new User('','','','','','ROLE_USER','');
        }
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse);
          this.registerError = errorResponse.error.message;
        }
      }
    );
  }
}
