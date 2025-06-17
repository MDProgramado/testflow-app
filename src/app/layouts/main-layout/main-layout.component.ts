import { Component } from '@angular/core';
import { FooterComponentComponent } from "../../footer-component/footer-component.component";
import { HeaderComponentComponent } from "../../header-component/header-component.component";

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, FooterComponentComponent, HeaderComponentComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
