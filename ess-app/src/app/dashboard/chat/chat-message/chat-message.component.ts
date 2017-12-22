import { Component, OnInit, Input } from '@angular/core';

import { MessageService } from './../shared/message.service';
import { Message } from './../shared/message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;

  constructor(private service: MessageService) {
  }

  ngOnInit() {
  }

  addMessage(input) {
    this.service.sendMessage(input);
  }

}
