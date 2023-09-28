import { Component } from '@angular/core';
import { User } from '../user';
import { FormBuilder, NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../user-auth.component.css'],
})

export class SignUpComponent {
  constructor(private fb:FormBuilder){

  }
  
  signUpDForm:any = {

  }
}
