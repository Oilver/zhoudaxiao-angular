import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {PersonListComponent} from './menu/person-list/person-list.component';
import {CategoryComponent} from './menu/category/category.component';
import {CarouselComponent} from './menu/carousel/carousel.component';
import {ProductRecommendComponent} from './menu/product-recommend/product-recommend.component';
import {ProductListComponent} from './menu/product-list/product-list.component';
import {ProductDetailComponent} from './menu/product-detail/product-detail.component';
import {ProductOperateComponent} from './menu/product-operate/product-operate.component';


const routes: Routes = [
  {
    path: 'menu', component: MenuComponent, children: [
      {path: 'productList', component: ProductListComponent},
      {path: 'recommend', component: ProductRecommendComponent},
      {path: 'personList', component: PersonListComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'carousel', component: CarouselComponent},
      {path: 'operate', component: ProductOperateComponent},
      {path: 'detail', component: ProductDetailComponent},
      {path: '', pathMatch: 'full', redirectTo: 'productList'},
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: 'menu'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
