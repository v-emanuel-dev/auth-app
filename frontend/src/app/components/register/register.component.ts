// src/app/components/register/register.component.ts
import { Component } from '@angular/core'; // Importing Component decorator
import { NgForm } from '@angular/forms'; // Importing NgForm for form handling
import { AuthService } from '../../services/auth.service'; // Importing AuthService for authentication

@Component({
  selector: 'app-register', // Selector for the component
  templateUrl: './register.component.html', // Path to the component's template
})
export class RegisterComponent {
  // Properties to hold user input
  email: string = ''; // User's email
  username: string = ''; // User's username
  password: string = ''; // User's password
  confirmPassword: string = ''; // User's password confirmation
  message: string = ''; // Message to display to the user
  success: boolean = false; // Flag to indicate success or failure

  constructor(private authService: AuthService) {} // Injecting AuthService for registration

  // Method to handle registration
  register(form: NgForm) {
    // Check if the form is valid
    if (form.invalid) {
      this.message = 'Please fill in all fields correctly.'; // Error message for invalid form
      this.success = false; // Set success to false
      return; // Exit the method if the form is invalid
    }

    // Call the register method from AuthService
    this.authService.register(this.email, this.username, this.password).subscribe(
      response => {
        this.message = 'Registration successful! Please log in.'; // Success message
        this.success = true; // Set success to true
        form.reset(); // Reset the form after successful registration
      },
      error => {
        this.message = 'Registration failed. Please try again.'; // Error message on failure
        this.success = false; // Set success to false
      }
    );
  }
}
