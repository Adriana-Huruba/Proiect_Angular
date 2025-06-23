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
}