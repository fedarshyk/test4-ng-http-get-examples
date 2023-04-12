import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, from, observable, combineLatest, forkJoin, concat, merge    } from 'rxjs';
import { map, mapTo, tap, concatAll,  mergeAll, mergeMap, switchMap   } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({ selector: 'get-request', templateUrl: 'get-request.component.html' })
export class GetRequestComponent implements OnInit {
    totalAngularPackages;
    packages;
    selectedPackage;

    constructor(private http: HttpClient) { }

    ngOnInit() {

        this.packages = [];

        let obs: Observable<any>;
        // let obs: Observable<any> = new Observable((observer) => {
        //     observer.next(this.getList('npm'));
        // });

        obs = this.getList('npm');

        obs.pipe(concatAll()).subscribe(list => {
            this.packages = this.packages.concat(list);
        });
        
        // obs = obs.pipe(map(list => this.process(list)
        // ));


        // obs.pipe(mergeMap((v: any, index: number) => {
        //     return of({name: v.name});
        // })).subscribe(list => {
        //     this.packages = list;
        // });

        // this.http.get<any>('https://api.npms.io/v2/search?q=scope:npm').pipe(map(data => data.results)).subscribe(list => {
        //     //debugger;
        //     this.packages = list;
        //     this.totalAngularPackages = list.length;
        // })        

        // this.http.get<any>('https://api.npms.io/v2/search?q=scope:npm').subscribe(data => {
        //     //debugger;
        //     this.packages = data.results;
        //     this.totalAngularPackages = data.total;
        // })        
    }

    onSelect(pckage: any): void {
        this.selectedPackage = pckage;
    }

    truncateToObsPackageItem(list: any[]): Observable<PackageItem>[] {

        const delim = "/";
        let res: Observable<PackageItem>[] = [];
        list.forEach(function (value) {
            const f: string = value.package.name.split(delim).slice(1).join(''); 
            //const l = this.getList("npm").pipe(concatAll());
            res = res.concat(of({name: f}));
            
            //res = res.concat(this.getList("npm").pipe(concatAll()));
        }); 
        return res;
    }  

    truncateToPackageItem(list: any[]): PackageItem[] {

        const delim = "/";
        let res: PackageItem[] = [];
        list.forEach(function (value) {
            const f: string = value.package.name.split(delim).slice(1).join(''); 
            res = res.concat({name: f});
        }); 
        return res;
    }  

    truncate(list: any[]): Observable<PackageItem> {
        //return list.concat(list);
        //let obsRes = Observable<PackageItem>;
        const packages = new Observable<PackageItem>((observer) => {
            let watchId: number;

            const delim = "/";
            let res: PackageItem;
            list.forEach(function (value) {
                const f: string = value.package.name.split(delim).slice(1).join(''); 
                res = {name: f};
                observer.next(res);
            }); 
      });
      return packages;  
    }

    process1(list: any[]): any[] {
        //return list.concat(list);
        const delim = "/";
        let res: any[] = [];
        list.forEach(function (value) {
            const f: string = value.package.name.split(delim).slice(1).join(''); 
            if(f.indexOf("k", 0) > 0) {
                res = res.concat(value);
            }
             //console.log(value);
        }); 
        return res;
    }  

    getList(condition: string): Observable<any>
    {
        let obs = this.http.get<any>(`https://api.npms.io/v2/search?q=scope:${condition}`).pipe(map(data => this.truncateToObsPackageItem(data.results)), concatAll());

        // obs.subscribe(list => {
        //     //debugger;
        //     this.packages = list;
        //     this.totalAngularPackages = list.length;
        // })   
        return obs;
    }

    // getList1(condition: string): PackageItem[]
    // {
    //     let obs = this.http.get<any>(`https://api.npms.io/v2/search?q=scope:${condition}`).pipe(map(data => this.truncateToObsPackageItem(data.results)), concatAll());

    //     // obs.subscribe(list => {
    //     //     //debugger;
    //     //     this.packages = list;
    //     //     this.totalAngularPackages = list.length;
    //     // })   
    //     return forkJoin(obs);
    // }

}

interface PackageItem {
    name: string;
  }