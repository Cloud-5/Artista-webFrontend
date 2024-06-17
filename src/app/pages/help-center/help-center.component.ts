import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.css'
})
export class HelpCenterComponent implements OnInit{

  constructor(){}
  ngOnInit(): void {
    
  }

  card=[
    {
     
      ArtistName:"John Wick",
      role:"Logo/UI Design",
      follower:"50K",
      likes:"45K",
      creations:"35",
      borderclass: "border-primary",
      color: "blue"
    },
    {
      
      ArtistName:"John Wick",
      role:"Logo/UI Design",
      follower:"50K",
      likes:"45K",
      creations:"35",
      borderclass: "border-primary",
      color: "blue"
    },
    {
     
      ArtistName:"John Wick",
      role:"Logo/UI Design",
      follower:"50K",
      likes:"45K",
      creations:"35",
      borderclass: "border-primary",
      color: "blue"
    },]
}
