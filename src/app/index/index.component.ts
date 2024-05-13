import { Component } from '@angular/core';
import { FooterComponent } from '../headfoot/footer/footer.component';
import { HeaderComponent } from '../headfoot/header/header.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
