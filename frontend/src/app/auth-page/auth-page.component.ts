import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
  password_confirmation: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.loginEmail.trim() && this.loginPassword.trim()) {
      this.authService.login(this.loginEmail, this.loginPassword)
        .subscribe({
          next: (response) => {
            
            console.log('Login successful:', response);
            console.log('Trying to redirect');
            this.router.navigate(['/home']);
            console.log('Done redirecting');

          },
          error: (error) => {
            console.error('Login failed:', error.error.message || 'Login failed');
            alert('Login failed: ' + (error.error.message || 'Invalid credentials'));
          }
        });
    } else {
      alert('Login or password missing!');
    }
  }

  register() {
    if (this.registerName.trim() && this.registerEmail.trim() && this.registerPassword.trim() && this.password_confirmation.trim()) {
      this.authService.register(this.registerName, this.registerEmail, this.registerPassword, this.password_confirmation)
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Registration failed:', error.error.message || 'Registration failed');
            alert('Registration failed: ' + (error.error.message || 'Please check your inputs'));
          }
        });
    } else {
      alert('All registration fields must be filled!');
    }
  }
}
