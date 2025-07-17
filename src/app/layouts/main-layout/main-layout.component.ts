import { Component } from '@angular/core';
import { FooterComponentComponent } from "../../components/footer-component/footer-component.component";


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { HeaderComponentComponent } from '../../components/header-component/header-component.component';
import { SumaryComponent } from "../../components/sumary/sumary.component";

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, FooterComponentComponent, HeaderComponentComponent, RouterModule, SumaryComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
