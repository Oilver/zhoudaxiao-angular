import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../service/category.service';
import {ProductService} from '../../../../service/product.service';
import {NzMessageService, NzModalService, UploadXHRArgs} from 'ng-zorro-antd';
import {ProductEntity} from '../../../../common/entity/ProductEntity';
import {FileService} from '../../../../service/file.service';
import {ImageService} from '../../../../service/image.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id;
  data: ProductEntity = new ProductEntity();

  constructor(private productService: ProductService, private modalService: NzModalService, private fileService: FileService, private nzMessageService: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private categoryService: CategoryService, private imageService: ImageService,) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
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
}
