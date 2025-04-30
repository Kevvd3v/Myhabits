import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 
import { User } from '../../../core/models/user.model';
// imports para material angular
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatError }            from '@angular/material/form-field';
import { CommonModule }        from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,         
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatError
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  themeClass = 'light-theme';
  logoSrc    = 'assets/img/logo/myhabits-logo-color.svg';
  isDarkMode = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,  
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(3)]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required]
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

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
  
    const user: User = this.registerForm.value;
    if (this.auth.register(user)) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } else {
      alert('El usuario ya existe. Elige otro nombre.');
    }
  }
  
  
}




