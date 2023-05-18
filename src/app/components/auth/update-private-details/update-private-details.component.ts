import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-private-details',
  templateUrl: './update-private-details.component.html',
  styleUrls: ['./update-private-details.component.scss']
})
export class UpdatePrivateDetailsComponent {
  updatePrivateDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService) {}

  ngOnInit(): void {
    this.updatePrivateDetailsForm = this.fb.group({
      oldEmail: this.fb.control('', Validators.required),
      newEmail: this.fb.control('', Validators.required),
      oldPassword: this.fb.control('', Validators.required),
      newPassword: this.fb.control('', Validators.required),
    });
  }
  onSubmit() {
    if (this.updatePrivateDetailsForm.valid) {
      const details = this.updatePrivateDetailsForm.value;
      console.log(details);

      this.authService.updatePrivateDetails(details).subscribe(
        (result) => {
          console.log('Update successful', result);
        },
        (error) => {
          console.log('Update failed', error);
        }
      );
    }
  }
  onDeleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteAccount(localStorage.getItem('userName')).subscribe(
        (result) => {
          console.log('Account deleted:', result);
        },
        (error) => {
          console.log('Account deletion failed:', error);
        }
      );
    }
  }

}
