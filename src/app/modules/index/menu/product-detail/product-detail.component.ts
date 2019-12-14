import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../service/product.service';
import {NzMessageService, NzModalService, UploadXHRArgs} from 'ng-zorro-antd';
import {ProductEntity} from '../../../../common/entity/ProductEntity';
import {FileService} from '../../../../service/file.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id;
  categoryId;
  fromType;
  data: ProductEntity = new ProductEntity();

  constructor(private productService: ProductService, private modalService: NzModalService, private fileService: FileService,
              private nzMessageService: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.categoryId = params.categoryId;
      this.fromType = params.fromType;
    });
    this.initData();
  }

  initData() {
    this.productService.query(this.id).subscribe(result => {
      if (result.status == 100) {
        this.data = result.data;
      }
    });
  }

  previewImage: string | undefined = '';
  previewVisible = false;

  /**
   * 图片预览
   * @param file
   */
  handlePreview(item) {
    this.previewImage = item.url;
    this.previewVisible = true;
  };

  navProductList() {
    this.router.navigate(['index/menu/productList'], {
      queryParams: {
        categoryId: this.categoryId,
      }
    });
  }

  navRecommendList() {
    this.router.navigateByUrl('index/menu/recommend');
  }
}
