import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/Users/users.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!:FormGroup
  errorMessage=null
  // role=localStorage.getItem('role')
  constructor(private userservice:UsersService,private router:Router,private formBuilder:FormBuilder,private authenticationService:AuthenticationService){}

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    user_email:['',[Validators.required,Validators.email]],
    user_password:['',[Validators.required]]
   })
  }
  onSubmit(){
    this.userservice.loginUser(this.form.value).subscribe(
      res=>{
        this.errorMessage=null
        this.authenticationService.login(res)
        console.log(res.role);

        if(res.role==='user'){
          this.router.navigate(['/products'])
        }
        else if(res.role==='admin'){
          this.router.navigate(['/admin'])
        }
        
      
        // localStorage.setItem('token',res.token)
      },
      err=>{
        this.errorMessage =err.message 
      }
    )
    console.log(this.form)
  }
}



