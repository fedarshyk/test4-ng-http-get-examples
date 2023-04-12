import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'get-request-headers', templateUrl: 'get-request-headers.component.html' })
export class GetRequestHeadersComponent implements OnInit {
    totalAngularPackages;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
        this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular', { headers }).subscribe(data => {
            this.totalAngularPackages = data.total;
        })
    }
}