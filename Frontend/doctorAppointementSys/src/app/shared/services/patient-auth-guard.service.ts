import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthGuard implements CanActivate{

  constructor(
      private router: Router,
      private auth: AuthService) { }

  canActivate(router, state: RouterStateSnapshot) {
    let user = this.auth.currentUser;
    if (user) return true;
    
    this.router.navigate(['patientSignIn'],{ queryParams: { returnUrl: state.url  } } )
    return false;
  }
}
