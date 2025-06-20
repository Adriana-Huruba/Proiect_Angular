import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root'})

export class UserService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    addUser(user: Omit<User, 'id'>): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    getUser(email:string, password:string): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
    }
}   