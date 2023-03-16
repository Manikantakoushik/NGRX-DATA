import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent implements OnInit {
posts$!:Observable<Post[]>
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    // this.posts$=this.postService.getAll();
    this.posts$=this.postService.entities$;
  }

  onDeletePost(event: Event,id:string){
    event.preventDefault();
    if(confirm('Are you sure You want to Delete')){
        this.postService.delete(id);
    }
  }

}
