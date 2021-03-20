import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {UserMessage} from '../models/user-message.models';

@Injectable({ providedIn: 'root'})
export class ChatService {

  subject: Subject<UserMessage> = new Subject<UserMessage>();

  constructor() {}

  sendMessage(userMessage: UserMessage): void {
    this.subject.next(userMessage);
  }

}
