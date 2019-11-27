import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {NzModalService} from 'ng-zorro-antd';
import {environment} from '../../../../environments/environment';
import {IndexService} from '../../../service/index.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isCollapsed = false;

  username: string = '';
  navStatus = '';
  urls: { [index: string]: string } = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private userService: UserService, private indexService: IndexService,
              private modalService: NzModalService,
              @Inject(DOCUMENT) document: any) {
    //设置url
    this.urls['categoryUrl'] = '/index/menu/category';
    this.urls['userListUrl'] = '/index/menu/userList';
    this.urls['carouselUrl'] = '/index/menu/carousel';
    this.urls['productListUrl'] = '/index/menu/productList';
    this.urls['recommendUrl'] = '/index/menu/recommend';
    this.urls['hotUrl'] = '/index/menu/hot';
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(() => this.setNavType(document.location.href));
    this.userService.queryCurrentUser(null).subscribe(result => {
      this.username = result.data.username;
    });
  }

  hasNavType = false;

  setNavType(url) {
    this.hasNavType = false;
    for (let urlsKey in this.urls) {
      if (url.indexOf(this.urls[urlsKey]) != -1) {
        this.navStatus = this.urls[urlsKey];
        this.hasNavType = true;
        break;
      }
    }
    if (this.hasNavType) {
      return;
    } else {
      this.navStatus = '';
    }
  }

  nav(url) {
    this.router.navigateByUrl(url);
  }

  showLogoutConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<p>您确定退出登录吗？</p>',
      nzOnOk: () => this.logout(),
      nzOkText: '确定',
      nzCancelText: '取消'
    });
  }

  logout() {
    this.indexService.logout().subscribe(result => {
      if (result.status == 100) {
        localStorage.removeItem(environment.current_user);
        this.router.navigateByUrl('/check');
      }
    });
  }
}
