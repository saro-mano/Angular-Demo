import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-card-disp',
  templateUrl: './card-disp.component.html',
  styleUrls: ['./card-disp.component.css']
})
export class CardDispComponent implements OnInit {

  currently_watching:any = [];
  popular_movies:any = [];
  top_rated_movies:any = [];
  trending_movies:any = [];
  popular_tv:any = [];
  top_rated_tv:any = [];
  trending_tv:any = [];
  temp:any = [];
  isMobileScreen:boolean = false;

  constructor(private http: HttpClient,private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.breakpointObserver.observe('(max-width: 600px)').subscribe((result) => {
      if(result.matches == true){
        this.isMobileScreen =  true;
      }
      else{
        this.isMobileScreen =  false;
      }
      console.log(this.isMobileScreen);
    })
    
    this.fetchHomeContent();
    this.getCurrentlyWatching();
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
      this.trending_tv = this.nestedArrayConverter(responseData.trending_tv);
      
    });
  }

  private getCurrentlyWatching(){
    console.log(localStorage);
    this.currently_watching = localStorage.getItem("current");
    this.currently_watching = JSON.parse(this.currently_watching);
    this.currently_watching = this.nestedArrayConverter(this.currently_watching);
    console.log(this.currently_watching);
  }
}
