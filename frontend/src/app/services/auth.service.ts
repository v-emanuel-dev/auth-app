import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Import the Router for navigation

@Injectable({
  providedIn: 'root' // This service is provided at the root level, making it available throughout the application
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // Base URL for the authentication API

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient for making HTTP requests and Router for navigation

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }); // Sends a POST request to the login endpoint with email and password
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage to log out the user
    this.router.navigate(['/login'], { queryParams: { message: 'You have been successfully disconnected.' }}); // Redirect to login page with a message
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null; // Returns true if the token exists, indicating the user is logged in
  }

  // Method to register a new user
  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { email, username, password }); // Sends a POST request to the register endpoint
  }
}
