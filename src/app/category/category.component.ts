import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  category: string;
  subCategories: string[] = [];

  constructor(private route: ActivatedRoute, private listService: ListService) {
    this.category = route.snapshot.params["category"];
    this.listService.listSubCategories(this.category).subscribe(x => {
      this.subCategories = x;
    });
  }
}
