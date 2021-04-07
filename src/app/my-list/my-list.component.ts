import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  myListSplit:any = [];
  myList:any = [];
  myListMain:any = [];
  temp:any = {};
  constructor() { }

  ngOnInit(): void {


    console.log(localStorage);
    this.myList = localStorage.getItem("myList");
    this.myList = JSON.parse(this.myList);
    console.log(this.myList);
    // console.log(this.continue_watch_mobile);


    // var keys = Object.keys(localStorage),
    // i = keys.length;
    // while ( i-- ) {
    //   if (keys[i] != "current"){
    //     this.temp = localStorage.getItem(keys[i]);
    //     this.myList.push(JSON.parse(this.temp));
    //   }
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
    
  // }

  checkListLength(){
    if(this.myList.length != 0){
      return true;
    }
    else{
      return false;
    }
  }

}
