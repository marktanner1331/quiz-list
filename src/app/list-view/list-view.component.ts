import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  category: string;
  subCategory: string;
  listName: string;
  config: { [key: string]: "show"|"hide"|"remove" }

  keys: string[];

  numAlreadySeen: number = 0;
  total: number = 0;
  items: Object[] = [];

  private nextCallback = () => this.next();

  constructor(private listService: ListService, private route: ActivatedRoute) {
    this.category = route.snapshot.params["category"];
    this.subCategory = route.snapshot.params["sub_category"];
    this.listName = route.snapshot.params["list_name"];

    let orderBy: string = route.snapshot.queryParams["orderby"];
    let orderType: "ascending"|"descending" = route.snapshot.queryParams["ordertype"];

    let config: string = route.snapshot.queryParams["config"];
    let split: string[] = config.split("&");

    this.config = {};
    for(let item of split) {
      let splitItem = item.split("=");
      this.config[splitItem[0]] = splitItem[1] as any;
    }

    let showAll = true;
    this.keys = [];
    for(let key in this.config) {
      if(this.config[key] == "hide") {
        this.keys.push(key);
        showAll = false;
      } else if (this.config[key] == "show") {
        this.keys.push(key);
      }
    }

    listService.get(this.category, this.subCategory, this.listName)
      .subscribe(x => {
        this.items = x.get(orderBy, orderType);
        this.total = x.count();
        if(showAll) {
          this.numAlreadySeen = this.total;
        } else {
          this.numAlreadySeen = 0;
        }
      });
  }

  ngOnInit(): void {
    document.body.addEventListener('click', this.nextCallback); 
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.nextCallback);
  }

  next() {
    if(this.numAlreadySeen < this.total) {
      this.numAlreadySeen++;
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight;
      }, 50);
    }
  }

  getCurrent(): Object {
    return this.items[this.numAlreadySeen];
  }

  getSeenItems(): Object[] {
    if(!this.items) {
      return [];
    }

    return this.items.slice(0, this.numAlreadySeen);
  }

  getProperty(obj: Object, key: string): any {
    return (obj as any)[key];
  }
}
