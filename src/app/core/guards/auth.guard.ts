import { inject } from "@angular/core"
import { Router } from "@angular/router";

export function authGuard() {
    return() =>{
        const router=inject(Router);
        if(localStorage.getItem("userToken") || sessionStorage.getItem("userToken")){
            return true;
        }
        else{
            router.navigate(["/login"]);
            return false;
        }
    }
}