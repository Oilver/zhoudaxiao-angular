import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RecordService} from '../../../../service/record.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CategoryService} from '../../../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductTableComponent} from '../product-table/product-table.component';
import {FromTypeEnum} from '../../../../common/enum/FromTypeEnum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('runningAccountIndex', {static: true}) runningAccountIndex: ElementRef;
  @ViewChild('productTable', {static: true}) productTable: ProductTableComponent;
  categoryId;
  recordNumber = 10;
  fromType = FromTypeEnum.productList;

  constructor(private modalService: NzModalService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private recordService: RecordService, private nzMessageService: NzMessageService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    //根据不同电脑屏幕算出应该展示多少条
    this.recordNumber = (this.runningAccountIndex.nativeElement.offsetHeight - 56 - 10 - 46) / 57 - 1;
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params.categoryId;
    });
    this.initData();
  }

  selectedValue = '';
  categoryName = '';
  categoryList = [];

  initData() {
    //先初始化类别
    this.categoryService.queryAll().subscribe(result => {
      this.categoryList = result.data;
      if (this.categoryId == null) {
        this.selectedValue = this.categoryList[0].id + '';
        this.categoryName = this.categoryList[0].name;
        this.navProductTable(this.categoryList[0].id);
      } else { //存在从别的页面返回的情况
        this.selectedValue = this.categoryId + '';
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryList[i].id == this.categoryId) {
            this.categoryName = this.categoryList[i].name;
            this.navProductTable(this.categoryList[i].id);
            break;
          }
        }
      }
    });
  }

  changeCategory() {
    if (this.selectedValue == null) {
      this.categoryName = '';
    } else {
      this.categoryList.forEach(item => {
        if (this.selectedValue == item.id) {
          this.categoryName = item.name;
        }
      });
      this.navProductTable(Number(this.selectedValue));
    }
  }

  navProductTable(categoryId) {
    this.router.navigate(['index/menu/productList'], {
      queryParams: {
        categoryId: categoryId,
      }
    });
    this.productTable.queryProductByCategoryId(categoryId);
  }

  operateProduct(type, id?) {
    this.router.navigate(['index/menu/operate'], {
      queryParams: {
        type: type,
        id: id == null ? '' : id,
        categoryId: this.categoryId,
        fromType: FromTypeEnum.productList
      }
    });
  }
}
