import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { Products } from 'src/app/models/products';
import { Reserve } from 'src/app/models/reserve';
import { OResponse } from 'src/app/models/response';
import { ProductService } from 'src/app/services/product.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.css']
})
export class ReserveDialogComponent implements OnInit {
  
  /**
   * Constructor, recibe seis parámetros
   * 
   * @param data 
   * @param userService 
   * @param reserveService 
   * @param productService 
   * @param dialogRef 
   * @param dialogService 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Products, units: string, totalImport: number },
    private userService: UserService,
    private reserveService: ReserveService,
    private productService: ProductService,
   private dialogRef: MatDialogRef<ReserveDialogComponent>,
    protected dialogService: DialogService,
  ) { }

  ngOnInit() {
  }
  /**
   * Método para cerrar la ventana emergente de confirmación
   * 
   * @param msg tipo string, es el mensaje que mostrará la ventana al cerrarse
   */
  close(msg: string) {
    this.dialogRef.close(msg);
  }
  /**
   * Método que recoje y envía la reserva al servidor para su inserción en la base de datos
   */
  reserveOK() {

    const currentUser = this.userService.getCurrentUser();
    const { product, units, totalImport } = this.data;
    let endDate: Date = new Date();
    endDate.setDate(endDate.getDate() + 15);
    let day: number = endDate.getDate();
    let month_: number = endDate.getMonth() + 1;
    let year_: number = endDate.getFullYear();
    let currentReserve = new Reserve(currentUser, product.id, Number(units), product.price, totalImport, endDate.getTime());
    

    this.reserveService.reserve(currentReserve).subscribe(
      res => {console.log(res); 
        // console.log((res.data[0]).hasOwnProperty('active'));
        console.log(Array.isArray(res.data));
        let part1: string = "";
        let part2: string = "";
        let part3: string = "";
        if (res.code !== 0) {
          if (JSON.parse(localStorage.getItem("com.ontimize.web.volvoreta"))['lang'] == "es") {
            part1 = "No ha sido posible realizar la reserva. ";
          } else {
            part1 = "It was not possible to make the reservation";
          }
          this.close(part1);
          return
        }
        if(Array.isArray(res.data)){
          if (JSON.parse(localStorage.getItem("com.ontimize.web.volvoreta"))['lang'] == "es") {
            part1 = "No ha sido posible realizar la reserva. ";
          } else {
            part1 = "It was not possible to make the reservation";
          }
          this.close(part1);
          return
        } else {
          if (JSON.parse(localStorage.getItem("com.ontimize.web.volvoreta"))['lang'] == "es") {
            part1 = "Has reservado ";
            part2 = "Pasa a recoger tu pedido antes del ";
            part3 = + day + "-" + month_ + "-" + year_;
          } else {
            part1 = "You have reserved ";
            part2 = "Pick up your order before ";
            part3 = + year_ + "-" + month_ + "-" + day;
          }
          this.updateActive(product.id);
          this.close(part1 + units + " <b>" + product.name + "</b>. " + part2 + " <b>" + part3 +  "</b>. ");
        }
      }
    );
  }
  /**
   * Método que pone inactivo un producto una vez que se ha reservado todo su stock real.
   * 
   * @param id Identificador de un producto
   */
  updateActive(id: number){
    this.productService.getById(id).subscribe(
      ({code, data}: OResponse) => {
        if (code !== 0) {
          this.dialogService.error("updated error", "error when making the reservation");
          return
        }
        if(Number (data[0].istock) === 0){
          this.productService.updateActive(id, false).subscribe();
        }
      }
    );
  }

}
