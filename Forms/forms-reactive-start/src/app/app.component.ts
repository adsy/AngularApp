import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris','Anna'];

  ngOnInit(): void {
    // Create a new formGroup and pass in a JS object with our controls which contains key value pairs
    // Each control of the form needs to be created with a formControl item
    // Can add defaults into the constructor for the formControl,   2nd argument is a validator (required etc.) 3rd argument is a async validator
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username':new FormControl('Default text goes here',[Validators.required, this.forbiddenNames.bind(this)]),
        'email':new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmails),
      }),
      'gender':new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    })

    // Observable which listens to every single value which is changed

    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    // })

    // Observable which listens for status changes due to validators

    // this.signupForm.statusChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    // })

    // setValue function takes in an object representing the form so we can set values for all inputs.

    // this.signupForm.setValue({
    //   'userData': {
    //     'username' : 'Adam',
    //     'email': 'test@test.com'
    //   },
    //   'gender' : 'male',
    //   'hobbies' : []
    // })

    // patchValue function takes in an object which will set specified values of the form.

    // this.signupForm.patchValue({
    //   'userData': {
    //     'username' : 'Adam',
    //     'email': 'test@test.com'
    //   },
    // })
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  getControls(){

    // (<type> data ) tells typescript to cast whats inside the paranthesis to that type in the <> brackets
    // Everything after the paranthesis treats it as that type
    return (<FormArray>this.signupForm.get('hobbies')).controls
  }
  
  addHobby(){
    // tells typescript to cast whats inside the paranthesis to that type in the <> brackets
    // Everything after the paranthesis treats it as that type
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  // validator function - validator needs to receive arg which is control to check
  // uses the indexOf function to match the value of what is in the control against the values in the array
  forbiddenNames(control:FormControl): {[s:string]:boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenEmails(control:FormControl) : Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(()=>{
        if (control.value === 'test@test.com'){
          resolve({'emailIsForbidden':true})
        }
        else {
          resolve(null);
        }
      },1500)
    })
    return promise;
  }
}
