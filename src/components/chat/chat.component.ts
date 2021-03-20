import {Component, Input, OnInit} from '@angular/core';
import {HistoryService} from '../../services/history.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.models';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {UserMessage} from "../../models/user-message.models";

@Component({
  selector: 'app-chat',
  template: `
<h1>{{user.pseudonyme}}</h1>
<div class="zone-groupe">
    <ng-container *ngFor="let userMessage of messages">
      <p>
      <span class="title">{{ userMessage.user.pseudonyme }}</span>
      <span class="message"> {{userMessage.message }}</span>
      </p>
    </ng-container>
</div>
<div class="section-add-message">
  <form [formGroup]="messageForm" (ngSubmit)="onSubmit()">
    <mat-form-field>
      <input matInput placeholder="Message" formControlName="message" required>
      <button
        mat-icon-button
        matSuffix
        type="button"
        name="icon-message"
        tabindex="-1">
        <mat-icon color="accent">email</mat-icon>
      </button>
      <mat-error *ngIf="messageForm.controls.message?.errors?.required">Veuillez saisir un message</mat-error>
    </mat-form-field>
    <button
      mat-raised-button
      color="accent"
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
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.chatService.subject.subscribe((val: UserMessage) => {

      console.log(val.user.pseudonyme, val.message);
      this.messages.push(val);
    });
  }

  destroy(): void {
    this.chatService.subject.unsubscribe();
  }

  onSubmit(): void {
    if (this.messageForm.invalid) {
      return;
    }
    this.chatService.sendMessage(new UserMessage({ user: this.user, message: this.messageForm.value.message}));
  }
}
