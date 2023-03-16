import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.less']
})
export class SinglePostComponent implements OnInit {
  post:Post | undefined;
  constructor(private postService:PostService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id=this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts)=>{
        this.post = posts.find((post)=> post.id === id)
    })
  }

}
