import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MenusComponent } from './features/menus/menus.component';
import { PermissionsComponent } from './features/permissions/permissions.component';
import { RolesComponent } from './features/roles/roles.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UsersComponent } from './features/users/users.component';
import { ShareModule } from './share/share.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ActionsComponent } from './features/actions/actions.component';


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
    MenusComponent,
    ActionsComponent,

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
        {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // {
    //   provide: NZ_CONFIG,
    //   useValue: ngZorroConfig
    // },
    // { provide: NZ_I18N, useValue: vi_VN },
    // { provide: LOCALE_ID, useValue: 'vi' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
