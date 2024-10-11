import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/service/product-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  newProduct: any = { name: '', price: 0, description: '', image: '', quantity: 1 };
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
    this.newProduct = { name: '', price: 0, description: '', image: '', quantity: 1 };
    this.editMode = false; 
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addProduct() {
    if (this.editMode) {
      this.productService.updateProduct({ ...this.newProduct, id: this.products[this.editIndex!].id }).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  editProduct(product: any) {
    this.newProduct = { ...product };
    this.editMode = true;
    this.editIndex = this.products.indexOf(product);
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show(); // Show modal for editing
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newProduct.image = e.target?.result as string; // Set the image URL to display in the table
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  }

  closeModal() {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide(); // Hide modal
      }
    }
  }
}