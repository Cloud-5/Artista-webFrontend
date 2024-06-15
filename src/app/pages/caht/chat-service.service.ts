import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, addDoc, orderBy, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private messagesCollection;

  constructor(private firestore: Firestore) {
    this.messagesCollection = collection(this.firestore, 'messages');
  }

  sendMessage(senderId: string, recipientId: string, message: string): Promise<void> {
    const timestamp = Timestamp.fromDate(new Date());

    return addDoc(this.messagesCollection, {
      senderId,
      recipientId,
      message,
      timestamp
    }) as unknown as Promise<void>;
  }

  getMessages(senderId: string, recipientId: string): Observable<any[]> {
    const messagesQuery = query(
      this.messagesCollection,
      where('senderId', 'in', [senderId, recipientId]),
      where('recipientId', 'in', [senderId, recipientId]),
      orderBy('timestamp')
    );

    return collectionData(messagesQuery, { idField: 'id' });
  }

  getMessagesForArtist(artistId: string): Observable<any[]> {
    const messagesQuery = query(
      this.messagesCollection,
      where('recipientId', '==', artistId),
      orderBy('timestamp')
    );

    return collectionData(messagesQuery, { idField: 'id' });
  }

  getUniqueCustomersForArtist(artistId: string): Observable<string[]> {
    const messagesQuery = query(
      this.messagesCollection,
      where('recipientId', '==', artistId)
    );

    return collectionData(messagesQuery, { idField: 'id' }).pipe(
      map(messages => {
        const uniqueCustomerIds = new Set<string>();
        messages.forEach((message: any) => {
          uniqueCustomerIds.add(message.senderId);
        });
        return Array.from(uniqueCustomerIds);
      })
    );
  }
}
