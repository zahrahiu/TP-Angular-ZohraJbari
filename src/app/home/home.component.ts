import { Component } from '@angular/core';
import { Router } from '@angular/router';  // <-- importer Router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }  // <-- injecter Router ici

  goToSignin() {
    this.router.navigate(['/signin']);
  }
}
