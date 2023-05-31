import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!:FormGroup

  constructor(private userservice:UsersService){}

  ngOnInit(): void {
   this.form = new FormGroup({
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required])
   })
  }
  onSubmit(){
    this.userservice.addUser(this.form.value).subscribe(
      res=>{
        console.log(res.message)
      }
    )
    console.log(this.form)
  }
}



