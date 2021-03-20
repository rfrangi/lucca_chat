import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../../services/chat.service';
import {UserMessage} from '../../models/user-message.models';

@Component({
  selector: 'app-chat',
  template: `
<h2>{{user.pseudonyme}}</h2>
<div class="zone-groupe">
    <ng-container *ngFor="let userMessage of messages">
        <p [class.me]="userMessage.user.id === user.id">
          <span class="title">{{ userMessage.user.pseudonyme }}</span>
          {{userMessage.message }}
        </p>
    </ng-container>
</div>
<div class="section-add-message">
  <form [formGroup]="messageForm" (ngSubmit)="onSubmit()">
    <mat-form-field color="accent">
      <input matInput placeholder="Message" formControlName="message" required>
    </mat-form-field>
    <button
      mat-raised-button
      color="accent"
      [disabled]="messageForm.invalid"
      type="submit">
      Envoyer
    </button>
  </form>
</div>
`,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() user!: User;
  messageForm!: FormGroup;
  messages: Array<UserMessage> = [];

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) {}

  ngOnInit(): void {
    this.initForm();
    this.chatService.subject.subscribe((val: UserMessage) => {
      this.messages.push(val);
    });
  }

  initForm(): void {
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  destroy(): void {
    this.chatService.subject.unsubscribe();
  }

  onSubmit(): void {
    if (this.messageForm.invalid) {
      return;
    }

    this.chatService.sendMessage(new UserMessage({ user: this.user, message: this.messageForm.value.message }));
    const items: HTMLCollectionOf<Element> = document.getElementsByClassName('zone-groupe');
    this.initForm();

    setTimeout(() => {
      for (const element of Array.from(items)) {
        element.scrollTop = element.scrollHeight;
      }
    }, 100 );
  }
}
