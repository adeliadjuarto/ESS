import { Injectable } from '@angular/core';

import 'rxjs/add/operator/scan';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from './message.model';
import { ChatService } from './chat.service';
import { INTENT } from './intent.constant';

@Injectable()
export class MessageService {

  messages: Subject<Message> = new Subject<Message>();
  messageList: Observable<Message[]>;

  initialMessage: Message[] = [];

  constructor(private chatService: ChatService) {
    this.messageList = this.messages.scan((messageList: Message[],  message) => {
      return messageList.concat(message);
    }, this.initialMessage);
  }

  sendMessage(chatToDisplay: string, chatToSend?: string) {
    let message: Message = new Message();
    message.sender = 'you';
    message.text = [chatToDisplay];

    this.addMessage(message);
    let sentChat = chatToSend ? chatToSend : chatToDisplay;

    this.chatService.parse(sentChat).subscribe(data => this.botReply(data));
  }

  private addMessage(message: Message) {
    this.messages.next(message);
  }

  private botReply(message: Message) {
    setTimeout(() => this.addMessage(message), 1000);
  }

  newSession() {
      this.chatService.newMessage().subscribe(data => this.addMessage(data));
  }

}
