import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {User} from '../../models/user.models';

@Component({
  selector: 'app-channel',
  template: `
<div class="section-form-add-user">
  <h1>Ajouter un utilisateur au groupe</h1>
  <form [formGroup]="addUserForm" (ngSubmit)="onSubmit()">
    <mat-form-field>
      <input matInput placeholder="speudonyme" formControlName="speudonyme" required>
      <button
        mat-icon-button
        matSuffix
        type="button"
        name="icon-speudonyme"
        tabindex="-1">
        <mat-icon color="accent">email</mat-icon>
      </button>
      <mat-error *ngIf="addUserForm.controls.speudonyme?.errors?.required">Veuillez saisir un speudonyme</mat-error>
    </mat-form-field>
    <button
      mat-raised-button
      color="accent"
      type="submit">
      Ajouter
    </button>
  </form>
</div>
<div class="section">
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
      speudonyme: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.addUserForm.invalid) {
      return;
    }
    this.users.push(new User({pseudonyme: this.addUserForm.value.speudonyme}));
  }
}
