import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsConnectedGuard } from '@core/guards/auth.gard/isConnected.guard';
import { IsNotConnectedGuard } from '@core/guards/auth.gard/isNotConnected.guard';
import { IsAdminGuard } from '@core/guards/isAdmin.guard';

import { NavMenuComponent } from '@core/components/nav-menu/nav-menu.component';
import { HomeComponent } from '@features/home/pages/home/home.component';

import { ChatModule } from '@features/chat/chat.module';
import { SettingsModule } from '@features/settings/settings.module';
import { AdminSpaceModule } from '@features/admin-space/admin-space.module';
import { GroupsModule } from '@features/groups/groups.module';
import { ChallengesModule } from '@features/challenges/challenges.module';


const routes: Routes = [

  { path: '', component: HomeComponent },

  // {
    // path: '', component: NavMenuComponent, canActivate: [IsConnectedGuard], children: [

      { path: 'chat', component: NavMenuComponent, loadChildren: () => ChatModule, canActivate: [IsConnectedGuard] },
      { path: 'settings', component: NavMenuComponent, loadChildren: () => SettingsModule, canActivate: [IsConnectedGuard] },
      { path: 'admin', component: NavMenuComponent, loadChildren: () => AdminSpaceModule, canActivate: [IsConnectedGuard, IsAdminGuard] },
      { path: 'groups', component: NavMenuComponent, loadChildren: () => GroupsModule, canActivate: [IsConnectedGuard] },
      { path: 'challenges', component: NavMenuComponent, loadChildren: () => ChallengesModule, canActivate: [IsConnectedGuard] },

    // ]
  // },



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
