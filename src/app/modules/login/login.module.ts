import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [LoginComponent, RegistryComponent, IndexComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule {
}
