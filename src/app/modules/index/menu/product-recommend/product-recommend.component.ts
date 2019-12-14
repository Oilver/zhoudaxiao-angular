import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {ProductTableComponent} from '../product-table/product-table.component';
import {FromTypeEnum} from '../../../../common/enum/FromTypeEnum';

@Component({
  selector: 'app-product-recommend',
  templateUrl: './product-recommend.component.html',
  styleUrls: ['./product-recommend.component.scss']
})
export class ProductRecommendComponent implements OnInit {
  @ViewChild('runningAccountIndex', {static: true}) runningAccountIndex: ElementRef;
  @ViewChild('productTable', {static: true}) productTable: ProductTableComponent;
  fromType = FromTypeEnum.recommend;
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
        isNew: isNew == null ? '' : isNew,
        fromType: FromTypeEnum.recommend
      }
    });
  }
}
