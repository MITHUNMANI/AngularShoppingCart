import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './service/service/product-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-cart';
  cartCount:number = 0;
  currentYear:number = new Date().getFullYear();
  constructor(private productService:ProductServiceService){}
  ngOnInit(): void {
      this.productService.cartCount.subscribe((count:any) =>{
        this.cartCount = count;
      })
    
      const storedCart = localStorage.getItem('cart');
      if(storedCart){
        const cartItems = JSON.parse(storedCart);
        this.cartCount = cartItems.reduce((total:number,item:any)=>{
          total + item.quantity, 0
        })
      }
  }
}
