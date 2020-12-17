import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  // variable to store authenticated user - stored as a subject
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  logoutInterval;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt7_7797iID-G6BG928EmwMbvBq6p6mwY",
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBt7_7797iID-G6BG928EmwMbvBq6p6mwY",
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/login"]);
    if (this.logoutInterval) {
      clearInterval(this.logoutInterval);
    }
    this.logoutInterval = null;
  }

  autoLogout(expirationDuration: number) {
    this.logoutInterval = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // creates a new date that takes the current exact time in ms with .getTime() and adds the total seconds for expiresIn * 1000 to turn into ms.
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "Unknown error occured while logging in";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    console.log(errorRes.error.error.message);

    switch (errorRes.error.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMessage = "Error occured - Email address not registered.";
        break;
      case "EMAIL_EXISTS":
        errorMessage = "Error occured - Email already exists.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Error occured - Password is incorrect.";
        break;
    }

    return throwError(errorMessage);
  }
}
