import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list-config',
  templateUrl: './list-config.component.html',
  styleUrls: ['./list-config.component.scss']
})
export class ListConfigComponent {
  category: string;
  subCategory: string;
  listName: string;

  keys: KeyConfig[] = [];
  orderBy: string = "";
  orderType: "ascending"|"descending" = "ascending";

  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute) {
    this.category = route.snapshot.params["category"];
    this.subCategory = route.snapshot.params["sub_category"];
    this.listName = route.snapshot.params["list_name"];

    listService.get(this.category, this.subCategory, this.listName)
      .subscribe(x => {
        this.keys = x.keys.map(y => new KeyConfig(y, "show"));
        this.orderBy = x.keys[0];
      });
  }

  changeKeyType(key: string, type: "show"|"hide"|"remove") {
    this.keys.find(x => x.name == key)!.type = type;
    if(this.orderBy == key && type == "remove") {
      let temp = this.getNonRemovedKeys();
      if(temp.length) {
        this.orderBy = temp[0];
      }
    }
  }

  getNonRemovedKeys(): string[] {
    return this.keys
      .filter(x => x.type != "remove")
      .map(x => x.name);
  }

  start() {
    let config = this.keys.map(x => x.name + "=" + x.type).join("&");
    config = encodeURIComponent(config);

    this.router.navigateByUrl(`list_view/${this.category}/${this.subCategory}/${this.listName}?config=${config}&orderby=${this.orderBy}&ordertype=${this.orderType}`);
  }
}

export class KeyConfig {
  constructor(public name: string, public type: "show"|"hide"|"remove") {

  }
}