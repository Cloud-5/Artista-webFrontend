import { Component, Input, OnInit } from '@angular/core';
import { CommentInterface } from '../../../interfaces/comment.interface';
import { ActiveCommentInterface } from '../../../interfaces/activeComment.interface';
import { CommentsService } from '../../../services/comments.service';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {

  @Input() currentUserId!: string;

  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;

  constructor(private commentsService: CommentsService) {}


  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(){
    const artworkId = '3';
    this.commentsService.getComments(artworkId).subscribe((comments: CommentInterface[]) => {
      this.comments = comments;
    });
    (error: any)=>{
      console.error('Error fetching comments:', error);
    }
  }

  getRootComments(): CommentInterface[] {
    return this.comments.filter((comment) => comment.parent_comment_id === null);
  }

  updateComment(text: string, commentId: string): void {
    this.commentsService.updateComment(commentId, text).subscribe(
      (updatedComment: CommentInterface) => {
        this.comments = this.comments.map((comment) => {
          if (comment.comment_id === commentId) {
            return updatedComment;
          }
          return comment;
        });
        this.activeComment = null;
      },
      (error: any) => {
        console.error('Error updating comment:', error);
      }
    );
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter(
          (comment) => comment.comment_id !== commentId
        );
      },
      (error: any) => {
        console.error('Error deleting comment:', error);
      }
    );
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  addComment({ text, parentId }: { text: string; parentId: string | null }): void {
    const artworkId = '3'; 
    const userId = this.currentUserId; 
    
    this.commentsService.createComment(text, artworkId, userId, parentId).subscribe(
      (createdComment: CommentInterface) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      },
      (error: any) => {
        console.error('Error adding comment:', error);
      }
    );
  }
  
  
  

  getReplies(commentId: string): CommentInterface[] {
    return this.comments.filter((comment) => comment.parent_comment_id === commentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
}
