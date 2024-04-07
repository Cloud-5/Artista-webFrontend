// import { Component,OnInit } from '@angular/core';



// interface User {
//   name: string;
//   avatar: string;
//   online: boolean;
//   status: string;
//   lastSeen: string;
//   messages: Message[];
// }

// interface Message {
//   text: string;
//   time: string;
//   from: string;
//   avatar: string;
// }

// @Component({
//   selector: 'app-message',
//   templateUrl: './message.component.html',
//   styleUrl: './message.component.css'
// })
// export class MessageComponent implements OnInit  {

//   messages = [
//     {from: 'John Doe', message: 'Hello, how are you?', time: '21/10/2022 4.49 PM'},
//     {from: 'John Doe', message: 'I want to confirm...', time: '21/10/2022 4.49 PM'}
//   ];



//   ngOnInit(): void {
    
//   }
//   users: User[] = [
//     {
//       name: 'Vincent Porter',
//       avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
//       online: false,
//       status: 'left 7 mins ago',
//       lastSeen: '2 hours ago',
//       messages: []
//     },
//     // Add other users here
//   ];
//   currentUser: string = 'Aiden Chavez'; // Change this to the current user's name
//   selectedUser: User | undefined;
//   newMessage: string = '';

//   constructor() {
//     this.selectedUser = this.users.find(user => user.name === this.currentUser);
//   }

//   get selectedUserMessages(): Message[] {
//     return this.selectedUser ? this.selectedUser.messages : [];
//   }

//   sendMessage() {
//     if (this.selectedUser && this.newMessage.trim() !== '') {
//       const newMessage: Message = {
//         text: this.newMessage,
//         time: new Date().toLocaleTimeString(),
//         from: this.currentUser,
//         avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png' // Change this to the current user's avatar
//       };
//       this.selectedUser.messages.push(newMessage);
//       this.newMessage = '';
//     }
//   }
// }





// chat.component.ts
import { Component } from '@angular/core';

@Component({
   selector: 'app-message',
     templateUrl: './message.component.html',
   styleUrl: './message.component.css'
   })
export class MessageComponent {
  messages = [
    { from: 'Vincent Porter', message: 'Hi Aiden, how are you? How is the project coming along?', time: '10:10 AM, Today' },
    { from: 'Me', message: 'Are we meeting today?', time: '10:12 AM, Today' },
    { from: 'Me', message: 'Project has been already finished and I have results to show you.', time: '10:15 AM, Today' }
  ];

  constructor() { }

  sendMessage(messageInput: HTMLInputElement) {
    const newMessage = {
      from: 'Me',
      message: messageInput.value,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
    };
    this.messages.push(newMessage);
    messageInput.value = '';
  }
}
