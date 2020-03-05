import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatRoomComponent } from './pages/chat-room/chat-room.component';

const routes: Routes = [
    // { path: '', component: ChatComponent },
    { path: ':threadId', component: ChatRoomComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChatRoutingModule { }
