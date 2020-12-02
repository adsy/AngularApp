import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  statuses=['Stable', 'Critical', 'Finished']
  userForm : FormGroup;
  forbiddenNames = ['Test']
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      'projectName': new FormControl(null,[Validators.required],this.checkNameAsync),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'status': new FormControl,
    })
  }

  // checkName function run synchronously
  checkName(control:FormControl): {[s:string]:boolean}{
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden':true}
    }
    else
      return null;
  }

  // checkName function run async
  checkNameAsync(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({'nameIsForbidden':true})
        }
        else {
          resolve(null);
        }
      }, 1500)
    })

    return promise;
  }

  onSubmit(){
    // console.log(this.userForm.value);
    console.log(this.userForm.get('projectName').errors);
    ;
  }

}
