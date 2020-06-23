import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {ContactModalComponent} from "../contact-modal/contact-modal.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private contactModalComponent: ContactModalComponent, private  router: Router, private authService: AuthService) {
  }

  @ViewChild('content', {static: false}) public templateref: TemplateRef<any>;

  ngOnInit() {
    console.log(this.templateref);
  }

}
