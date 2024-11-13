import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService, Observable, OntimizeService } from 'ontimize-web-ngx';
import { PasswordInput } from '../main/users/users-detail/users-detail.component';
import { BehaviorSubject } from 'rxjs';
import { OResponse } from '../models/response';
import { CONFIG } from '../app.config'

@Injectable({ providedIn: 'root' })
export class UserService {

    private passwordBD: BehaviorSubject<PasswordInput> = new BehaviorSubject<PasswordInput>({ password: "" });
    private id = this.authService.getSessionInfo().id;
    private urlEndpoint: string = CONFIG.apiEndpoint + '/users';
    private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.id });
    private wellcome: BehaviorSubject<Observable<any>> = new BehaviorSubject<Observable<any>>(null);
    public nameUser: string = this.authService.getSessionInfo().user;

    constructor(private http: HttpClient, @Inject(AuthService) private authService: AuthService,
        private ontimizeService: OntimizeService,) { }

    getCurrentUser(): string {
        return this.authService.getSessionInfo().user;
    }

    getUser(): Observable<OResponse> {
        this.nameUser = this.authService.getSessionInfo().user;
        this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('users'));
        return this.ontimizeService.query({ 'user_': this.nameUser }, ['user_', 'name', 'surname1', 'rolename'], 'user');
    }

    getWellcome(): Observable<any> {
        return this.wellcome.asObservable();
    }

    setWellcome(wellcome: any) {
        return this.wellcome.next(wellcome);
    }

    getPasswordBD(): Observable<PasswordInput> {
        return this.passwordBD.asObservable();
    }

    setPasswordBD(pass: PasswordInput) {
        this.passwordBD.next(pass);
    }

    clearPasswordDB() {
        this.passwordBD.next({ password: "" });
    }

    genPass(user_: string) {

        return this.http.post(this.urlEndpoint.concat('/genPass'), user_, { headers: this.httpHeader })
    }

}