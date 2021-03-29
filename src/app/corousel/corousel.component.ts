import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Component } from '@angular/core';

// @Component({
//   selector: 'ngbd-carousel-basic', 
//   templateUrl: './corousel.component.html'
// })

// export class NgbdCarouselBasic {
//   images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
// }


@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css']
})
export class CorouselComponent implements OnInit {

  corousel_content:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchHomeContent();
  }

  private fetchHomeContent(){
    this.http.get<any>("http://localhost:8080/homeContent").subscribe(responseData => {
      console.log(responseData.currently_playing);
      this.corousel_content = responseData.currently_playing;
    });
  }
}
