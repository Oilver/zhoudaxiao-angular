import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CategoryService} from '../../../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild('runningAccountIndex', {static: true}) runningAccountIndex: ElementRef;

  isVisible = false;
  isOkLoading = false;

  userRole = 0;

  recordForm: FormGroup;
  recordNumber = 10;
  listOfDisplayData: any;

  constructor(private modalService: NzModalService, private fb: FormBuilder, private categoryService: CategoryService, private nzMessageService: NzMessageService,) {
    this.recordForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.recordNumber = (this.runningAccountIndex.nativeElement.offsetHeight - 70.19 - 10 - 45) / 46 - 1;
    this.initData();
  }

  initData() {
    this.categoryService.queryAll().subscribe(result => {
      this.listOfDisplayData = result.data;
    });
  }

  modalTitle = '';
  operation = '';

  showModal(operation, item?): void {
    this.isVisible = true;
    this.operation = operation;
    if (this.operation == 'add') {
      this.modalTitle = '添加类别';
      this.resetForm();
    } else if (this.operation == 'update') {
      this.modalTitle = '更改类别';
      this.recordForm.get('id').setValue(item.id);
      this.recordForm.get('name').setValue(item.name);
      this.recordForm.get('priority').setValue(item.priority);
    }
  }

  handleOk(): void {
    for (const key in this.recordForm.controls) {
      this.recordForm.controls[key].markAsDirty();
      this.recordForm.controls[key].updateValueAndValidity();
    }

    this.isOkLoading = true;
    if (this.operation == 'add') {
      this.categoryService.add(this.recordForm.value).subscribe(result => {
        this.handleCancel();
        this.isOkLoading = false;
        if (result.status == 100) {
          this.nzMessageService.success('添加成功');
          this.initData();
        }
      });
    } else if (this.operation == 'update') {
      this.categoryService.update(this.recordForm.value).subscribe(result => {
        this.handleCancel();
        this.isOkLoading = false;
        if (result.status == 100) {
          this.nzMessageService.success('更改成功');
          this.initData();
        }
      });
    }
  }

  handleCancel(): void {
    this.resetForm();
    this.isVisible = false;
  }

  resetForm(): void {
    this.recordForm.reset();
    this.recordForm.get('name').setValue('');
    this.recordForm.get('priority').setValue('');
  }

  showDeleteConfirm(id): void {
    this.modalService.warning({
      nzTitle: '<p>您确定将该类别删除吗？</p>',
      nzOnOk: () => this.pass(id),
      nzOkText: '确定',
      nzCancelText: '取消'
    });
  }

  pass(id) {
    this.categoryService.delete(id).subscribe(result => {
      if (result.status == 100) {
        this.initData();
      }
    });
  }
}
