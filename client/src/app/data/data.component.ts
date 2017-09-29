import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor( private service: DataService ) { }

  ngOnInit() {
  }
  message: String = '';
  array: String = '';
  username: String ='';

  submit: Boolean = false;
  onSubmit(){
    this.submit = true;
    this.service.postData(this.array, this.username).subscribe((res)=>{

    if (res.post){
      this.message="Data posted suceessfully";
    }else{
      this.message="Something went wrong :( Check data structure. Please try again.";
    }

    });
 }

}
