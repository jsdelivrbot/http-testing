import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

import { Frequency, STATISTICS } from '../shared/data';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css'],
  providers: [DataService]
})
export class HttpClientComponent implements OnInit {

  constructor(private service: DataService) { }
  private params = [];
  // stats = STATISTICS[0].letter
  ngOnInit() {
    this.service.getStats().subscribe((data)=> {this.params = data; console.log(data);});
    // this.http.get('http://localhost:3000/file')
    //   .subscribe((data)=>{
    //     this.params = JSON.parse(data).letter;
    //     console.log('Recieved data!');
    //   }, (err)=>{
    //     console.log('An error occured');
    //   });
  }

}
