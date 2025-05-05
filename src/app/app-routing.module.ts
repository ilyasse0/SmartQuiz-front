import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { VerifyAccountComponent } from './auth/verify-account/verify-account.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import {AuthLayoutComponentComponent} from './layout/auth-layout-component/auth-layout-component.component';
import {QcmGeneratorComponent} from './layout/qcm-generator/qcm-generator.component';

const routes: Routes = [
  // Public/auth routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected routes with layout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: QcmGeneratorComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'qcm-Generator' , component: QcmGeneratorComponent },
      // Add more protected routes here
    ]
  },
  {
    path: '',
    component: AuthLayoutComponentComponent,
    children: [
      { path: 'verify-account', component: VerifyAccountComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // Wildcard route
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
