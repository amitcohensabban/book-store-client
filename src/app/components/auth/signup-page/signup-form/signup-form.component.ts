import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      confirmPassword:this.fb.control('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.signupForm);

    const firstName: string = this.signupForm.get('firstName')?.value;
    const lastName: string = this.signupForm.get('lastName')?.value;
    const email: string = this.signupForm.get('email')?.value;
    const password: string = this.signupForm.get('password')?.value;
    const confirmPassword: string = this.signupForm.get('confirm-password')?.value;
    console.log(firstName, lastName, email, password, confirmPassword);

    this.authService
      .signUp({ firstName, lastName, email, password, confirmPassword })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.authService
            .login({ email: res.email, password: res.password })
            .subscribe((res: any) => {
              console.log(res.token);
            });
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

}
