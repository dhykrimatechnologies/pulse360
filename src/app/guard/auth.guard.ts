import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';  // For dependency injection in functional guards
import { AuthService } from '../services/auth.service';  // Your AuthService
import { Router } from '@angular/router';  // Router to redirect if not authenticated

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject AuthService
  const router = inject(Router);  // Inject Router to navigate

  // Check if the user is logged in (e.g., check if a user object exists)
  const user = authService.getUser();  // Assuming you have a getUser method in AuthService

  if (user) {
    return true;  // Allow navigation if the user is logged in
  } else {
    router.navigate(['/login']);  // Redirect to login page if not logged in
    return false;  // Prevent navigation to the route
  }

};
