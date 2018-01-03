import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../shared/material/material.module';
import { ChatComponent } from './chat.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { MessageService } from './shared/message.service';
import { ChatService } from './shared/chat.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ChatWindowComponent,
    ChatCardComponent,
    ChatComponent
  ],
  providers: [
    ChatService,
    MessageService
  ]
})
export class ChatModule { }
