import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  myList:any = []
  temp:any = {}
  constructor() { }

  ngOnInit(): void {
    console.log(localStorage);
    var keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
      this.temp = localStorage.getItem(keys[i]);
      this.myList.push(JSON.parse(this.temp));
    }
    console.log(this.myList);
  }

}
