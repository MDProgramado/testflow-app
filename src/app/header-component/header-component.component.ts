import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificatonComponent } from "../notificaton/notificaton.component";

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterLink, NotificatonComponent],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {

}
