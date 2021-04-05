import { HttpClient } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Platform } from '@angular/cdk/platform';
import {BreakpointObserver, LayoutModule } from '@angular/cdk/layout'; 


let apiLoaded = false;

@Component({
  selector: 'app-movie-disp',
  templateUrl: './movie-disp.component.html',
  styleUrls: ['./movie-disp.component.css']
})

export class MovieDispComponent implements OnInit {

  test:any = [];
  current_list:any = [];
  content: any;
  movie_detail:any;
  similar_movie:any;
  recommended_movie:any;
  youtube = "";
  button_content = "";
  trigger_message = "";
  trigger_add = false;
  trigger_remove = false;
  castInfo:any;
  id:number = 0;

  isMobileScreen:boolean = false;


  constructor(private route:ActivatedRoute,
    private http: HttpClient,
    private modalService: NgbModal,
    private router:Router,
    private breakpointObserver: BreakpointObserver){ 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
    }


  ngOnInit(): void {
    
    this.breakpointObserver.observe('(max-width: 600px)').subscribe((result) => {
      if(result.matches == true){
        this.isMobileScreen =  true;
      }
      else{
        this.isMobileScreen =  false;
      }
    })
    
    this.content = {
      id : this.route.snapshot.params['id'],
      media_type: this.route.snapshot.params['media_type']
    };


    this.getMovieDetails();
    this.checkLocalStorage();
    
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }    
  }

  private checkLocalStorage(){
    var key = this.content.id + "," + this.content.media_type;
    if(!localStorage.getItem(key)){
      this.button_content = "Add to WatchList";
    }
    else{
      this.button_content = "Remove from WatchList";
    }
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

  

  storeCurrentlyWatching(id:string, media_type:string, poster_path:string, title: string){
    // localStorage.clear();
    this.current_list = window.localStorage.getItem("current");
    var key = id + "," + media_type;
    var temp:any = {};
    // var parent:any = {};
    temp.mainkey = key;
    temp.id = id;
    temp.poster_path = poster_path;
    temp.title = title;
    temp.media_type = media_type;
    // parent[key] = temp;
    if (JSON.parse(this.current_list)){
      var temp_arr = JSON.parse(this.current_list);
      for(var i = 0 ; i < temp_arr.length ; i++){
        if(temp_arr[i]['mainkey'] == key){
          temp_arr.splice(i,1);
        }
      }
      temp_arr.unshift(temp);
      window.localStorage.setItem("current",JSON.stringify(temp_arr));
    }
    else{
      window.localStorage.setItem("current",JSON.stringify([temp]));
    }
    this.test = window.localStorage.getItem("current");
    // console.log(JSON.parse(this.test));
    
  }

  private getMovieDetails(){
    this.http.get<any>("http://localhost:8080/getDetails?id=" + this.content.id + "&media_type=" + this.content.media_type)
    .subscribe(responseData => {
      this.movie_detail = responseData;
      this.youtube = responseData.trailer;
      this.recommended_movie = this.nestedArrayConverter(responseData.recommended_mov);
      this.similar_movie = this.nestedArrayConverter(responseData.similar_mov);
      this.storeCurrentlyWatching(responseData.id,responseData.media_type,responseData.poster_path,responseData.title);
    });
  }

  closeTrigger(){
    this.trigger_add = false;
    this.trigger_remove = false;
    console.log(this.trigger_add);
    console.log(this.trigger_remove);
  }

  storeLocal(id:string, media_type:string, poster_path:string, title: string){
    var temp :any = {};
    var myStorage = window.localStorage;
    var key = id + "," + media_type;
    if(!myStorage.getItem(key)){
      temp.id = id;
      temp.poster_path = poster_path;
      temp.title = title;
      temp.media_type = media_type;
      myStorage.setItem(key,JSON.stringify(temp));
      this.trigger_message = "Added to watchlist."
      this.trigger_add = true;
      this.trigger_remove = false;
    }
    else{
      myStorage.removeItem(key);
      this.trigger_message = "Removed from watchlist."
      this.trigger_remove = true;
      this.trigger_add = false;
    }
    // setTimeout(this.closeTrigger, 20);
    setTimeout(() => {
      console.log('here');
      this.closeTrigger();
    }, 5000);
    this.checkLocalStorage();
  }

    openLg(content: any, inp: number) {
      this.id = inp;
      this.getCastDetails();
      this.modalService.open(content, { size: 'lg' });
    }
  
    private getCastDetails(){
      this.http.get<any>("http://localhost:8080/getCastDetails?id=" + this.id)
      .subscribe(responseData => {
        this.castInfo = responseData;
      });
    }

}
