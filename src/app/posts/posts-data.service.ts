import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { map, Observable } from "rxjs";
import { Post } from "../model/post.model";
@Injectable()
export class PostsDataService extends DefaultDataService<Post>{
    constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator ){
        super('Post', http, httpUrlGenerator);
    }

        override getAll():Observable<Post[]>{
        return this.http.get<Post[]>(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts.json`)
        .pipe(
            map((data)=>{
                const posts:Post[] = [];
                for (let key in data){
                    posts.push({...data[key],id:key});
                }
                return posts;
        }))
    }

    override add(post:Post):Observable<Post>{
        return this.http.post<{name:string}>(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts.json`,post).
        pipe(map((data)=>{
            return {...post,id: data.name};
        }))
        
    }
    override update(post:Update<Post>){
        return this.http.put<Post>(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts/${post.id}.json`,{...post.changes})   
    }

    override delete(id:string):Observable<string>{
        return this.http.delete(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts/${id}.json`).
        pipe(map((data)=>{
            return id;
        }))
    }


}