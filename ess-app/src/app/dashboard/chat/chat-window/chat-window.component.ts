import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Message } from './../shared/message.model';
import { MessageService } from './../shared/message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  messages: Observable<Message[]> = new Observable<Message[]>();

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.messageList;

    this.messages.subscribe((data) => console.log(data));
  }

  ngOnInit() {
  }

  addMessage(message) {
    this.messageService.sendMessage(message);
  }

}
