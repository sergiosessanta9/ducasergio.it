import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/services/global-service';
import { Icons } from 'src/app/components/shared/icons';
import { ApiService } from 'src/services/api-service';
import { ErrorVO } from 'src/app/models/error-vo';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: 'app-request-cv',
  templateUrl: './request-cv.component.html',
})
export class RequestCvComponent {

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private apiSevice: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
    document.documentElement.classList.add(theme);
    
    window.scrollTo(0, 0);

  }

  signUpForm: FormGroup = this.formBuilder.group({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.signUpForm.valid) {

      this.apiSevice.sendEmail(this.signUpForm.controls['first_name'].value, this.signUpForm.controls['last_name'].value, this.signUpForm.controls['email'].value).subscribe({
        next: (data) => {
          if(!data) {
            this.showNegative();
          } else {
            if (data.code == 0) {
              this.signUpForm.reset();
              this.showSuccess();
            } else {
              this.showNegative();
            }
          }
        },
        error: (error) => {
          this.showNegative();
        }
      });
    }
  }

  showSuccess() {
    this.alertService.showAlert({
      title: 'Request Sent 🎉',
      message: 'Your request for my CV has been sent successfully. I\'ve sent you an email with the details, but if you don\'t see it, be sure to check your spam folder—it might be hiding there!',
      type: 'success'
    });
  }

  showNegative() {
    this.alertService.showAlert({
      title: 'Oops 😕',
      message: 'It looks like we\'re unable to send the email with my CV at the moment. This might be a temporary issue. Please try again later, or contact me directly if the problem continues. Thanks for your patience!',
      type: 'error'
    });
  }
}
