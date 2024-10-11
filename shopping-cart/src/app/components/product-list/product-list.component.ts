import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/service/product-service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  searchTerm = '';
 
  constructor(private productService: ProductServiceService) {}
 
  ngOnInit(): void {
      this.loadProducts();
  }
 
  loadProducts() {
      this.productService.getProducts().subscribe(data => {
          console.log(data,'data')
          this.products = data;
      });
  }
 
  addToCart(product: any) {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      const foundItem = cartItems.find((item:any) => item.id === product.id);
      if (foundItem) {
          foundItem.quantity++;
      } else {
          product.quantity = 1;
          cartItems.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
  }
 }