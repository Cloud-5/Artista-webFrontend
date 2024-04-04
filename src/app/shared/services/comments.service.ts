import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommentInterface } from '../interfaces/comment.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = environment.apiUrl + '/artwork-preview';


  getComments(artId: string): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(`${this.apiUrl}/${artId}`)
    .pipe(
      map((response: any) => response.comments)
    );
  }

  createComment(
    text: string,
    artworkId: string,
    parentId: string | null = null
  ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      `${this.apiUrl}/${artworkId}/comments`,
      {
        body: text,
        artwork_id: artworkId,
        parent_comment_id: parentId,
      }
    );
  }
  

  updateComment(id: string, text: string): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `${this.apiUrl}/${id}`,
      {
        body: text,
      }
    );
  }
  
  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
  
}
