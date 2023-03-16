import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less']
})
export class EditPostComponent implements OnInit {
  editPostForm!:FormGroup;
  id!: string;
  buttonDisabled = false;

  constructor(private postService:PostService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.editPostForm=new FormGroup({
      title:new FormControl(null),
      description:new FormControl(null),
    })
    this.id=this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts)=>{
      if(posts.length){
      const post = posts.find((post)=> post.id === this.id);
      this.editPostForm.patchValue({
        title:post?.title,
        description:post?.description,
      })
    }
    })
    
  }
  onEditPost(){
    this.buttonDisabled = true;
    const postData={...this.editPostForm.value,id:this.id};
    this.postService.update(postData);
    this.router.navigate(['/posts']);

  }
}
