import { Injectable } from "@angular/core";
import { Observable, OntimizeService } from "ontimize-web-ngx";
import { OResponse } from "../models/response";

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private ontimizeService: OntimizeService) {
  }
  /**
   * Hace la llamada al servidor para mostrar la lista de productos
   * 
   * @returns Objeto de tipo Obserbable
   */
  getAll(): Observable<OResponse> {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('products'));
    return this.ontimizeService.query({}, ['id', 'name', 'stock', 'price', 'state', 'body', 'photo'], 'product')
  }
  /**
   * Busca un producto por id y lo devuelve
   * 
   * @param id Identificador del producto
   * @returns Objeto de tipo Observable, respuesta del servidor
   */
  getById(id: number): Observable<OResponse> {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('products'));
    return this.ontimizeService.query({ 'id': id }, ['id', 'name', 'stock', 'istock', 'price', 'state_name', 'body', 'photo', 'name_location'], 'product')
  }
  /**
   * Llama al servidor para actulizar el stock en la base de datos
   * 
   * @param id tipo number, identificador del producto
   * @param newStock tipo number, establece el nuevo stock de un producto
   * @returns Respuesta del servidor
   */
  updateStock(id: number, newStock: number): Observable<OResponse> {
    let active = (newStock === 0) ? false : true;
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('products'));
    return this.ontimizeService.update({ 'id': id }, { 'stock': newStock, 'active': active }, 'product');
  }
  /**
   * Llama al servidor y actualiza el estado del producto
   * 
   * @param id Tipo number, identificador del producto
   * @param active Tipo boolean, establece a "activo" o "no activo"
   * @returns Respuesta del servidor
   */
  updateActive(id: number, active: boolean): Observable<OResponse> {
    console.log("Entro update", id, active)
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('products'));
    return this.ontimizeService.update({ 'id': id }, { 'active': active }, 'product');
  }

}