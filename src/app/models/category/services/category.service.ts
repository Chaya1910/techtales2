import { UpdateCategoryRequest } from './../data-models/update-category-request.model';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../data-models/add-category-request.model';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryResponse } from '../data-models/get-category-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: any;

  private getCategorySubscription?: Subscription;

  constructor(private http: HttpClient) {}

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7185/api/Category', model);
  }

  getCategories(): Observable<CategoryResponse[]> {
    this.categories = this.http.get<CategoryResponse[]>(
      'https://localhost:7185/api/Category'
    );
    console.log(this.categories);
    return this.categories;
    // return this.http.get<GetCategoryResponse[]>(`https://localhost:7185/api/Category`);
  }

  deleteCategory(id: string): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>('https://localhost:7185/api/Category/' + id);
  }

  getCategoryById(id: string): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>('https://localhost:7185/api/Category/' + id);
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<CategoryResponse>{
    return this.http.put<CategoryResponse>('https://localhost:7185/api/Category/' + id, updateCategoryRequest);
  }

  // http.get('https://localhost:7185/api/Category').subscribe({
  //   next: (response) => {
  //     console.log('this was successful');

  //   },
  //   error: (error) => {
  //     console.log('this was unsuccessful');
  //   }
  // });
}
