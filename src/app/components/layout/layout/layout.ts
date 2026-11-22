import { Component } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Topbar, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout { }
