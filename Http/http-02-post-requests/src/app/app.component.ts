import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = []; 
  isLoading = false;
  postSubscription: Subscription;
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.errorSubject.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    
    this.onFetchPosts();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData.title,postData.content);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postSubscription = this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isLoading = false;
        this.loadedPosts = posts;
      }, error => {
        this.isLoading=false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts=[];
    });
  }

  onHandleError(){
    this.error=null;
  }

}
