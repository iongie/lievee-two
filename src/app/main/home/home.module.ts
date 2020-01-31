import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule, AlertModule } from 'ngx-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { PhoneMaskDirective } from '../../directive/phone-mask.directive';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Visitor'
    },
    component: HomeComponent,
    // children: [
    //   {
    //     path: '',
    //     data: {
    //       title: 'All'
    //     },
    //     component: HomeComponent,
    //   }
    // ]
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
  ],
})
export class HomeModule { }
