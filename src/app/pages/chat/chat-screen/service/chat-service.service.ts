
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, query, where, getDocs, updateDoc, addDoc, deleteDoc, orderBy, Timestamp, arrayUnion } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';
import { onSnapshot } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  private messagesCollection;

  constructor(private firestore: Firestore) {
    this.messagesCollection = collection(this.firestore, 'messages');
  }

  // getMessages(senderId: string, recipientId: string): Observable<any[]> {
  //   const messagesQuery = query(
  //     this.messagesCollection,
  //     where('senderId', 'in', [senderId, recipientId]),
  //     where('recipientId', 'in', [senderId, recipientId]),
  //     orderBy('timestamp')
  //   );

  //   return collectionData(messagesQuery, { idField: 'id' });
  // }
 
  // getMessages(senderId: string, recipientId: string): Observable<any[]> {
  //   const messagesQuery = query(
  //     this.messagesCollection,
  //     where('senderId', 'in', [senderId, recipientId]),
  //     where('recipientId', 'in', [senderId, recipientId]),
  //     orderBy('timestamp')
  //   );
  
  //   return new Observable(observer => {
  //     const unsubscribe = onSnapshot(messagesQuery, snapshot => {
  //       const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       observer.next(messages);
  //     });
  
  //     // Return the unsubscribe function to stop listening on destroy
  //     return { unsubscribe };
  //   });
  // }
  getMessages(senderId: string, recipientId: string): Observable<any[]> {
    const messagesQuery = query(
      this.messagesCollection,
      where('senderId', 'in', [senderId, recipientId]),
      where('recipientId', 'in', [senderId, recipientId]),
      orderBy('timestamp')
    );
  
    return new Observable(observer => {
      const unsubscribe = onSnapshot(messagesQuery, snapshot => {
        const messages = snapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data, deletedBy: data['deletedBy'] };
        }).filter(message => !(message.deletedBy && message.deletedBy.includes(senderId)));
  
        observer.next(messages);
      });
  
      // Return the unsubscribe function to stop listening on destroy
      return { unsubscribe };
    });
  }

  // sendMessage(senderId: string, recipientId: string, message: string): Promise<void> {
  //   const timestamp = Timestamp.fromDate(new Date());

  //   return addDoc(this.messagesCollection, {
  //     senderId,
  //     recipientId,
  //     message,
  //     timestamp,
  //     read: false // Add a read flag to each message
  //   }) as unknown as Promise<void>;
  // }
  sendMessage(senderId: string, recipientId: string, message: string): Promise<void> {
    const timestamp = Timestamp.fromDate(new Date());

    return addDoc(this.messagesCollection, {
      senderId,
      recipientId,
      message,
      timestamp,
      read: false, // Add a read flag to each message
      "deletedBy": [] // New field to store IDs of users who deleted the message
    }) as unknown as Promise<void>;
  }

  // deleteMessage(messageId: string): Promise<void> {
  //   const messageDocRef = doc(this.firestore, `messages/${messageId}`);
  //   return deleteDoc(messageDocRef);
  // }
  deleteMessage(messageId: string,userId: string): Promise<void> {
    const messageDocRef = doc(this.firestore, `messages/${messageId}`);
  
    return updateDoc(messageDocRef, {
      deletedBy: arrayUnion(userId) // Add the userId to the deletedBy array
    }) as unknown as Promise<void>;
  }

  // getUnreadMessageCount(uid: string): Observable<{ [key: string]: number }> {
  //   const unreadMessagesQuery = query(
  //     this.messagesCollection,
  //     where('recipientId', '==', uid),
  //     where('read', '==', false)
  //   );

  //   return from(getDocs(unreadMessagesQuery)).pipe(
  //     switchMap(snapshot => from(snapshot.docs)),
  //     map(doc => doc.data()),
  //     toArray(),
  //     map(messages =>
  //       messages.reduce((counts, message) => {
  //         const senderId = message['senderId'];
  //         counts[senderId] = (counts[senderId] || 0) + 1;
  //         return counts;
  //       }, {} as { [key: string]: number })
  //     )
  //   );
  // }

  getUnreadMessageCount(uid: string): Observable<{ [key: string]: number }> {
    const unreadMessagesQuery = query(
      this.messagesCollection,
      where('recipientId', '==', uid),
      where('read', '==', false)
    );
  
    return new Observable(observer => {
      const unsubscribe = onSnapshot(unreadMessagesQuery, snapshot => {
        const unreadCounts: { [key: string]: number } = {};
  
        snapshot.forEach(docSnapshot => {
          const message = docSnapshot.data();
          const senderId = message['senderId'];
  
          if (!unreadCounts[senderId]) {
            unreadCounts[senderId] = 0;
          }
  
          unreadCounts[senderId]++;
        });
  
        observer.next(unreadCounts);
      });
  
      // Return the unsubscribe function to stop listening on destroy
      return { unsubscribe };
    });
  }

  markMessagesAsRead(senderId: string, recipientId: string): void {
    const unreadMessagesQuery = query(
      this.messagesCollection,
      where('senderId', '==', senderId),
      where('recipientId', '==', recipientId),
      where('read', '==', false)
    );

    getDocs(unreadMessagesQuery).then(snapshot => {
      snapshot.forEach(docSnapshot => {
        const messageDoc = doc(this.firestore, 'messages', docSnapshot.id);
        updateDoc(messageDoc, { read: true });
      });
    });
  }

  getUniqueUsersForRole(uid: string, role: string): Observable<string[]> {
    const recipientField = role === 'artist' ? 'recipientId' : 'senderId';
    const senderField = role === 'artist' ? 'senderId' : 'recipientId';

    const uniqueUsersQuery = query(
      this.messagesCollection,
      where(recipientField, '==', uid)
    );

    return from(getDocs(uniqueUsersQuery)).pipe(
      switchMap(snapshot => from(snapshot.docs)),
      map(doc => (doc.data() as any)[senderField]),
      toArray(),
      map(uids => Array.from(new Set(uids)))
    );
  }

  getUserDetailsByUid(uid: string): Observable<any> {
    const userDoc = doc(this.firestore, 'users', uid);
    return from(getDoc(userDoc)).pipe(
      map(docSnapshot => docSnapshot.data())
    );
  }
}

