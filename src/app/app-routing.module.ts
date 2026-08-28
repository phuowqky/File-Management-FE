import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './features/users/users.component';
import { RolesComponent } from './features/roles/roles.component';
import { PermissionsComponent } from './features/permissions/permissions.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { MenusComponent } from './features/menus/menus.component';
import { LoaiHoSoComponent } from './features/loai-ho-so/loai-ho-so.component';
import { ActionsComponent } from './features/actions/actions.component';


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
      // {
      //   path: 'permissions',
      //   component: PermissionsComponent
      // },
      {
        path: 'departments',
        component: DepartmentsComponent
      },
      {
        path: 'menus',
        component: MenusComponent
      },
      {
        path: 'loai-ho-so',
        component: LoaiHoSoComponent
      },
      {
        path: 'actions',
        component: ActionsComponent
      },

            {
        path: 'departments',
        component: DepartmentsComponent
      },

      {
        path: 'ho-so',
        loadChildren: () => import('./features/ho-so/ho-so.module').then(m => m.HoSoModule)
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
