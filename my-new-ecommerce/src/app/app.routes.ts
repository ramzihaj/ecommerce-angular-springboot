import { Routes } from '@angular/router';
import { HomeComponent } from './module/feture/components/home/home.component';
import { Products } from './module/feture/components/products/products';
import { Cart } from './module/feture/components/cart/cart';
import { ProductDetails } from './module/feture/components/product-details/product-details';
import { Checkout } from './module/feture/components/checkout/checkout';
import { Payment } from './module/feture/components/payment/payment';
import { PaymentSuccess } from './module/feture/components/payment-success/payment-success';
import { Order } from './module/feture/components/order/order';
import { OrderDetails } from './module/feture/components/order-details/order-details';
import { AdminRoutingModule } from './module/admin/admin-routing-module';


export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: Cart },
  { path: "product-details/:id", component: ProductDetails },
  { path: "checkout", component: Checkout },
  { path: "checkout/payment/:id", component: Payment },
  { path: "payment-success", component: PaymentSuccess },
  { path: "account/orders", component: Order },
  { path: "order/:id", component: OrderDetails },
  { path: ':lavelOne/:lavelTwo/:lavelThree', component: Products },
  {path:"admin", loadChildren:()=>import("./module/admin/admin-routing-module").then(m=>AdminRoutingModule) }

];
