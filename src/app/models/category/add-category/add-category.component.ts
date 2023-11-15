import { CategoryService } from './../services/category.service';
import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../data-models/add-category-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;

  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.model = {
      name: '',
      url: '',
    };
  }


  onFormSubmit(): void{
    this.addCategorySubscription =  this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
        console.log('adding category was successful');
        this.navigateToCategories();

      },
      error: (error) => {
        console.log('adding category was unsuccessful');
      }
    });
  }

 

  navigateToCategories(){
    this.router.navigateByUrl('/admin/categories');
  }

    ngOnDestroy(): void {
      this.addCategorySubscription?.unsubscribe();
    }
     
}
