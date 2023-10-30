import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {
  category: string;
  subCategory: string;
  listNames: string[] = [];

  constructor(private route: ActivatedRoute, private listService: ListService) {
    this.category = route.snapshot.params["category"];
    this.subCategory = route.snapshot.params["sub_category"];
    this.listService.listListNames(this.category, this.subCategory).subscribe(x => {
      this.listNames = x;
    });
  }
}
