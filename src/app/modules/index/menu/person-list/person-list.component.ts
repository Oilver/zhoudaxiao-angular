import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../../../service/person.service';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
  @ViewChild('personListIndex', {static: true}) personListIndex: ElementRef;

  personList = [];
  unPassList = [];
  role = 0;
  id = 0;
  recordNumber = 10;

  constructor(private personService: PersonService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.recordNumber = (this.personListIndex.nativeElement.offsetHeight - 70.19 - 10 - 45) / 46 - 1;
    this.personService.queryCurrentPerson({}).subscribe(result => {
      this.role = result.data.role;
      this.id = result.data.id;
    });
    this.initData();
  }

  initData() {
    this.personService.queryPersonList({}).subscribe(result => {
      if (result.status == 100) {
        this.personList = result.data.personList;
        this.unPassList = result.data.unPassList;
      }
    });
  }

  pass(id, status) {
    if (status == 1) {
      let params = {id: id, status: 1};
      this.personService.updatePerson(params).subscribe(result => {
        if (result.status == 100) {
          this.initData();
        }
      });
    } else if (status == 0) {
      this.personService.delete(id).subscribe(result => {
        if (result.status == 100) {
          this.initData();
        }
      });
    }
  }

  showPassConfirm(id): void {
    this.modalService.confirm({
      nzTitle: '<p>您确定添加该用户为管理员吗？</p>',
      nzOnOk: () => this.pass(id, 1),
      nzOkText: '确定',
      nzCancelText: '取消'
    });
  }

  showDeleteConfirm(id): void {
    this.modalService.warning({
      nzTitle: '<p>您确定将该用户删除吗？</p>',
      nzOnOk: () => this.pass(id, 0),
      nzOkText: '确定',
      nzCancelText: '取消'
    });
  }
}
