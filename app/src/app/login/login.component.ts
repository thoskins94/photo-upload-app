import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import AuthService from '../auth/auth.service'
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  constructor(   
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public nav: NavbarService) { 
      
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  async ngOnInit(): Promise<void> {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl(localStorage.getItem("USER_ID") + '/photos');
    } 
    this.nav.hide()
  }

  navigateToRegister = () => {
    this.router.navigateByUrl('/register')
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if(this.form.valid) {
      try {
        const email = this.form.getRawValue().email;
        const password = this.form.getRawValue().password;
        await this.authService.login(email, password);
      } catch(err) {
        this.loginInvalid = true;
      } 
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
