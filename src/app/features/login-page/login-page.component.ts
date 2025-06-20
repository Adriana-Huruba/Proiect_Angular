import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService) 
  { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=]).+$')
      ]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;

      this.authService.login(email, password)
        .subscribe({
          next: (response) => {
            if(response)
            {
              console.log('Login successful:', response);
              this.authService.setToken(response.token); // Assuming the response contains a token
              if (rememberMe) {
                localStorage.setItem('userEmail', email);
              }
              this.router.navigate(['/movies-table']);
            }
            else{
              console.error('Login failed');
              alert('Invalid email or password! Please try again.');
            }
            
          },
          // error: (error) => {
          //   console.error('Login failed:', error);
          //   // Handle login error (e.g., show a notification)
          // }
        });

      // console.log('Logging in with:', email, password, rememberMe);

      // if (rememberMe) {
      //   localStorage.setItem('userEmail', email);
      // }

      // this.router.navigate(['/movies-table']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
