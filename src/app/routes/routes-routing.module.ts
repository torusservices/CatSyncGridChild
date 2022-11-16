import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { LocationComponent } from './location/location.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login'])


const routes: Routes = [{ path: 'routes', component: RoutesComponent, ...canActivate(redirectToLogin) },
{path : 'location', component : LocationComponent, ...canActivate(redirectToLogin)}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
