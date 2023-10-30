import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ListConfigComponent } from './list-config/list-config.component';
import { ListViewComponent } from './list-view/list-view.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'sub_category/:category/:sub_category', component: SubCategoryComponent },
  { path: 'list_view/:category/:sub_category/:list_name', component: ListViewComponent },
  { path: 'list_config/:category/:sub_category/:list_name', component: ListConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
