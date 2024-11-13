import { BehaviorSubject, Observable } from "rxjs";
import { Products } from "../models/products";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProductsStore {
    private productDB: BehaviorSubject<Products> = new BehaviorSubject<Products>(new Products());

    //Recoge todos los cambios que ocurran en la Base de Datos en la tabla products
    getProductDB():Observable<Products>{
        return this.productDB.asObservable();
    }

    //Actualiza el valor de 'productDB' con un nuevo objeto 'Products'
    setProductDB(product: Products) {
        this.productDB.next(product);
    }

    //Establece el valor almacenado en 'productDB' como una nueva instancia vacía de 'Products'
    clearPRoductDB(){
        this.productDB.next(new Products());
    }
}