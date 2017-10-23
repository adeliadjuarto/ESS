import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../shared/material/material.module';
import { ChatComponent } from './chat.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MessageService } from './shared/message.service';
import { ChatService } from './shared/chat.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ChatWindowComponent,
    ChatCardComponent,
    ChatMessageComponent,
    ChatComponent
  ],
  providers: [
    ChatService,
    MessageService
  ]
})
export class ChatModule { }
