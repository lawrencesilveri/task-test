import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  text = new FormControl('');
  posts: Post[];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  create() {
    this.postService.createPost(this.text.value).subscribe(post => {
      // console.log(post);
      this.getPosts();
      this.text = new FormControl('');
    });
  }
  upVote(id: string) {
    this.postService.patchPostById(id).subscribe(post => {
      // console.log(post);
      this.getPosts();
    });
  }
}
