import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { User, ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://reqres.in/api';

  // Mock data for fallback
  private readonly MOCK_USERS: User[] = [
    {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg'
    },
    {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg'
    },
    {
      id: 3,
      email: 'emma.wong@reqres.in',
      first_name: 'Emma',
      last_name: 'Wong',
      avatar: 'https://reqres.in/img/faces/3-image.jpg'
    },
    {
      id: 4,
      email: 'eve.holt@reqres.in',
      first_name: 'Eve',
      last_name: 'Holt',
      avatar: 'https://reqres.in/img/faces/4-image.jpg'
    },
    {
      id: 5,
      email: 'charles.morris@reqres.in',
      first_name: 'Charles',
      last_name: 'Morris',
      avatar: 'https://reqres.in/img/faces/5-image.jpg'
    },
    {
      id: 6,
      email: 'tracey.ramos@reqres.in',
      first_name: 'Tracey',
      last_name: 'Ramos',
      avatar: 'https://reqres.in/img/faces/6-image.jpg'
    }
  ];

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.API_URL}/users?page=${page}`)
      .pipe(
        catchError((error) => {
          return this.getMockUsers(page);
        })
      );
  }

  private getMockUsers(page: number): Observable<ApiResponse<User[]>> {
    const mockResponse: ApiResponse<User[]> = {
      data: this.MOCK_USERS,
      page: page,
      per_page: 6,
      total: 12,
      total_pages: 2
    };
    
    return of(mockResponse).pipe(
      delay(800) // Simulate network delay
    );
  }
}