import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  errorSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(
        "https://fir-guide-78b19-default-rtdb.firebaseio.com/posts.json",
        postData,
        {
          observe: "response",
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.errorSubject.next(error.message);
        }
      );
  }

  fetchPosts() {
    // Setting up of multiple search paramaters for API - replace value of params with searchParams below.
    let searchParams = new HttpParams();
    searchParams = searchParams.append("param", "1");
    searchParams = searchParams.append("param", "2");
    searchParams = searchParams.append("print", "pretty");

    return (
      this.http
        .get("https://fir-guide-78b19-default-rtdb.firebaseio.com/posts.json", {
          // key-value pairs in JS object - can see this in the network tab in dev tools.
          headers: new HttpHeaders({ "Custom-Header": "hello" }),
          //    can add one search param in this current config with .set called here - see few lines above for multi params
          params: new HttpParams().set("print", "pretty"),
        })
        // pipes the input before it is outputted in the subscription
        .pipe(
          // map function on observable
          map((data: { [key: string]: Post }) => {
            const postArray: Post[] = [];
            for (const key in data) {
              // pushes an object containg the contents of the objects return with an additional key for id which is the key provided by the backend
              postArray.push({ ...data[key], key: key });
            }
            return postArray;
          }),
          // Can also use catchError function to perform a generic data analytics task before passing to subscription
          catchError((errorRes) => {
            return throwError(errorRes);
          })
        )
    );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://fir-guide-78b19-default-rtdb.firebaseio.com/posts.json",
        {
          observe: "events",
          responseType: "text",
        }
      )
      .pipe(
        // granual control over the event object and displaying different outputs depending on the event type
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
          if (event.type === HttpEventType.Sent) {
            // update ui to let user know the request had been sent
          }
        })
      );
  }
}
