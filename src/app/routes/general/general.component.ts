import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent implements OnInit {
  tabs: string[] = ["Home", "About me", "Contacts", "Map"];

  constructor() { }

  ngOnInit() {
  }

}
