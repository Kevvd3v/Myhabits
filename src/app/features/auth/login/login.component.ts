import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 

// import para material angular
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatError }             from '@angular/material/form-field';
import { CommonModule }         from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  themeClass = 'light-theme'; 
  logoSrc    = 'assets/img/logo/myhabits-logo-color.svg';
  isDarkMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService 
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {                                          
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = prefersDark;
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme(): void {
    this.themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    this.logoSrc    = this.isDarkMode
      ? 'assets/img/logo/myhabits-logo-bw.svg'
      : 'assets/img/logo/myhabits-logo-color.svg';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    const { username, password } = this.loginForm.value;
    if (this.auth.login(username.trim(), password.trim())) {
      localStorage.setItem('auth.loggedIn', 'true');
      localStorage.setItem('auth.username', username.trim());
      this.router.navigate(['/dashboard']);
    }
    
  }
}
