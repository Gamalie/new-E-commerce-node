import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { Newuser } from 'src/app/interfaces';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  form!:FormGroup
  erroMessage=''
  constructor(private userservice:UsersService){}

  ngOnInit(): void {
   this.form = new FormGroup({
    user_name:new FormControl('',[Validators.required]),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required])
   })
  }
  onSubmit(){
    this.userservice.addUser(this.form.value).subscribe(
      res=>{
        console.log(res.message)
      },
      err=>{
        this.erroMessage = err.message

      }
    )
    console.log(this.form)
  }
}
