import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TesterService } from '../../../services/tester/tester.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  random: string;
  constructor(
    private testerServ: TesterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.get();
    if (this.route.snapshot.queryParamMap.get('view') != null) {
      console.log('no null');
      
    }
    const nlog = this.route.snapshot.queryParamMap.get('view');
    console.log(nlog);
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  get() {
    this.testerServ.read()
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      console.log(res);
      this.itemData= res;
      this.page = 15;
      this.visitor = this.itemData.slice(0, this.page);
      this.buttonLoadMore(this.visitor, this.itemData, this.page);
    })
  }

  loadMore() {
    let visitorLenght = this.visitor.length;
    let banding = this.itemData.length-visitorLenght; 
    this.addPage = 3;
    if (banding < this.addPage ) {
      this.page = visitorLenght+banding;
    } else {
      this.page = visitorLenght+this.addPage;
    }
    this.visitor = this.itemData.slice(0, this.page);
    this.buttonLoadMore(this.visitor, this.itemData, this.page);  
  }

  buttonLoadMore(visitor, itemData, page){
    console.log('visitor', visitor.length);
    console.log('itemData', itemData.length);
    console.log('page', page);
    if(visitor.length < page ){
      this.loadMoreButton = false;
    }else if(visitor.length < itemData.length){
      this.loadMoreButton = true;
    } else if(visitor.length = itemData.length){
      this.loadMoreButton = false;
    } else {
      this.loadMoreButton = false;
    }
  }

}
