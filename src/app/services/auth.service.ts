import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, delay, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'https://reqres.in/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  // Mock credentials for demo
  private readonly VALID_CREDENTIALS = [
    { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    { email: 'admin@test.com', password: 'admin123' },
    { email: 'user@test.com', password: 'user123' }
  ];

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<boolean> {
    // Try real API first, fallback to mock if CORS fails
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        map(response => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.isAuthenticatedSubject.next(true);
          return true;
        }),
        catchError((error) => {
          return this.mockLogin(credentials);
        })
      );
  }

  private mockLogin(credentials: LoginRequest): Observable<boolean> {
    return of(null).pipe(
      delay(1000), // Simulate network delay
      map(() => {
        const isValid = this.VALID_CREDENTIALS.some(
          cred => cred.email === credentials.email && cred.password === credentials.password
        );
        
        if (isValid) {
          const mockToken = 'mock-jwt-token-' + Date.now();
          localStorage.setItem(this.TOKEN_KEY, mockToken);
          this.isAuthenticatedSubject.next(true);
          return true;
        }
        
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}