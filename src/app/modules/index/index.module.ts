import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexRoutingModule} from './index-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {RecordTypePipe} from '../../pipe/record-type.pipe';
import {PersonListComponent} from './menu/person-list/person-list.component';
import {CategoryComponent} from './menu/category/category.component';
import {CarouselComponent} from './menu/carousel/carousel.component';
import {ProductListComponent} from './menu/product-list/product-list.component';
import {ProductRecommendComponent} from './menu/product-recommend/product-recommend.component';
import {ProductOperateComponent} from './menu/product-operate/product-operate.component';
import {ProductDetailComponent} from './menu/product-detail/product-detail.component';
import {ProductTableComponent} from './menu/product-table/product-table.component';


@NgModule({
  declarations: [MenuComponent, RecordTypePipe, PersonListComponent, CategoryComponent, CarouselComponent, ProductListComponent, ProductRecommendComponent, ProductOperateComponent, ProductDetailComponent, ProductTableComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IndexModule {
}
