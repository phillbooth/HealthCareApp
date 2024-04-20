import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inject Router

  login() {
    if (this.loginEmail.trim() && this.loginPassword.trim()) {
      this.authService.login(this.loginEmail, this.loginPassword)
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.router.navigate(['/dashboard']); // Redirect to dashboard or another route
          },
          error: (error) => {
            console.error('Login failed:', error);
          }
        });
    } else {
      console.error('Login or password missing!');
    }
  }

  register() {
    if (this.registerName.trim() && this.registerEmail.trim() && this.registerPassword.trim()) {
      this.authService.register(this.registerName, this.registerEmail, this.registerPassword)
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.router.navigate(['/login']); // Redirect to login page or another confirmation page
          },
          error: (error) => {
            console.error('Registration failed:', error);
          }
        });
    } else {
      console.error('All registration fields must be filled!');
    }
  }
}
