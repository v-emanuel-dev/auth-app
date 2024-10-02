import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the application
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {} // Injecting the Router service

  canActivate(): boolean {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Allow access if token is present
    }

    // If no token, navigate to the login page
    this.router.navigate(['/login']);
    return false; // Deny access
  }
}
