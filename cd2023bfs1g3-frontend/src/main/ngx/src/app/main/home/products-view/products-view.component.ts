import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { imageDefaulProdut } from 'src/app/utils/constants';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ReserveDialogComponent } from './reserve-dialog/reserve-dialog.component';
import { DialogService, OTranslateService } from 'ontimize-web-ngx';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  /**
   * Producto ha reservar
   */
  product: Products = new Products();
  /**
   * Recoge los datos del formulario de reserva
   */
  contentView: FormGroup = new FormGroup({});
  /**
   * Identificador del producto a reservar
   */
  id: number;
  /**
   * Ruta de la imagen del producto
   */
  imagePath: SafeResourceUrl = "data:image/png;base64," + imageDefaulProdut
  /**
   * Constructor recive 6 parámetros
   * 
   * @param productService 
   * @param actRoute 
   * @param _sanitizer 
   * @param router 
   * @param dialog 
   * @param dialogService 
   */
  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private router: Router,
    public dialog: MatDialog,
    protected dialogService: DialogService
  ) { }

  ngOnInit() {
    // Recoge el parámetro id 
    this.actRoute.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
    });

    // Recoge el producto por id
    this.productService.getById(this.id).subscribe(res => {

      if (res.code === 0) {
        this.product = res.data[0]
        
        this.imagePath = (this.product.photo === undefined) || (this.product.photo === null)
          ? this.imagePath
          : this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + this.product.photo);
      }
    }, err => console.log(err));
  }
  /**
   * Método que llama a la ventana de reserva 
   * 
   * @param value 
   */
  reserve(value: string) {
    let totalImport: number = Number(this.product.price) * Number(value);
    let totalImportDecimal: number = Number(totalImport.toFixed(2));
    
    //  1. Dialogo de confirmacion de reserva, insert reserva y update de stock
    const dialogRef = this.dialog.open(ReserveDialogComponent, 
      { data: { product: this.product, units: value, totalImport: totalImportDecimal } 
    });

    // 2. OK -> Dialog de confirmacion de reserva OK
    dialogRef.afterClosed().subscribe((data) => {
      if(data !== "" && data){
        this.dialogService.info("summary", data);
        //Retardo para actualizar datos y que salgan correctamente actualizados
        setTimeout(() => {
          this.turnback();
        }, 1500);
      } 
    });
  }

  turnback() {
    this.router.navigate(['../../', 'home'], { relativeTo: this.actRoute });
  }
}
