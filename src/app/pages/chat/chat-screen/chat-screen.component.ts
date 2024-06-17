import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../caht/chat-service.service';
import { Observable, of } from 'rxjs';
import {  map } from 'rxjs/operators';

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
      map((customerIds, index) => {
        // Create customer list with generic names
        return customerIds.map((id, index) => ({
          firebaseUid: id,
          name: `Customer ${index + 1}`
        }));
      })
    );
  }

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
}
