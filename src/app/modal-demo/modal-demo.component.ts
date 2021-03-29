import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.css']
})
export class ModalDemoComponent implements OnInit {

  castInfo:any;
  id:number = 0;

  constructor(private modalService: NgbModal, private http: HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
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
