import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './layout/users/users.component';
import { RolesComponent } from './layout/roles/roles.component';
import { PermissionsComponent } from './layout/permissions/permissions.component';
import { DepartmentsComponent } from './layout/departments/departments.component';
import { MenusComponent } from './layout/menus/menus.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'permissions',
        component: PermissionsComponent
      },
      {
        path: 'departments',
        component: DepartmentsComponent
      },
      {
        path: 'menus',
        component: MenusComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
