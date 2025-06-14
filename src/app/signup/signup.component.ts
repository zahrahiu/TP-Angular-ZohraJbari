import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
    imports:[FormsModule, CommonModule],
})
export class SignupComponent {
  user = {
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password: '',
    phoneNumber: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
  this.authService.signup(this.user).subscribe({
    next: (data) => {
      alert("Inscription réussie!");
      this.user = { firstName: '', lastName: '', age: 0, email: '', password: '', phoneNumber: '' }; // reset form
    },
    error: (err) => {
      console.log(err);

      let errorMessage = "Erreur lors de l'inscription";
      if (err.error) {
        if (typeof err.error === 'string') {
          errorMessage = err.error;
        } else if (err.error.message) {
          errorMessage = err.error.message;
        }
      }

      alert(errorMessage);
    },
  });
}


}
