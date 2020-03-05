import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { ChatService } from '@core/services/chat.service';

import { Role } from '@shared/models/Enum';

import { IUser as User } from '@shared/models/User';
import { IThread as Thread } from '@shared/models/Thread';

import { DisplayParticipantsChatPipe } from '@shared/pipes/displayParticipantsChat.pipe';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit {

  selectedMenu: string = "Settings";
  originalThreads: Thread[];
  threads: Thread[];
  info: any;

  isInAGroup: boolean;
  isAMember: boolean;
  isAdmin: boolean;
  currentUserId: number;

  searchField: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.getUserRole() === Role.Admin;
    this.currentUserId = this.authService.getUserId();

    this.activatedRoute.url.subscribe(route => {
      this.selectMenu(route[0].path);
    })

  }

  selectMenu(menu: string) {

    switch (menu) {
      case "groups": {
        this.authService.getConnectedUser().subscribe(
          (user: User) => {
            this.info = user;
            this.isInAGroup = user.groupId > 0;
            this.isAMember = user.role == Role.Member;
          }
        );

      }

      case "chat": {
        this.chatService.getThreads().subscribe(
          (threads: Thread[]) => {
            this.originalThreads = this.threads = threads;

          }
        );
      }
      default: {
        //statements;
        break;
      }

    }

    this.selectedMenu = menu;
  }

  redirectToThread(threadId: number) {
    this.router.navigate(['chat/', threadId]);
  }

  redirectToMyGroup() {
    this.router.navigate(['groups/details', this.info.groupId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  searchThread(toSearch: string) {

    if (toSearch) {
      this.threads = this.threads.filter(t => t.name.includes(toSearch) || t.participants.some(user => user.username.includes(toSearch)));
    } else {
      this.threads = this.originalThreads;
    }

  }

}
