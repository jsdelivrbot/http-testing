import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit() {
  }
  message: string = '';
  username: string = '';
  password: string = '';

  onSubmit(){
    console.log("onSubmit activated");
    this.authService.logIn(this.username, this.password)
        .subscribe((res)=>{
        if (res.ok){
          this.message="logged in";
        }else{
          this.message="Username/password incorrect. Please try again.";
        }
        }
      );
  }
}
