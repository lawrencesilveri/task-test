import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly apiURL = 'http://localhost:3000/api/posts';
  constructor(private http: HttpClient) {}
  getPosts() {
    return this.http.get<Post[]>(this.apiURL);
  }
  createPost(text: string) {
    return this.http.post<Post>(this.apiURL, { text: text });
  }
  patchPostById(id: string) {
    return this.http.patch<Post>(this.apiURL + `/${id}/upvote`, {});
  }
}
