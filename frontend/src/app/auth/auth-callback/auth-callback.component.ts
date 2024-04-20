import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Loading...</p>` // Simple text to show during loading; you can customize it as needed
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.handleAuthentication();
  }

}
