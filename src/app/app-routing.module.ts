import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: 'index', loadChildren: () => import('./modules/index/index.module').then(m => m.IndexModule)},
  {path: 'check', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path: '', pathMatch: 'full', redirectTo: 'index'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
