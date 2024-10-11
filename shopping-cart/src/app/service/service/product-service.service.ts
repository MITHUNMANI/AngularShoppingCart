import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'assets/products.json';
  private cartItems: any[] = [];
  public cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addToCart(product: any): void {
    const foundItem = this.cartItems.find(item => item.id === product.id);
    if (foundItem) {
      foundItem.quantity++;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.updateCartCount();
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private updateCartCount(): void {
    const totalCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.next(totalCount);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}