import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [NgbModal]
})
export class AlertComponent implements OnInit {

  @Input() msg;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
