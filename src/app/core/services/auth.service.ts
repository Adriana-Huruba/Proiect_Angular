import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

export interface LoginPayload {
    email: string;
    password: string;
    rememberMe?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl='http://localhost:3000/users';
    constructor(private http: HttpClient){}

    login(email: string, password: string): Observable<any> {
        return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
            .pipe(map(users=>
                users.length > 0 ? users[0] : null
            ));
    }

    setToken(token: string): void {
        localStorage.setItem('userToken', token);
    }
    getToken(): string | null {
        return localStorage.getItem('userToken');
    }
    // private userToken: string = "";

    // constructor(private http: HttpClient, private router:Router)
    // {
    //     if(sessionStorage.getItem("userToken")){
    //         this.setToken(sessionStorage.getItem("userToken") || "")
    //     }
    // }

    // getToken(): string {
    //     return this.userToken;
    // }

    // setToken(token: string) {
    //     this.userToken = token;
    //     //sessionStorage.setItem("userToken", token);
    // }

    // succesfulLogin(payload: LoginPayload): Observable<any>
    // {
    //     return this.http.post("https://reqres.in/api/login", payload, {headers: {"x-api-key": "reqres-free-v1"}})
    //     .pipe(
    //         map((response: any) => {
    //         console.log(response);
    //         return response;
    //     }));
    // }

    // logout(){
    //     this.userToken ="";
    //     sessionStorage.clear();
    //     localStorage.clear();
    //     this.router.navigate(["/login"]);
    // }
  
}