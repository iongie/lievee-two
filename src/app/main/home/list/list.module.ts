import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule, AlertModule } from 'ngx-bootstrap';
import { WebcamModule } from 'ngx-webcam';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  }
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    WebcamModule,
    AlertModule.forRoot()
  ]
})
export class ListModule { }
