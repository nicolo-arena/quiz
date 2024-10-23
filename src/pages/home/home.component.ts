import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'animate.css';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  startEnabled: boolean = false;
  modalSuccess: boolean = true;
  modalText: string = '';
  showModal: boolean = false;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.isStartEnabled();
  }

  isStartEnabled() {
    const config = this.configService.getConfig();
    this.startEnabled = config ? true : false;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
