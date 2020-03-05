import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { IThread as Thread } from '@shared/models/Thread';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() thread: Thread;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

}
