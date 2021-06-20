import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import AuthService from '../auth/auth.service'
import { User } from '../auth/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: FormGroup;
  public registerInvalid = false;
  private formSubmitAttempt = false;

  constructor(   
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { 
      
      this.form = this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    async ngOnInit(): Promise<void> {}

    navigateToLogin = () => {
      this.router.navigateByUrl('/login')
    }
  
    async onRegister(): Promise<void> {
      this.registerInvalid = false;
      this.formSubmitAttempt = false;
      if(this.form.valid) {
        try {
          const registerObject: User = {
            email: this.form.getRawValue().email,
            password: this.form.getRawValue().password,
            firstName: this.form.getRawValue().firstName,
            lastName: this.form.getRawValue().lastName
          }
          this.authService.register(registerObject);
        } catch(err) {
          this.registerInvalid = true;
        } 
      } else {
        this.formSubmitAttempt = true;
      }
    }
}
