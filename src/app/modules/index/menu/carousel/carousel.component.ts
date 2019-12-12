import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {ImageService} from '../../../../service/image.service';
import {environment} from '../../../../../environments/environment';
import {Observable, Observer} from 'rxjs';
import {FileService} from '../../../../service/file.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild('runningAccountIndex', {static: true}) runningAccountIndex: ElementRef;

  isVisible = false;
  isOkLoading = false;

  userRole = 0;

  recordForm: FormGroup;
  recordNumber = 10;
  listOfDisplayData = [];
  uploadUrl = environment.url + '/image/uploadCarousels';

  constructor(private modalService: NzModalService, private fb: FormBuilder, private imageService: ImageService, private nzMessageService: NzMessageService,
              private fileService: FileService) {
    this.recordForm = this.fb.group({
      id: [''],
      priority: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.imageService.queryCarousels().subscribe(result => {
      this.listOfDisplayData = result.data;
    });
  }

  showModal(item): void {
    this.isVisible = true;
    this.recordForm.get('id').setValue(item.id);
    this.recordForm.get('priority').setValue(item.priority);
  }

  handleOk(): void {
    for (const key in this.recordForm.controls) {
      this.recordForm.controls[key].markAsDirty();
      this.recordForm.controls[key].updateValueAndValidity();
    }

    this.isOkLoading = true;
    this.imageService.updateCarousels(this.recordForm.value).subscribe(result => {
      this.handleCancel();
      this.isOkLoading = false;
      if (result.status == 100) {
        this.nzMessageService.success('更改优先级成功');
        this.initData();
      }
    });
  }

  handleCancel(): void {
    this.resetForm();
    this.isVisible = false;
  }

  resetForm(): void {
    this.recordForm.reset();
    this.recordForm.get('priority').setValue('');
  }

  showDeleteConfirm(id): void {
    this.modalService.warning({
      nzTitle: '<p>您确定将该轮播图删除吗？</p>',
      nzOnOk: () => this.pass(id),
      nzOkText: '确定',
      nzCancelText: '取消'
    });
  }

  pass(id) {
    this.imageService.deleteCarousels(id).subscribe(result => {
      if (result.status == 100) {
        this.initData();
      }
    });
  }

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

  customReq = (item: UploadXHRArgs) => {
    let formData: FormData = new FormData();
    formData.append('file', item.file as any);
    this.fileService.fileUpload(item.action, formData).subscribe(result => {
      if (result.status == 100) {
        this.nzMessageService.success('添加成功');
        this.initData();
      }
    });
  };
}
