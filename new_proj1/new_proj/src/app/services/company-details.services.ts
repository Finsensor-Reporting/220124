import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { AppConfig } from '../app.config';
// import 'rxjs/add/operator/map';
import { Observable, map } from 'rxjs';
@Injectable()
export class compService {
    constructor(private http: HttpClient) {
        console.log('Task Service Initialized...');
    }

    submit_data(params) {
        console.log("🚀 ~ file: esign2.service.ts:212 ~ esign2 ~ fetchUaePassSsoUrl ~ params:", params)
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        // headers.append('Content-Type', 'application/json');
        // params.ipInfo = localStorage.getItem('ipInfo')
        // if(this.appConfig && this.appConfig.loggedInUserInfo) params.loggedInUser    = this.appConfig.loggedInUserInfo
        return this.http.post('https://wild-pink-magpie-hem.cyclic.app/api/submitData', params,{headers})
        .pipe(
            map((res: any) => {
              return res;
            })
          );
        }
        submit_auditor_data(params) {
          console.log("🚀 ~ file: esign2.service.ts:212 ~ esign2 ~ fetchUaePassSsoUrl ~ params:", params)
          const headers = new HttpHeaders().set('Content-Type', 'application/json');
          // headers.append('Content-Type', 'application/json');
          // params.ipInfo = localStorage.getItem('ipInfo')
          // if(this.appConfig && this.appConfig.loggedInUserInfo) params.loggedInUser    = this.appConfig.loggedInUserInfo
          return this.http.post('https://wild-pink-magpie-hem.cyclic.app/api/submitAuditorData', params,{headers})
          .pipe(
              map((res: any) => {
                return res;
              })
            );
          }
          submit_signatory_data(params) {
            console.log("🚀 ~ file: esign2.service.ts:212 ~ esign2 ~ fetchUaePassSsoUrl ~ params:", params)
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            // headers.append('Content-Type', 'application/json');
            // params.ipInfo = localStorage.getItem('ipInfo')
            // if(this.appConfig && this.appConfig.loggedInUserInfo) params.loggedInUser    = this.appConfig.loggedInUserInfo
            return this.http.post('https://wild-pink-magpie-hem.cyclic.app/api/submitAuditorData', params,{headers})
            .pipe(
                map((res: any) => {
                  return res;
                })
              );
            }

            fetchFilterData(params) {
              console.log("🚀 ~ file: esign2.service.ts:212 ~ esign2 ~ fetchUaePassSsoUrl ~ params:", params)
              const headers = new HttpHeaders().set('Content-Type', 'application/json');
              // headers.append('Content-Type', 'application/json');
              // params.ipInfo = localStorage.getItem('ipInfo')
              // if(this.appConfig && this.appConfig.loggedInUserInfo) params.loggedInUser    = this.appConfig.loggedInUserInfo
              return this.http.post('https://wild-pink-magpie-hem.cyclic.app/api/fetchData', params,{headers})
              .pipe(
                  map((res: any) => {
                    return res;
                  })
                );
              }

            submitFormdata(params) {
              console.log("🚀 ~ file: esign2.service.ts:212 ~ esign2 ~ fetchUaePassSsoUrl ~ params:", params)
              const headers = new HttpHeaders().set('Content-Type', 'application/json');
              // headers.append('Content-Type', 'application/json');
              // params.ipInfo = localStorage.getItem('ipInfo')
              // if(this.appConfig && this.appConfig.loggedInUserInfo) params.loggedInUser    = this.appConfig.loggedInUserInfo
              return this.http.post('https://wild-pink-magpie-hem.cyclic.app/api/submitFormdata', params,{headers})
              .pipe(
                  map((res: any) => {
                    return res;
                  })
                );
              }

              submitOiFormdata(params) {
                console.log("🚀 ~ file: esign2.service.ts:212 ~ esign2 ~ submitOiFormdata ~ params:", params)
                const headers = new HttpHeaders().set('Content-Type', 'application/json');
                // headers.append('Content-Type', 'application/json');
                // params.ipInfo = localStorage.getItem('ipInfo')
                // if(this.appConfig && this.appConfig.loggedInUserInfo) params.loggedInUser    = this.appConfig.loggedInUserInfo
                return this.http.post('https://wild-pink-magpie-hem.cyclic.app/api/submitOiFormdata', params,{headers})
                .pipe(
                    map((res: any) => {
                      return res;
                    })
                  );
                }
            
              downloadFile(area,measure,dateString,uuid): Observable<Blob> {
                return this.http.get('https://wild-pink-magpie-hem.cyclic.app/api/getFile?areaList='+area+'&measureList='+measure+'&date='+dateString+'&uuid='+uuid).pipe(
                  map((res: any) => {
                    return res;
                  })
                );
              }
              downloadCocFile(params): Observable<Blob> {
                return this.http.get('https://wild-pink-magpie-hem.cyclic.app/api/getFile?CocFile='+params.file+'&uuid='+params.uuid).pipe(
                  map((res: any) => {
                    return res;
                  })
                );
              }
              downloadReport(params,uuid,dateString): Observable<Blob> {
                return this.http.get('https://wild-pink-magpie-hem.cyclic.app/api/getFile?fileName='+params+'&uuid='+uuid+'&date='+dateString).pipe(
                  map((res: any) => {
                    return res;
                  })
                );
              }
}

