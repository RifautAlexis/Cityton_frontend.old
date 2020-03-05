import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

import { IUser as User } from '@shared/models/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  connectedUser$: Observable<User>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.connectedUser$ = this.authService.getConnectedUser();

  }

}
