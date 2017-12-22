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

  sendMessage(chatMessage: string) {
    let message: Message = new Message();
    message.sender = 'you';
    message.text = [chatMessage];

    this.addMessage(message);
    this.chatService.parse(chatMessage).subscribe(data => this.botReply(data));
  }

  private addMessage(message: Message) {
    this.messages.next(message);
  }

  private botReply(message: Message) {
    // let reply;
    // switch (intent) {
    //   case INTENT.GREET:
    //     reply = 'Hai juga';
    //     break;
    //   case INTENT.LEAVE_REQUEST:
    //     reply = 'Oke, pesan sudah disampaikan';
    //     break;
    //   case INTENT.LEAVE_BALANCE_REQUEST:
    //     reply = 'Sisa cuti anda tinggal x hari';
    //     break;
    //   case INTENT.AFFIRM:
    //     reply = 'Oke';
    //     break;
    //   case INTENT.THANK:
    //     reply = 'Sama-sama';
    //     break;
    //   default:
    //     reply = 'Sorry I still don\'t understand';
    // }

    // let buttons: any = [{title: 'Hey'}, {title: 'Ho'}]

    setTimeout(() => this.addMessage(message), 1000);
  }

  newSession() {
      this.chatService.newMessage().subscribe(data => this.addMessage(data));
  }

}
