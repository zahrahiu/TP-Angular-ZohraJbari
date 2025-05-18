import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUserCredentials } from '../models/User';
import {UserService } from '../user.service'
import { Router } from '@angular/router';


@Component({
  selector: 'bot-sign-in',
  standalone: true,
  templateUrl: './signin.component.html',
  imports:[FormsModule, CommonModule],
  styleUrls: ['./signin.component.css'],
})

export class SigninComponent {
  credentials: IUserCredentials = { email: '', password: '' };
  signInError: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  signIn() {
      console.log('Credentials envoyées:', this.credentials);  // <-- ajoute cette ligne
    this.signInError = false;
    this.userService.signIn(this.credentials).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: () => (this.signInError = true)
    });
  }

}