import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn: "root"
})

export class UserManagementService {
    private apiUrl: string = environment.apiUrl + '/user-management';

    constructor(private http: HttpClient) { }

    getApprovedArtists(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/approved-artists`);
    }
    getRegisteredCustomers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/registered-customers`);
    }
    deleteAccount(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/delete-account/:userId`);
    }
    banAccount(userId: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/ban-account/${userId}`, {});
    }
    removeBan(userId: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/remove-ban/${userId}`, {});
    }
    getDeletedAccounts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/deleted-accounts`);
    }
    getBannedAccounts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/banned-accounts`);
    }
}