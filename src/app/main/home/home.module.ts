import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule, AlertModule } from 'ngx-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { PhoneMaskDirective } from '../../directive/phone-mask.directive';
import { GuardPageGuard } from '../../services/guard-page/guard-page.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Visitor'
    },
    children: [
      {
        path: '',
        data: {
          title: 'Add'
        },
        component: HomeComponent,
      },
      {
        path: 'success-registered',
        data: {
          title: 'Success Registered'
        },
        loadChildren: () => import('../home/thanks/thanks.module').then(m => m.ThanksModule),
      },
      {
        path: 'l1s7d4ta@',
        loadChildren: () => import('../home/list/list.module').then(m => m.ListModule),
        data: {
          title: 'List',
        },
      },
      // {
      //   path: 'list',
      //   loadChildren: () => import('../home/list/list.module').then(m => m.ListModule),
      //   canActivate: [GuardPageGuard],
      //   data: {
      //     title: 'List',
      //     role: ['aaa']
      //   },
      // },
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, PhoneMaskDirective],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    WebcamModule,
    AlertModule.forRoot()
  ]
})
export class HomeModule { }
