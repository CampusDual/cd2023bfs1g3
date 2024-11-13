import { Component, OnInit, ViewChild } from '@angular/core';
import { OComboComponent, OFormComponent } from 'ontimize-web-ngx';


@Component({
  selector: 'app-global-booking-detail',
  templateUrl: './global-booking-detail.component.html',
  styleUrls: ['./global-booking-detail.component.css']
})
export class GlobalBookingDetailComponent implements OnInit {
  @ViewChild("gState", { static: true }) gState: OComboComponent;
  @ViewChild("detailGlobalBooking", { static: true }) detailGlobalBooking: OFormComponent;

  enabled: boolean;
  
  constructor() {
    this.enabled = false;
  }

  ngOnInit() {
  }

  //Método que se llama cuando ocurre un evento que desencadena un cambio en el estado de la reserva global.
  delivered(event){
    const { type } = event
  
    if(Number(this.gState.getValue()) == 2 && type == 1){
      this.enabled = false;
    } else if(Number(this.gState.getValue()) == 3 && type == 1){
      this.enabled = false;
      document.getElementById("gPicked").setAttribute("style", "display:flex");
    }
    else {
      if(Number(this.gState.getValue()) == 1 || type == 0){
        this.enabled = true;
        document.getElementById("gPicked").setAttribute("style", "display:none");
      }      
    }
  }

}
