import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './models/category/category-list/category-list.component';
import { AddCategoryComponent } from './models/category/add-category/add-category.component';
import { EditCategoryComponent } from './models/category/edit-category/edit-category.component';
import { BlogListComponent } from './models/blog/blog-list/blog-list.component';
import { AddBlogComponent } from './models/blog/add-blog/add-blog.component';

const routes: Routes = [{
  path: "admin/categories",
  component: CategoryListComponent
},
{
  path: "admin/categories/add",
  component: AddCategoryComponent,
},
{
  path: 'admin/categories/:id',
  component: EditCategoryComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
