import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllGroupsComponent } from './pages/all-groups/all-groups.component';
import { InformationComponent } from './pages/information/information.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
    { path: '', component: AllGroupsComponent },
    { path: 'details/:id', component: InformationComponent },
    { path: 'create', component: CreateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GroupsRoutingModule { }
