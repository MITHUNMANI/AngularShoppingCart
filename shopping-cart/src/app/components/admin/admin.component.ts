import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/service/product-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  newProduct: any = { name: '', price: 0, description: '', image: '' };
  editMode = false;
  editIndex: number | null = null;

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  openAddProductModal() {
    this.newProduct = { name: '', price: 0, description: '', image: '' };
    this.editMode = false; 
    console.log("Open modal for adding product");
  }

  addProduct() {
    if (this.editMode) {
      this.productService.updateProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  editProduct(product: any) {
    this.newProduct = { ...product };
    this.editMode = true;
    this.editIndex = this.products.indexOf(product);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}