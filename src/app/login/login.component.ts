import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  Email:string = '';
  Password:string = '';
  errorMessage: string = '';
  loginForm: FormGroup;
  user:any;
  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    // Initialize form group
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        console.log('User Data:', user.firstName);  // Log only when user is defined
        this.user = user;

      } else {
        console.log('User is not defined yet');
      }
    });
  }

  // Login method
  onLogin() {
    if (this.loginForm.valid) {

      const formData = this.loginForm.value;
      console.log('Login data: ', formData);
      this.authService.login(this.loginForm.value).subscribe(
        (user) => {
          if (user) {
            this.user =  user // Store user info when it is available
            this.router.navigate(['/full/dashboard'])
          }
          // alert (response.message);
        },
        (error) => {
          this.errorMessage = error.message;
        }
      )
      // Perform login logic (e.g., API call here)
    } else {
      console.log('Form is not valid!');
    }
  }
}
