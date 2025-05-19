import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginErrorMessage: string = '';

  constructor(private authservice: AuthService, private router: Router){}
  onSubmit(form: NgForm){
    if(form.valid){
      this.authservice.login(this.username, this.password).subscribe({
        next: (user) => {
          if (user) {
            alert("Login Succesful");
            setTimeout(()=>{
              this.router.navigate(['/home']).then(() => {
              });
            }, 300)
          }
          else{
            alert("Invalid credentials");
          }
        },
        error:(err) => {
          this.loginErrorMessage = "Something went wrong , please try again";
          console.log(err);
        }
      });
    }
  }
}
 