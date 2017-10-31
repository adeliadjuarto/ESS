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

  sendMessage(message: string) {
    this.addMessage('you', message);
    this.chatService.parse(message).subscribe(data => this.botReply(data.intent.name));
  }

  addMessage(sender: string, text: string) {
    let message: Message = new Message();
    message.sender = sender;
    message.text = text;
    this.messages.next(message);
  }

  botReply(intent: string) {
    let reply;
    switch (intent) {
      case INTENT.GREET:
        reply = 'Hai juga';
        break;
      case INTENT.LEAVE_REQUEST:
        reply = 'Oke, pesan sudah disampaikan';
        break;
      case INTENT.LEAVE_BALANCE_REQUEST:
        reply = 'Sisa cuti anda tinggal x hari';
        break;
      case INTENT.AFFIRM:
        reply = 'Oke';
        break;
      case INTENT.THANK:
        reply = 'Sama-sama';
        break;
      default:
        reply = 'Sorry I still don\'t understand';
    }

    setTimeout(() => this.addMessage('bot', reply), 1000);
  }

}
