import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'get-request-typed', templateUrl: 'get-request-typed.component.html' })
export class GetRequestTypedComponent implements OnInit {
    totalAngularPackages;

    constructor(private http: HttpClient) { }

    ngOnInit() {          
        this.http.get<SearchResults>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
            this.totalAngularPackages = data.total;
        })
    }
}

interface SearchResults {
    total: number;
    results: Array<object>;
}