import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})

export class RegisterPageComponent {
  isPasswordVisible: boolean = true;
  registerForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { 
    this.registerForm = new FormGroup({});
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
 
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      const{password, confirmPassword} = this.registerForm.value;
      if(password !== confirmPassword) {
        alert('Passwords do not match! Please try again.');
        return;
      }

      const { firstName, lastName, email } = this.registerForm.value;
      const newUser={firstName, lastName, email, password};

      this.userService.getUser(email, password).subscribe(users=> {
        if(users.length > 0) {
          console.log('User already exists:', users[0]);
          alert('User already exists! Please log in.');
        }
        else
        {
          this.userService.addUser(newUser).subscribe({
            next: (user) => {
              console.log('User registered successfully:', user);
              alert('Registration successful! Please log in.');
              this.router.navigate(['/login']); 
            },
            error: (error) => {
              console.error('Error registering user:', error);
              alert('Registration failed! Please try again.');
            }
          });
        }
      })
    }
  }

}
