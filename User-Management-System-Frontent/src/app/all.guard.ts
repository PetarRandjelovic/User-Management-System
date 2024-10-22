import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
  
} from '@angular/router';
import { Observable } from 'rxjs';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AllGuard implements CanActivate {

    decoded: any;
  constructor(private router: Router) {
  }
  

  canActivate(
    




    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let permissionsString = localStorage.getItem("token") || '';;


  this.decoded = jwtDecode(permissionsString);


  let permissions=this.decoded.permissions;

 

      if(permissions[2] === 'createuser' ||permissions[1] === 'deleteuser'||  permissions[0] === 'readuser' || permissions[3] === 'updateuser' ){
        return true;
    }
      else{
    alert("You dont have any permissions!")
    return true;
      }

     


  }

}