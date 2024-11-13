import { Injectable } from "@angular/core";
import { Observable, OntimizeService } from "ontimize-web-ngx";
import { OResponse } from "../models/response";
import { Reserve } from "../models/reserve";

@Injectable({ providedIn: 'root' })
export class ReserveService {
  /**
   * Array de Reserve, lleva las reservas devueltas por el servicio
   */
  data: Reserve[];

  constructor(private ontimizeService: OntimizeService) { }
  /**
   * Hace la llamada al servido para escribir la reserva
   * 
   * @param reserve Tipo Reserve, recibe la reserva a enviar al servidor
   * @returns Objeto Observable
   */
  reserve(reserve: Reserve): Observable<OResponse> {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('bookings'));
    return this.ontimizeService.insert(reserve, 'booking');
  }
  /**
   * Solicita la fecha de finalización de una reserva por id
   * 
   * @param id Tipo number, identificador de la reserva
   * @returns Objeto Observable
   */
  getReserveDate(id: number): Observable<OResponse> {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('bookings'));
    return this.ontimizeService.query({ 'id': id }, ['end_date'], 'booking');
  }
  /**
   * Módifica la select en el servidor para extraer los datos de una reserva en un año concreto y construir una gráfica
   * 
   * @param year_ Tipo number, año de la reserva
   * @returns Objeto observable
   */
  setYearConsultation(year_: number): Observable<OResponse> {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('bookings'));
    return this.ontimizeService.query({ 'year_': year_ }, [''], 'yearBooking');
  }
}