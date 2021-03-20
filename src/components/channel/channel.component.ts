import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {User} from '../../models/user.models';

@Component({
  selector: 'app-channel',
  template: `
<div class="section-form-add-user">
  <h1>Ajouter un utilisateur</h1>
  <form [formGroup]="addUserForm" (ngSubmit)="onSubmit()">
    <mat-form-field color="accent">
      <input matInput placeholder="Pseudonyme" formControlName="pseudonyme" required>
    </mat-form-field>
    <button
      mat-raised-button
      color="accent"
      [disabled]="this.addUserForm.invalid"
      type="submit">
      Ajouter
    </button>
  </form>
</div>
<div class="section-user">
  <ng-container *ngFor="let user of users">
    <app-chat [user]="user"></app-chat>
  </ng-container>
</div>
`,
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  users: Array<User> = [];
  addUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      pseudonyme: ['', [ Validators.required ]],
    });
  }

  onSubmit(): void {
    if (this.addUserForm.invalid) {
      return;
    }
    this.users.push(new User({pseudonyme: this.addUserForm.value.pseudonyme}));
  }
}
