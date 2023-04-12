import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'get-request', templateUrl: 'get-request.component.html' })
export class GetRequestComponent implements OnInit {
    totalAngularPackages;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
            this.totalAngularPackages = data.total;
        })        
    }
}