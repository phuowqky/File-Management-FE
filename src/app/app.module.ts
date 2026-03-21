import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { DepartmentsComponent } from './layout/departments/departments.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MenusComponent } from './layout/menus/menus.component';
import { PermissionsComponent } from './layout/permissions/permissions.component';
import { RolesComponent } from './layout/roles/roles.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UsersComponent } from './layout/users/users.component';
import { ShareModule } from './share/share.module';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
    DepartmentsComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ShareModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
