import { HttpClient } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

let apiLoaded = false;

@Component({
  selector: 'app-movie-disp',
  templateUrl: './movie-disp.component.html',
  styleUrls: ['./movie-disp.component.css']
})

export class MovieDispComponent implements OnInit {

  content: any;
  movie_detail:any;
  youtube = "";
  button_content = "";
  trigger_message = "";
  trigger_add = false;
  trigger_remove = false;
  castInfo:any;
  id:number = 0;
  constructor(private route:ActivatedRoute, private http: HttpClient, private modalService: NgbModal) { }


  ngOnInit(): void {
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

  private getMovieDetails(){
    this.http.get<any>("http://localhost:8080/getDetails?id=" + this.content.id + "&media_type=" + this.content.media_type)
    .subscribe(responseData => {
      this.movie_detail = responseData;
      this.youtube = responseData.trailer;
      console.log(this.youtube);
    });
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
    this.checkLocalStorage();
  }

    closeTrigger(){
      this.trigger_add = false;
      this.trigger_remove = false;
    }

    openLg(content: any, inp: number) {
      this.id = inp;
      console.log(this.id);
      this.getCastDetails();
      this.modalService.open(content, { size: 'lg' });
    }
  
    private getCastDetails(){
      console.log(this.id);
      this.http.get<any>("http://localhost:8080/getCastDetails?id=" + this.id)
      .subscribe(responseData => {
        this.castInfo = responseData;
        console.log(responseData);
      });
    }

}
