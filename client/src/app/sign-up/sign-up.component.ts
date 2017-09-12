import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { DataService } from '../data.service';
@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [CanDeactivateGuard, DataService]
})
export class SignUpComponent implements OnInit {

  constructor(private service: DataService) { }

  ngOnInit() {
      let userRandom = new User('Snirhordan94', 'Senir', 'Hordan', '3498798','Harvard', 'good' );
      console.log("Heres my user" + JSON.stringify(userRandom)+ userRandom.firstName);
  }
  diagnostic = this.getTrace();
  education = ["Bachelor's Degree", "Master's Degree", "PhD"];
  dataType = ['Retail', 'Business', 'Educational'];
  model = new User('Anaconda', 'Senir', 'Hordan', '1873298d', this.education[0],
                      this.dataType[0]);
  submit = false;
  onSubmit(){
    this.submit = true;
    //post form to server
    // this.service/.newUser(this.model)l;..;
  }
  resetForm(){
    this.model = new User('', '', '', '', this.education[0],
                        this.dataType[0]);
  }
  getTrace(){
    return JSON.stringify(this.model);
  }
  //connect to data service
}
