import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductTableComponent} from '../product-table/product-table.component';
import {NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-hot',
  templateUrl: './product-hot.component.html',
  styleUrls: ['./product-hot.component.scss']
})
export class ProductHotComponent implements OnInit {
  @ViewChild('runningAccountIndex', {static: true}) runningAccountIndex: ElementRef;
  @ViewChild('productTable', {static: true}) productTable: ProductTableComponent;
  recordNumber = 10;

  constructor(private modalService: NzModalService, private router: Router) {
  }

  ngOnInit() {
    this.recordNumber = (this.runningAccountIndex.nativeElement.offsetHeight - 56 - 10 - 46) / 57 - 1;
    this.productTable.queryProductRecommend();
  }

  operateProduct(type, id?, isNew?) {
    this.router.navigate(['index/menu/operate'], {
      queryParams: {
        type: type,
        id: id == null ? '' : id,
        isNew: isNew == null ? '' : isNew
      }
    });
  }
}
