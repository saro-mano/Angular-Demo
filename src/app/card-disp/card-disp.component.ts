import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-disp',
  templateUrl: './card-disp.component.html',
  styleUrls: ['./card-disp.component.css']
})
export class CardDispComponent implements OnInit {

  popular_movies:any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchHomeContent();
  }
  

  private fetchHomeContent(){
    this.http.get<any>("http://localhost:8080/homeContent").subscribe(responseData => {
      console.log(responseData.popular_movies);
      var pop_movs = responseData.popular_movies;
      console.log(pop_movs);
      var temp = [];
      for(var i = 0 ; i < pop_movs.length ; i++){
        temp.push(pop_movs[i]);
        if(temp.length == 6){
          this.popular_movies.push(temp);
          temp = [];
        }
      }
      this.popular_movies.push(temp);
      console.log(this.popular_movies);
    });
  }
}
