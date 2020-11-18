import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Can also use ViewChild method to grab the form when it is submitted without passing it to onSubmit from the html
  @ViewChild("f", {static:false}) signupForm: NgForm;
  defaultQuestion : "pet";
  answer : ''
  genders = ['male','female']
  defaultGender = 'male'

  // Object is used to grab the data from the signupForm variable
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    // code below shows how to set the values of all the properties of the form object

    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret:'pet',
    //   questionAnswer:'',
    //   gender:'male'
    // })

    // code below will set the username value in the form onlyx 

    this.signupForm.form.patchValue({
      userData:{
        username:suggestedName
      }
    })
  }

  // onSubmit(form:NgForm){
  //   console.log(form)
  // }

  // When the submit button is pressed the values of the form will be used for the JS object setup in the component.
  onSubmit(){
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.submitted = true;
    
    // Call the reset function on the form object to clear the previous values as if the page was loaded again.
    this.signupForm.reset()
  }

  
}
