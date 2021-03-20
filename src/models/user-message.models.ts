import {User} from './user.models';

export class UserMessage {
  user!: User;
  message!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
