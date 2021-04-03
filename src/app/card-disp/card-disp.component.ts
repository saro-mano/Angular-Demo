import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-disp',
  templateUrl: './card-disp.component.html',
  styleUrls: ['./card-disp.component.css']
})
export class CardDispComponent implements OnInit {

  popular_movies:any = [];
  top_rated_movies:any = [];
  trending_movies:any = [];
  popular_tv:any = [];
  top_rated_tv:any = [];
  trending_tv:any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchHomeContent();
  }
  

  private nestedArrayConverter(mov:any){
      var temp = [];
      var result = [];
      for(var i = 0 ; i < mov.length ; i++){
        temp.push(mov[i]);
        if(temp.length == 6){
          result.push(temp);
          temp = [];
        }
      }
      result.push(temp);
      return result;
  }
  private fetchHomeContent(){
    this.http.get<any>("http://localhost:8080/homeContent").subscribe(responseData => {
      this.popular_movies = this.nestedArrayConverter(responseData.popular_movies);
      this.top_rated_movies = this.nestedArrayConverter(responseData.top_rated_movies);
      this.trending_movies = this.nestedArrayConverter(responseData.trending_movies);
      this.popular_tv = this.nestedArrayConverter(responseData.popular_tv);
      this.top_rated_tv = this.nestedArrayConverter(responseData.top_rated_tv);
      console.log(responseData.trending_tv);
      this.trending_tv = this.nestedArrayConverter(responseData.trending_tv);
      
    });
  }
}
