import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, from, observable, combineLatest, forkJoin, concat, merge, NEVER    } from 'rxjs';
import { map, mapTo, tap, concatAll,  mergeAll, mergeMap, switchMap, concatMap, scan   } from 'rxjs/operators';
import { of } from 'rxjs';
import { ElementSchemaRegistry } from "@angular/compiler";


@Component({ selector: 'get-request', templateUrl: 'get-request.component.html' })
export class GetRequestComponent implements OnInit {
    totalAngularPackages;
    packages = [];
    selectedPackage;

    constructor(private http: HttpClient) { }

    ngOnInit() {


        

        
        //Work
        this.packages = [];
        let obs: Observable<any>;
        obs = this.getList('npm');
        obs.subscribe(list => {
            console.log(`subscribe change(${JSON.stringify(list)})`)
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

    test1(): void {

        var obs1 = 
        from(["a", "b", "c"]).pipe(
        concatMap(
            (value) => {
                console.log(`concatMap(${value})`)
                if(value.indexOf("b", 0) == -1) {
                  return of(value)
                } else {
                    console.log(`concatMap change(${value})`)
                    return of(value + '_');

                }
            }
        ),
        scan((acc, value) => {
        //clone initial value
          console.log(`scan(${value})`);
          if (acc.length == 0) {

                 acc = [];
              }
          console.log(`scan_(${JSON.stringify(acc)})`);

          

          if(value.indexOf("b", 0) == -1) {
            acc = [];
            acc.push(value);
          } else {
          }

          return acc 
        }, []))
        ; // Note that an empty array is use as the seed
        obs1.subscribe(value => console.log("subscribe: " + JSON.stringify(value)));
        //obs1.subscribe(value => console.log(JSON.stringify(value)));

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
        let obs = this.http.get<any>(`https://api.npms.io/v2/search?q=scope:${condition}`).pipe(map(data => this.truncateToPackageItem(data.results)), mergeAll())
        .pipe(
            mergeMap((data) => {
            if(condition == 'npm') {
                data.name = 'npm: ' + data.name;
                return merge(of(data), this.getList('angular'));
                //return this.getList('angular');    
            } else {

                data.name = 'not_npm: ' + data.name;

                return of(data);
            }

         })
            // switchMap(data => {
            //     if (data.name.indexOf("s", 0) > -1) {
            //         return of(data);
            //     }
            //     else
            //     {
            //         if(condition == 'npm') {
            //             //console.log(`switchMap new list(${JSON.stringify(data)})`);
            //             //let obs = this.getList('angular');
            //             //return obs;
            //             return of(data);
            //         } else {
            //             return NEVER;

            //         }
            //     }

            // }),
            
            // scan((acc, value: any) => {
            //     //clone initial value
            //       console.log(`scan(${JSON.stringify(value)})`);
            //       if (acc.length == 0) {
        
            //              acc = [];
            //           }
            //       console.log(`array is (${JSON.stringify(acc)})`);
        
            //       //acc.push(value);
            //       try {
            //         if(value instanceof Boolean) {
            //         } else {
            //             if(value.name.indexOf("s", 0) > -1) {
            //                 //acc = [];
            //                 acc.push(value);
            //             } else {
            //                 value.name = value.name + '_________';
            //                 acc.push(value);
                            
            //                 if(condition == 'npm') {
            //                     //this.getList('angular')
            //                     let obs = this.getList('angular');    
            //                     acc.push(obs);                            
            //                 }
            //             }
    
            //         }
                        
            //       } catch (error) {
                
            //       }
        
        
            //       return acc 
            //     }, []),            
            
            
        //     mergeMap(
        //     data=> {
        //         if(condition == 'npm')
        //         {
        //             return this.getList("angular");
        //         }
        //         else
        //         {
        //             return data;
        //         }
        //     }
        // )

        );
        //mergeAll()
        //concatMap(data=>data)
        //, map(data => data
            //{
            //if(data.name.indexOf("a", 0) >= 0) {
            // if(false) {
            //     return this.getList("angular");
            // }
            // else
            // {
            //     return of(data);
            // }
            // }
        //), mergeAll());

        // obs.subscribe(list => {
        //     //debugger;
        //     this.packages = list;
        //     this.totalAngularPackages = list.length;
        // })   
        return obs;
    }

    getList1(condition: string): any
    {
        let obs = this.http.get<any>(`https://api.npms.io/v2/search?q=scope:${condition}`).pipe(map(data => this.truncateToPackageItem(data.results)), mergeAll(), map(data => {
            return this.getList("angular");
        }));

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