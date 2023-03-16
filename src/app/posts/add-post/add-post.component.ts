import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.less']
})
export class AddPostComponent implements OnInit {
  addPostForm!:FormGroup;
  constructor(private postService:PostService,private router:Router) { }

  ngOnInit(): void {
    this.addPostForm=new FormGroup({
      title:new FormControl(null),
      description:new FormControl(null),
    })
  }

  onAddPost(){
    const post:Post = this.addPostForm.value;
    this.postService.add(post).subscribe((data)=>{
      this.router.navigateByUrl('/posts');
    })

  }

}
