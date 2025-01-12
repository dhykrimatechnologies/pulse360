import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule here
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
import {User} from '../../models/user.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule, CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  loggedIn = false;
  user$: Observable<User | null>;
  public showSearch = false;

  constructor(private modalService: NgbModal, private authService:AuthService, private router:Router) {
    this.user$ = this.authService.getUser(); // Get the user observable from AuthService
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-warning',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]

  logOut(){
    this.authService.logout()
    this.loggedIn = false;
    if (!this.loggedIn) {
      // If the user is not logged in, redirect to home page
      this.router.navigate(['']);  // Redirect to the home page
    }
  }

  ngOnInit(){
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status;

      if (!this.loggedIn) {
        // If the user is not logged in, redirect to home page
        this.router.navigate(['']);  // Redirect to the home page
      }
    });
  }
  ngAfterViewInit() { }
}
