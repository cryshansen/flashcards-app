import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactModalService } from '../../services/contact-modal.service';
@Component({
  selector: 'app-about',
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  showContact = false;
  constructor(private contactModalS:ContactModalService){}
  openContact(){
    this.showContact = true;
    this.contactModalS.open();
  }
  closeModal(){this.showContact = false; this.contactModalS.close();}

}
