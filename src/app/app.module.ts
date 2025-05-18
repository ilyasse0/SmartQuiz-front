import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { VerifyAccountComponent } from './auth/verify-account/verify-account.component';
import {CodeInputModule} from 'angular-code-input';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponentComponent } from './layout/auth-layout-component/auth-layout-component.component';
import { QcmGeneratorComponent } from './layout/qcm-generator/qcm-generator.component';
import { QcmAttemptComponent } from './layout/qcm-attempt/qcm-attempt.component';
import { AttemptListComponent } from './layout/attempt-list/attempt-list.component';
import { MyQcmsComponent } from './layout/my-qcms/my-qcms.component';
import { QcmPublicComponent } from './layout/qcm-public/qcm-public.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    VerifyAccountComponent,
    MainLayoutComponent,
    AuthLayoutComponentComponent,
    QcmGeneratorComponent,
    QcmAttemptComponent,
    AttemptListComponent,
    MyQcmsComponent,
    QcmPublicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
