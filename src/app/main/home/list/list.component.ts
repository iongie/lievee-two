import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TesterService } from '../../../services/tester/tester.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  searchText;
  visitor: any = [];
  itemData: any = [];
  page;
  addPage;
  loadMoreButton = false;
  private subs: Subject<void> = new Subject();
  constructor(
    private testerServ: TesterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.get();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  get() {
    this.testerServ.read()
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.itemData= res;
      this.page = 15;
      this.visitor = this.itemData.slice(0, this.page);
      this.buttonLoadMore(this.visitor, this.itemData, this.page);
    })
  }

  loadMore() {
    let visitorLenght = this.visitor.length;
    this.addPage = 3;
    this.page = visitorLenght+this.addPage;
    this.visitor = this.itemData.slice(0, this.page);
    Promise.all(this.visitor).then(result => {
      console.log('result', result);
      
    })
    console.log('page', this.page);
    console.log('visitor.length', this.visitor.length);
    console.log('itemData.length', this.itemData.length);
   
    
    // this.buttonLoadMore(this.visitor, this.itemData, this.page);
    
  }

  buttonLoadMore(visitor, itemData, page){
    console.log('page', page);
    console.log('visitor.length', visitor.length);
    console.log('itemData.length', itemData.length);
    if(visitor.length = page){
      this.loadMoreButton = true;
    } else if(visitor.length < page){
      this.loadMoreButton = false;
    } else {
      this.loadMoreButton = false;
    }
  }

}
