import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log("Access Token:", this.authService.token);  // Log the current token
    console.log("Is Authenticated:", this.authService.isAuthenticated);  // Check the authentication status
  
   
      if (this.authService.isAuthenticated) {
        return true;
      } else {
        console.log("Not authenticated, redirecting to login.");
        this.router.navigate(['/auth-page']);
        return false;
      }
   
  
    }
}
