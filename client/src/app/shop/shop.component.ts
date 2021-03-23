import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  productType: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

   // tslint:disable-next-line: typedef
   getBrands() {
      this.shopService.getBrands().subscribe(response => {
        this.brands = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });

    }

    // tslint:disable-next-line: typedef
    getTypes(){
      this.shopService.getTypes().subscribe(response => {
        this.productType = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });
    }

    // tslint:disable-next-line: typedef
    onBrandsSelected(brandId: number){
      this.shopParams.brandId = brandId;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onTypeSelected(typeId: number){
      this.shopParams.typeId = typeId;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onSortSelected(sort: string){
      this.shopParams.sort = sort;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onPageChanged(event: any) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onSearch(){
      this.shopParams.search = this.searchTerm.nativeElement.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onReset(){
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
    }

}
