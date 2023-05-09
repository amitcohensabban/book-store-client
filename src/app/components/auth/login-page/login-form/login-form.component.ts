import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  handleSubmit(): void {
    console.log(this.loginForm);

    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;

    this.authService
      .login({ email, password })
      .subscribe((res: any): void => {
        console.log(res.token);
      });
  }

}
