import { Component, OnInit, ViewChild } from '@angular/core';
import { OComboComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bookings-detail',
  templateUrl: './bookings-detail.component.html',
  styleUrls: ['./bookings-detail.component.css']
})
export class BookingsDetailComponent implements OnInit {
  @ViewChild("rState", { static: true }) rState: OComboComponent;
  @ViewChild("cCollected", { static: true }) cCollected: OComboComponent;
  @ViewChild("detailBooking", { static: true }) detailBooking: OFormComponent;

  enabled: boolean;
  collected: any;
  

  constructor() {
    this.enabled = false;
  }

  ngOnInit() { }
  
  //Método que se llama cuando ocurre un evento que desencadena un cambio en el estado de la reserva.
  enable(event){
    const { type } = event
    
    if(Number(this.rState.getValue()) == 2 && type == 1){
      this.enabled = false;
      document.getElementById("collected").setAttribute("style", "display:none");
    } else {
      if(Number(this.rState.getValue()) == 1 || type == 0){
        this.enabled = true;
        document.getElementById("picked").setAttribute("style", "display:none");
        document.getElementById("collected").setAttribute("style", "display:none");
      } else {
        this.cCollected.setValue(3);
        document.getElementById("iState").setAttribute("style", "display:none");
      }
      
    }
    
  }
}
