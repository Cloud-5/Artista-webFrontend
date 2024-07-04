import { Component, HostListener, OnInit } from '@angular/core';
import { ChatServiceService } from '../chat-screen/service/chat-service.service';
import { Observable, from, of } from 'rxjs';
import {  map, mergeMap, switchMap, toArray } from 'rxjs/operators';

interface Customer {
  firebaseUid: string;
  name: string;
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
  customers$: Observable<Customer[]> = of([]); // List of customers who have sent messages
  selectedCustomerMessages$!: Observable<any[]>; // Messages from selected customer
  selectedMessageId: string = '';
  constructor(private chatService: ChatServiceService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.userRole = this.getFromLocalStorage('role', '');
      this.senderId = this.getFromLocalStorage('uid', '');
      this.artistName = this.getFromLocalStorage('artistName', '');
      if (this.userRole === 'enthusiast') {
        this.recipientId = this.getFromLocalStorage('artistFirebaseUid', '');
        this.loadMessages();
      } else if (this.userRole === 'artist') {
        this.loadCustomersWhoSentMessages();
      }
    } 
  }

  private getFromLocalStorage(key: string, defaultValue: string): string {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      return localStorage.getItem(key) || defaultValue;
    } else {
      return defaultValue;
    }
  }

  loadCustomersWhoSentMessages(): void {
    this.customers$ = this.chatService.getUniqueCustomersForArtist(this.senderId).pipe(
      switchMap((customerIds: string[]) =>
        from(customerIds).pipe(
          mergeMap(id =>
            this.chatService.getCustomerDetailsByUid(id).pipe(
              map(customerDetails => ({
                firebaseUid: id,
                name: customerDetails ? customerDetails.displayName : `Customer`
              }))
            )
          ),
          toArray()
        )
  )
);}

  onCustomerSelect(customer: Customer): void {
    this.recipientId = customer.firebaseUid;
    this.loadMessages();
  }

  loadMessages(): void {
    if (this.senderId && this.recipientId) {
      this.messages$ = this.chatService.getMessages(this.senderId, this.recipientId);
    } else {
      console.error('Sender ID or Recipient ID is missing');
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
    this.chatService.deleteMessage(messageId)
      .then(() => {
        console.log('Message deleted successfully');
        this.loadMessages(); // Refresh the message list after deletion
      })
      .catch(error => {
        console.error('Error deleting message:', error);
      });
  }

  onRightClick(event: MouseEvent, message: any): void {
    event.preventDefault();
    this.selectedMessageId = message.id; // Assuming message has an 'id' field
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      contextMenu.style.display = 'block';
      contextMenu.style.left = `${event.clientX}px`;
      contextMenu.style.top = `${event.clientY}px`;
    }
  }

  @HostListener('document:click')
  closeContextMenu(): void {
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      contextMenu.style.display = 'none';
    }
  }

  deleteSelectedMessage(): void {
    if (this.selectedMessageId) {
      this.deleteMessage(this.selectedMessageId);
      this.selectedMessageId = '';
    }
    this.closeContextMenu();
}
}
