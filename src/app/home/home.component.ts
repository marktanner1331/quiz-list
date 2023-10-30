import { Component } from '@angular/core';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories: string[] = [];

  constructor(private listService: ListService) {
    listService.listCategories()
      .subscribe(x => {
        this.categories = x
      });
  }
}
