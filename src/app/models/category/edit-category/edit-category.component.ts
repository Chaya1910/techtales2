import { UpdateCategoryRequest } from './../data-models/update-category-request.model';
import { CategoryService } from './../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryResponse } from '../data-models/get-category-response.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  category?: CategoryResponse;

  paramSubscription?: Subscription;
  updateCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onFormSubmit(): void {
    console.log(this.category);
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      url: this.category?.url ?? '',
    };

    if (this.id) {
      this.updateCategorySubscription = this.categoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({ next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        } });
    }
  }

  onDelete(): void{
    if(this.id){
      this.deleteCategorySubscription =  this.categoryService.deleteCategory(this.id).subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/admin/categories');
        }
      })
    } 
  }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
  }
}
