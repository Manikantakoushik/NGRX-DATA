import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { Post } from "../model/post.model";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsDataService } from "./posts-data.service";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsResolver } from "./posts.resolver";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes:Routes=[
    {
    path:'',component:PostsListComponent,resolve:{posts:PostsResolver}
  },{
    path:'add',component:AddPostComponent
  },{
    path:'edit/:id',component:EditPostComponent,resolve:{posts:PostsResolver}
  },{
    path:'details/:id',component:SinglePostComponent,resolve:{posts:PostsResolver}
  }

]

export const entityMetadata: EntityMetadataMap={
    Post:{
        sortComparer:sortByName,
        entityDispatcherOptions:{
            optimisticUpdate:true,
            optimisticDelete:false,
        },
    },    
};

function sortByName(a:Post,b:Post){
    let comp= a.title.localeCompare(b.title);
    // return comp;
    // if you want to sort with the descending order follow down one if you wan to sort the ascending order follow up return type......
    if(comp > 0) return -1;
    if(comp < 0) return 1;
    return comp;
}

@NgModule({
    declarations:[PostsListComponent,
        SinglePostComponent,
        EditPostComponent,
        AddPostComponent,
    ],
    imports:[CommonModule,ReactiveFormsModule,RouterModule.forChild(routes)],
    providers:[PostsResolver,PostsDataService,],
})
export class PostsModule{
    constructor(eds: EntityDefinitionService,entityDataService: EntityDataService,
        PostsDataService: PostsDataService){
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post',PostsDataService);
    }
}