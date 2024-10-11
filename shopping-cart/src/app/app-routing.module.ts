import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path:'', redirectTo:'/products',pathMatch:'full'},
  { path:'products', component: ProductListComponent},
  { path:'cart', component:CartComponent},
  { path:'login', component:LoginComponent},
  { path:'admin', component:AdminComponent},

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
