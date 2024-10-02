import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component'; // Importing LoginComponent
import { RegisterComponent } from '../app/components/register/register.component'; // Importing RegisterComponent
import { DashboardComponent } from '../app/components/dashboard/dashboard.component'; // Importing DashboardComponent
import { AuthGuard } from '../app/auth/auth.guard'; // Importing AuthGuard to protect routes

// Defining the routes for the application
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if the path is empty
  { path: 'login', component: LoginComponent }, // Route for the login component
  { path: 'register', component: RegisterComponent }, // Route for the register component
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] } // Protecting the dashboard route with AuthGuard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importing RouterModule with the defined routes
  exports: [RouterModule] // Exporting RouterModule to make it available in the application
})
export class AppRoutingModule { }
