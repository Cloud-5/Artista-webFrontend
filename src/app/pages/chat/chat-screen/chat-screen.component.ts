
import { Component, HostListener, OnInit } from '@angular/core';
import { ChatServiceService } from '../chat-screen/service/chat-service.service';
import { Observable, from, of } from 'rxjs';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface User {
  firebaseUid: string;
  name: string;
  unreadCount?: number;
}

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css'],
})
export class ChatScreenComponent implements OnInit {
  messages$!: Observable<any[]>;
  senderId: string = '';
  recipientId: string = '';
  artistName: string = '';
  newMessage: string = '';
  userRole: string = '';
  users$: Observable<User[]> = of([]);
  selectedUserMessages$!: Observable<any[]>;
  selectedMessageId: string = '';

  filteredUsers$: Observable<User[]> = of([]);
  searchTerm: string = '';

  unreadCounts: { [key: string]: number } = {};
  private subscriptions: Subscription[] = [];
  private unreadCountSubscription: Subscription | undefined;
  
  constructor(private chatService: ChatServiceService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.userRole = this.getFromLocalStorage('role', '');
      this.senderId = this.getFromLocalStorage('uid', '');
      this.artistName = this.getFromLocalStorage('artistName', '');
      if (this.userRole === 'customer') {
        this.recipientId = this.getFromLocalStorage('artistFirebaseUid', '');
        this.loadMessages();
        this.loadArtistsWhoSentMessages();
      } else if (this.userRole === 'artist') {
        this.loadUsersWhoSentMessages();
      }
      this.subscribeToUnreadCounts();
    }

    const messagesSubscription = this.loadMessages();
  this.subscriptions.push(messagesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.unreadCountSubscription) {
      this.unreadCountSubscription.unsubscribe();
    }
  }
  

subscribeToUnreadCounts(): void {
  this.unreadCountSubscription = this.chatService.getUnreadMessageCount(this.senderId).subscribe(unreadCounts => {
    this.unreadCounts = unreadCounts;
    this.updateUserUnreadCounts();
  });
}

  loadUnreadCounts(): void {
    this.chatService.getUnreadMessageCount(this.senderId).subscribe(unreadCounts => {
      this.unreadCounts = unreadCounts;
      this.updateUserUnreadCounts();
    });
  }
  
  updateUserUnreadCounts(): void {
    this.users$ = this.users$.pipe(
      map(users => users.map(user => ({
        ...user,
        unreadCount: this.unreadCounts[user.firebaseUid] || 0
      })))
    );
  
    this.filteredUsers$ = this.users$;
  }

  private getFromLocalStorage(key: string, defaultValue: string): string {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      return localStorage.getItem(key) || defaultValue;
    } else {
      return defaultValue;
    }
  }

  loadUsersWhoSentMessages(): void {
    this.users$ = this.chatService.getUniqueUsersForRole(this.senderId, this.userRole).pipe(
      switchMap((userIds: string[]) =>
        from(userIds).pipe(
          mergeMap(id =>
            this.chatService.getUserDetailsByUid(id).pipe(
              map(userDetails => ({
                firebaseUid: id,
                name: userDetails ? userDetails.displayName : `User`,
                unreadCount: this.unreadCounts[id] || 0
              }))
            )
          ),
          toArray()
        )
      )
    );

    this.filteredUsers$ = this.users$;
    this.loadUnreadCounts();
  }

  filterUsers(): void {
    this.filteredUsers$ = this.users$.pipe(
      map(users => users.filter(user => user.name.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
  }

  onUserSelect(user: User): void {
    this.recipientId = user.firebaseUid;
    this.loadMessages();
    this.chatService.markMessagesAsRead(user.firebaseUid, this.senderId);
    this.resetUnreadCount(user.firebaseUid);
  }

  resetUnreadCount(userId: string): void {
    this.unreadCounts[userId] = 0;

    this.users$ = this.users$.pipe(
      map(users => users.map(user => ({
        ...user,
        unreadCount: user.firebaseUid === userId ? 0 : user.unreadCount
      })))
    );

    this.filteredUsers$ = this.filteredUsers$.pipe(
      map(users => users.map(user => ({
        ...user,
        unreadCount: user.firebaseUid === userId ? 0 : user.unreadCount
      })))
    );
  }

  loadMessages(): Subscription {
    if (this.senderId && this.recipientId) {
      return this.chatService.getMessages(this.senderId, this.recipientId).subscribe(messages => {
        this.messages$ = of(messages);
      });
    } else {
      console.error('Sender ID or Recipient ID is missing');
      return new Subscription(); // return empty subscription
    }
  }
  

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.senderId, this.recipientId, this.newMessage)
        .then(() => {
          this.newMessage = '';
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  }

  deleteMessage(messageId: string): void {
    this.chatService.deleteMessage(messageId, this.senderId)
      .then(() => {
        console.log('Message deleted successfully');
        this.loadMessages();
      })
      .catch(error => {
        console.error('Error deleting message:', error);
      });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu && !contextMenu.contains(event.target as Node)) {
      contextMenu.style.display = 'none';
    }
  }

  onRightClick(event: MouseEvent, message: any) {
    event.preventDefault();
    this.selectedMessageId = message.id;
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      contextMenu.style.display = 'block';
      contextMenu.style.left = `${event.pageX}px`;
      contextMenu.style.top = `${event.pageY}px`;
    }
  }

  deleteSelectedMessage() {
    if (this.selectedMessageId) {
      this.deleteMessage(this.selectedMessageId);
      const contextMenu = document.getElementById('context-menu');
      if (contextMenu) {
        contextMenu.style.display = 'none';
      }
    }
  }

  loadArtistsWhoSentMessages(): void {
    this.users$ = this.chatService.getUniqueUsersForRole(this.senderId, this.userRole).pipe(
      switchMap((userIds: string[]) =>
        from(userIds).pipe(
          mergeMap(id =>
            this.chatService.getUserDetailsByUid(id).pipe(
              map(userDetails => ({
                firebaseUid: id,
                name: userDetails ? userDetails.displayName : `User`,
                unreadCount: this.unreadCounts[id] || 0
              }))
            )
          ),
          toArray()
        )
      )
    );

    this.filteredUsers$ = this.users$;
    this.loadUnreadCounts();
  }
}
