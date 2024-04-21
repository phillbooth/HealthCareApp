import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomeComponent } from './home/home.component';  // Make sure you have this component
import { AuthGuard } from './auth/auth.guard';  // Import the AuthGuard

const routes: Routes = [
  { path: 'callback', component: AuthCallbackComponent },
  { path: 'auth-page', component: AuthPageComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/auth-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
