import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Message } from './../shared/message.model';
import { MessageService } from './../shared/message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @ViewChild('textInput') textInput: ElementRef;

  draftMessage: Message = new Message();

  messages: Observable<Message[]> = new Observable<Message[]>();

  constructor(private messageService: MessageService,
              private el: ElementRef) {
    this.messages = this.messageService.messageList;

    this.messages.subscribe((data) => { setTimeout( () => this.scrollToBottom()); });
  }

  ngOnInit() {
  }

  addMessage(event) {
    this.textInput.nativeElement.value = '';
    this.messageService.sendMessage(this.draftMessage.text);
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.message-list');
    console.log(scrollPane.scrollHeight);
    scrollPane.scrollTop = scrollPane.scrollHeight;

    console.log(scrollPane.scrollTop);
    console.log(scrollPane.scrollHeight);
  }

}
