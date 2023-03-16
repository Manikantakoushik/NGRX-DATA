import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { first, map, mergeMap, Observable, of, tap } from 'rxjs';
import { PostService } from './post.service';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  constructor(private PostService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.PostService.loaded$.pipe(
      //   mergeMap((loaded) => {
      //     if (loaded) {
      //       return of(true);
      //     }
      //     return this.PostService.getAll().pipe(
      //       map((posts) => {
      //         return !!posts;
      //       })
      //     );
      //   }),first()
      //-------------------------(or) Other method -------------------------------------------------
      tap((loaded) => {
        if (!loaded) {
          this.PostService.getAll();
        }
      }),
      first()
    );
  }
}
