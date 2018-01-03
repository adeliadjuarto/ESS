import { Component, OnInit, Input } from '@angular/core';

import { REIMBURSEMENT_TYPES, LEAVE_TYPES } from './../../../core/constant/index';
import { MessageService } from './../shared/message.service';
import { Message } from './../shared/message.model';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit {

  @Input() message: Message;

  constructor(private service: MessageService) { }

  ngOnInit() {
  }

  addMessage(input) {
    if (!!this.parseLeaveTypeToId(input)) {
      this.service.sendMessage(input, this.parseLeaveTypeToId(input));
      return;
    } else if (!!this.parseReimbursementTypeToId(input)) {
      this.service.sendMessage(input, this.parseReimbursementTypeToId(input));
      return;
    } else {
      this.service.sendMessage(input);
      return;
    }
  }

  parseLeaveTypeToId(leaveType) {
    let id = '';
    LEAVE_TYPES.forEach(type => {
      if (type.name === leaveType) {
        id = type.id.toString();
      }
    })
    return id;
  }

  parseReimbursementTypeToId(reimbursementType) {
    let id = '';
    LEAVE_TYPES.forEach(type => {
      if (type.name === reimbursementType) {
        id = type.id.toString();
      }
    })
    return id;
  }


}
