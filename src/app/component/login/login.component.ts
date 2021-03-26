import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {SessionConstant} from '../../constant/SessionConstant';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  onSubmit(): void {
    this.loginService.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
      sessionStorage.setItem(SessionConstant.SESSION_TOKEN, response.jwtToken);
      this.router.navigate(['/movements']);
    });
  }

}
