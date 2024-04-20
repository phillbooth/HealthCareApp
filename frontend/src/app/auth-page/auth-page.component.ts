import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Adjust path as necessary

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  // Initialize with empty strings to ensure they are never undefined
  loginEmail: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  constructor(private authService: AuthService) {}

  login() {
    // Now, these will always be strings, even if empty
    if (this.loginEmail && this.loginPassword) {
      this.authService.login(this.loginEmail, this.loginPassword);
    } else {
      console.error('Login or password missing!');
    }
  }

  register() {
    // Check all fields are filled before attempting to register
    if (this.registerName && this.registerEmail && this.registerPassword) {
      this.authService.register(this.registerName, this.registerEmail, this.registerPassword);
    } else {
      console.error('All registration fields must be filled!');
    }
  }
}
