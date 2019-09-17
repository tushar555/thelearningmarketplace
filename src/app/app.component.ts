import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "The Learning Market Place!";
  userEmail: any;
  userName: any;
  showUsers: any = false;
  showSuccessMessage: any = false;
  loginForm: any;
  btnTitle: any = "Show Users";
  constructor(private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      userEmail: ["", Validators.compose([Validators.required])],
      userName: ["", Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.showSuccessMessage = true;

    this.userEmail = [];
    this.userName = [];

    this.userEmail = JSON.parse(localStorage.getItem("userEmail"));

    //  this.userName = JSON.parse(localStorage.getItem("userName"));
    this.localStorageConditions(
      this.userEmail,
      this.loginForm.value.userEmail,
      this.loginForm.value.userName
    );

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }

  localStorageConditions(arrayName, email, name) {
    if (arrayName !== null) {
      arrayName.push({ email: email, full_name: name });
    } else {
      this.userEmail = [];

      this.userEmail[0] = { email: email, full_name: name };
    }
    localStorage.setItem("userEmail", JSON.stringify(this.userEmail));
  }
  viewUsers() {
    this.showUsers = !this.showUsers;
    this.btnTitle = this.showUsers ? "Hide Users" : "Show Users";

    this.userEmail = JSON.parse(localStorage.getItem("userEmail"));
  }
}
