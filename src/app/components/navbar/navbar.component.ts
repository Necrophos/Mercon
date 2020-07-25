import { ShareService } from './../../services/share.service';
import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { HostListener, PLATFORM_ID, Inject } from "@angular/core";
import {Location} from '@angular/common';
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  @Input() title: any;
  @Input() tradeNumber: any;

  constructor(
    @Inject(PLATFORM_ID) public platformId: string,
    private shareService: ShareService,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  public scrolled: boolean = false;
  public awake: boolean = false;
  public display: boolean = false;
  public stretching: boolean = false;
  public fuelsLogo = "assets/icons/fuels-logo.png";
  public fuelsLogoW = "assets/icons/fuels-logo-white.png";
  companyName: any;
  userName: any;
  isPurchase = false;
  listClientCompanies: any;
  isShowSidebar = true;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > 30;
      this.awake = window.scrollY > 100;
      if (window.scrollY > 30) {
        this.display = true;
        this.fuelsLogo = "/assets/icons/fuels-logo-white.png";
      } else {
        this.fuelsLogo = "/assets/icons/fuels-logo.png";
        this.display = false;
      }
    }
  }


  ngOnInit() {
    this.companyName = this.shareService.getListCompany()[0].companyCd;
    this.listClientCompanies = this.shareService.getListCompany();
    this.userName = this.shareService.getUser().userName;
    this.shareService.client.subscribe((res) => {
      if (res) {
        this.companyName = res.companyCd
      }
    });
    this.shareService.tradeNumber.subscribe((res) => {
      this.tradeNumber = res;
    })
    
  }

  backToPrevPage(){
    this._location.back();
    // if (this.router.url == "/home") {
    //   this.shareService.getBreadcrumb('home');
    //   this.shareService.getTradeNumber('')
    // }
  }
  
  
  changeClient(client) {
    this.shareService.setClient(client);
    this.shareService.companyNum = client.companyNum;
    this.stretching = !this.stretching;
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  showMobileNav() {
    this.stretching = !this.stretching;
  }

  hiddenMobileNav() {
    this.stretching = !this.stretching;
  }

  showSidebar(isShow) {
    this.shareService.displaySidebar(isShow)
  }
}
