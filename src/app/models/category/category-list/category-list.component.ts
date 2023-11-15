import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { CategoryResponse } from '../data-models/get-category-response.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  categories$?: Observable<CategoryResponse[]>;

  private getCategorySubscription?: Subscription;
  private deleteCategorySubscription?: Subscription;


  constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef ){

  }
  
  ngOnInit(): void {
    console.log("ng onit inside category list component called");
    this.categories$ = this.categoryService.getCategories();
  }

  // fetchCategories(){
  //   console.log("fetch categories called");
        
    // this.getCategorySubscription =  this.categoryService.getCategory().subscribe({
    //   next: (response) => {
    //     this.categories = [...response];
    //     this.cdr.detectChanges();
    //     console.log("detect changes called");

    //   },
    //   error: (error) => {
    //     console.log('fetching categories was unsuccessful' + error);
    //   }
    // });

  // }

  onEditHandler(category: CategoryResponse){

  }


  onDeleteHandler(id: string){
    console.log('delete clicked ' + id);
    this.deleteCategorySubscription = this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        console.log('deleted successfully');
        // this.fetchCategories();
      },
      error: (error) => {
        console.log("error occurred during deletion");
      }
    });
  }



}
