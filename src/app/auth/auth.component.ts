import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    if (this.isLoginMode) {
      return;
    } else {
      const email = authForm.value.email;
      const password = authForm.value.password;

      this.isLoading = true;

      this.authService.signUp(email, password).subscribe(
        (authResponseData: AuthResponseData) => {
          console.log(authResponseData);
          this.isLoading = false;
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }

    authForm.reset();
  }
}
