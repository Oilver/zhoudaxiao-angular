import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer, Subscription} from 'rxjs';
import {CategoryService} from '../../../../service/category.service';
import {ProductService} from '../../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService, NzModalService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {environment} from '../../../../../environments/environment';
import {FileService} from '../../../../service/file.service';
import {ImageTypeEnum} from '../../../../common/enum/ImageTypeEnum';
import {ImageService} from '../../../../service/image.service';

@Component({
  selector: 'app-product-operate',
  templateUrl: './product-operate.component.html',
  styleUrls: ['./product-operate.component.scss']
})
export class ProductOperateComponent implements OnInit {

  validateForm: FormGroup;
  categoryList = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private categoryService: CategoryService, private productService: ProductService,
              private nzMessageService: NzMessageService, private fileService: FileService, private modalService: NzModalService, private imageService: ImageService) {
    this.validateForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required], [this.nameAsyncValidator]],
      categoryId: [null, [Validators.required]],
      isNew: ['0', [Validators.required]],//是否今日推荐
      agentPrice: ['', [Validators.required]], //代理价
      originalPrice: ['', [Validators.required]], //原价
      discountPrice: ['', [Validators.required]], //折后价
      priority: ['',], //优先级
      freight: [''],//运费
      stock: [''],//库存
      introduction: [''],
      detail: [''],
      keys: []
    });
  }

  id = '';
  type = '';
  name = '';
  isNew = '';
  imageEntityList = [];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.type = params.type;
      this.isNew = params.isNew;
    });
    this.initData();
  }

  initData() {
    //先初始化类别
    this.categoryService.queryAll().subscribe(result => {
      if (result.status == 100) {
        this.categoryList = result.data;
        //从今日推荐页面进来的
        if (this.isNew != null && this.isNew != '') {
          this.validateForm.get('isNew').setValue(this.isNew);
        }
        if (this.type == 'update' && this.id != '') {
          this.productService.query(this.id).subscribe(result => {
            this.name = result.data.name;
            this.imageEntityList = result.data.imageEntityList;
            this.initProductIfUpdate(result.data);
          });
        }
      }
    });
  }

  initProductIfUpdate(data) {
    this.validateForm.get('id').setValue(data.id);
    this.validateForm.get('name').setValue(data.name);
    this.validateForm.get('categoryId').setValue(data.categoryId + '');
    this.validateForm.get('isNew').setValue(data.isNew + '');
    this.validateForm.get('agentPrice').setValue(data.agentPrice);
    this.validateForm.get('originalPrice').setValue(data.originalPrice);
    this.validateForm.get('discountPrice').setValue(data.discountPrice);
    this.validateForm.get('priority').setValue(data.priority);
    this.validateForm.get('freight').setValue(data.freight);
    this.validateForm.get('stock').setValue(data.stock);
    this.validateForm.get('introduction').setValue(data.introduction);
    this.validateForm.get('detail').setValue(data.detail);
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  submitForm(): void {
    //新增商品
    if (this.type == 'add') {
      if (this.fileKeys.length == 0) {
        this.nzMessageService.error('至少需要添加一张图片');
        return;
      }
      //图片的keys
      this.validateForm.controls['keys'].setValue(this.fileKeys);
      this.productService.add(this.validateForm.value).subscribe(result => {
        if (result.status == 100) {
          this.nzMessageService.success('商品添加成功');
          this.router.navigateByUrl('/index/menu/productList');
        }
      });
    } else if (this.type == 'update') { //更新商品
      this.productService.update(this.validateForm.value).subscribe(result => {
        if (result.status == 100) {
          this.nzMessageService.success('商品更新成功');
          this.router.navigateByUrl('/index/menu/productList');
        }
      });
    }
  }

  timeout: any;
  request: Subscription;
  nameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      clearTimeout(this.timeout);
      //断开请求
      if (this.request != undefined) {
        this.request.unsubscribe();
      }
      this.timeout = setTimeout(() => {
        if (this.name == control.value) {
          observer.next(null);
          observer.complete();
        }

        this.request = this.productService.checkIsExist(control.value).subscribe(result => {
          if (result.data == true) {
            // you have to return `{error: true}` to mark it as an error event
            observer.next({error: true, duplicated: true});
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      }, 2000);
    });

  //图片处理
  uploadUrl = environment.url + '/image/uploadImage?imageType=' + ImageTypeEnum.Product;
  showUploadList = {
    showPreviewIcon: true,  //预览功能
    showRemoveIcon: true,  //删除按钮
    hidePreviewIconInNonImage: true
  };
  fileKeys = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  /**
   * 图片预览
   * @param file
   */
  handlePreview = (file) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  /**
   * 上传文件
   * @param item
   */
  upLoadChange(event) {
    if (event == null || event.file == null) {
      return;
    }
    let datas = event.file.response && event.file.response.data;
    if (datas) {
      if (event.type == 'success') {
        this.fileKeys.push(datas.key);
      } else if (event.type == 'removed') {
        this.fileKeys = this.fileKeys.filter(item => item != datas.key);
      }
    }
  }

  /**
   * 图片上传前的验证
   * @param file
   */
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const format = file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/svg' || file.type == 'image/webp';
      if (!format) {
        this.nzMessageService.error('文件格式有误');
        observer.complete();
        return;
      }
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.nzMessageService.error('图片不能大于1MB');
        observer.complete();
        return;
      }
      observer.next(format && isLt1M);
      observer.complete();
    });
  };

  //更新时的url和功能
  uploadUrl2 = environment.url + '/image/uploadProductImage';
  customReq = (item: UploadXHRArgs) => {
    let formData: FormData = new FormData();
    formData.append('file', item.file as any);
    formData.append('productId', this.id);
    this.fileService.fileUpload(item.action, formData).subscribe(result => {
      if (result.status == 100) {
        this.nzMessageService.success('添加成功');
        this.productService.query(this.id).subscribe(result => {
          this.imageEntityList = result.data.imageEntityList;
        });
      }
    });
  };

  showDeleteConfirm(item): void {
    this.modalService.warning({
      nzTitle: '<p>确定删除此图片吗？</p>',
      nzOnOk: () => {
        this.imageService.deleteImage(item.id).subscribe(result => {
          if (result.status == 100) {
            this.productService.query(this.id).subscribe(result => {
              this.imageEntityList = result.data.imageEntityList;
            });
          }
        });
      },
      nzOkText: '确定',
      nzCancelText: '取消'
    });
  }
}
