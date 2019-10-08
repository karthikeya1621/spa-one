import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contactForm: FormGroup;
  name: string;

  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl()
    });
  }

  sendMessage() {

  }

}
