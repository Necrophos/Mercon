import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShareService } from './share.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private auth: AuthService, private router: Router, private shareSerivce: ShareService) { }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {
         console.log(this.auth.isLoggedIn())
      if (this.auth.isLoggedIn()) {
         return true;
      }
      this.router.navigate(['/login']);
      return false;
   }
}
