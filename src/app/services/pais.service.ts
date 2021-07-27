import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'; //Observable transformed by the given `project` function.

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises(){
    //transformar la informacion que se regresa usando map y pipe
    //trnasformando todo en un nuevo valor
    // return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    //   .pipe(
    //     map( resp => {
    //       return "hola mundo"
    //     })
    //   );


      //trnasformando todo en un nuevo valor, funcionando pero se puede simplicar mas abajo sin return

      // return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      // .pipe(
      //   map( (resp:any[]) => {
      //         return resp.map( pais => {
      //             return {
      //               nombre:pais.name,
      //               codigo: pais.alpha3Code
      //             }

      //         })
      //   })
      // );

      return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map((resp:any[]) =>
          resp.map(pais => ({nombre:pais.name,codigo:pais.alpha3Code})
        )
      )
    );
  }
}

/*Angular is an opinionated framework—meaning the framework wants you to do things the Angular way. That doesn't mean you have to do things their way.

Use either the fetch() or the httpClient freely. They're two different approaches to the same problem and you should pick one based on the context of your needs.

Using fetch() will return a promise. Using Angular's httpClient will return an Observable, which has features that Promises don't. You can convert it with Observable.toPromise(), but then... why use an Observable?

Here's why Angular wants you to use httpClient:

Additional benefits of HttpClient include testability features, typed request and response objects, request and response interception, Observable apis, and streamlined error handling.*/



