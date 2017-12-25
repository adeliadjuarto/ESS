import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MONTH } from './../../../core/constant/index';
import { Message } from './../shared/message.model';
import { MessageService } from './../shared/message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @ViewChild('textInput') textInput: ElementRef;

  draftMessage: string;
  lastMessage: string = '';

  messages: Observable<Message[]> = new Observable<Message[]>();

  constructor(private messageService: MessageService,
              private el: ElementRef) {
    this.messages = this.messageService.messageList;
    this.messages.subscribe((data) => { setTimeout( () => this.scrollToBottom()); this.lastMessage = data.pop().text[0]});
    this.messageService.newSession();
  }

  ngOnInit() {
  }

  addMessage(event) {
    this.textInput.nativeElement.value = '';
    if (this.lastMessage.includes('masukkan tanggal')) {
      this.messageService.sendMessage(this.draftMessage, this.parseDateToTimestamp(this.draftMessage));
    } else if (this.lastMessage.includes('masukkan jam')) {
      this.messageService.sendMessage(this.draftMessage, this.parseClockHourToTimestamp(this.draftMessage));
    } else {
      this.messageService.sendMessage(this.draftMessage);
    }
  }

  parseDateToTimestamp(date): string {
    let parsedMessage = date.split(' ');
    let day = parseInt(parsedMessage[0], 10);
    let year = parseInt(parsedMessage[2], 10);
    let month;
    MONTH.forEach((monthArray) => {
      if (monthArray.includes(parsedMessage[1])) {
        month = MONTH.indexOf(monthArray);
      }
    });
    return new Date(year, month, day).getTime().toString();
  }

  parseClockHourToTimestamp(clockHour) {
    let parsedMessage = clockHour.split(':');
    let hour = parseInt(parsedMessage[0], 10);
    let minute = parseInt(parsedMessage[1], 10);

    let timestamp = (hour * 3600 + minute * 60) * 1000;
    return timestamp.toString();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.message-list');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
