import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ChatService } from '@core/services/chat.service';
import { AuthService } from '@core/services/auth.service';

import { IMessage as Message } from '@shared/models/message';
import { Role } from '@shared/models/Enum';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  threadId: number;
  authorId: number;
  connectionIsEstablished: boolean = false;
  isNotAMember: boolean = false;

  url: string = "";

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.authorId = this.authService.getUserId();
    this.isNotAMember = this.authService.getUserRole() !== Role.Member;

    this.activatedRoute.paramMap.subscribe(params => {
      this.threadId = Number(params.get("threadId"));

      this.chatService.getMessages(this.threadId).subscribe(
        (messages: Message[]) => {
          console.log(messages);
          this.messages$.next(messages);
        }
      );
    })

    this.subscribeToEvent();
  }

  private subscribeToEvent() {

    this.chatService.connectionEstablished.subscribe(
      (connectionIsEstablished: boolean) => {
        this.connectionIsEstablished = connectionIsEstablished;
      }
    );

    this.chatService.messageReceived.subscribe(
      (newMessage: Message) => {
        this.messages$.next([...this.messages$.value, newMessage]);
      }
    );

    this.chatService.messageRemoved.subscribe(
      (messageremoved: Message) => {
        this.messages$.next(
          this.messages$.getValue().map(m => {
            if (m.id === messageremoved.id) return messageremoved
            else return m;
          })
        );
      }
    );
  }

  sendMessage(newMessage: string) {
    console.log("SEND");

    if (newMessage !== "" || this.url !== "")
      this.chatService.sendMessage(newMessage, this.threadId, this.url);

    this.url = "";
  }

  removeMessage(messageId: number) {
    this.chatService.removeMessage(messageId);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnDestroy(): void {
    this.chatService.closeConnection();
  }

}
