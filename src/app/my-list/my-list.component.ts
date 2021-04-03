import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  myListSplit:any = []
  myList:any = []
  temp:any = {}
  constructor() { }

  ngOnInit(): void {
    console.log(localStorage);
    var keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
      if (keys[i] != "current"){
        this.temp = localStorage.getItem(keys[i]);
        this.myList.push(JSON.parse(this.temp));
      }
    }
    // var temp = [];
    // for(i = 0 ; i < this.myList.length ; i++){
    //   if(temp.length == 6){
    //     this.myListSplit.push(this.temp);
    //     temp = [];
    //   }
    //   else{
    //     temp.push(this.myList[i]);
    //   }
    // }
    // this.myListSplit.push(this.temp);
    // console.log(this.myListSplit);
    
  }

}
