import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Field } from './field';


@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(
    private http: HttpClient
  ) { }

  getSubject(input: string) {
    let sparql: string = 'SELECT DISTINCT ?field ?nom ?description ?subClassName (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) ?namedAfter (GROUP_CONCAT(DISTINCT ?inventor; SEPARATOR=" | ") as ?inventors) (GROUP_CONCAT(DISTINCT ?nameOfInventor; SEPARATOR=" | ") as ?nameOfInventors) WHERE { ?field wdt:P31 wd:Q1936384. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?field rdfs:label ?nom. ?field schema:description ?description. } OPTIONAL{?field wdt:P18 ?image}. OPTIONAL{?field wdt:P279 ?subClass SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?subClass rdfs:label ?subClassName}}. OPTIONAL{?field wdt:P138 ?reference.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?reference rdfs:label ?namedAfter}}. OPTIONAL{?field wdt:P138 ?inventor.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?inventor rdfs:label ?nameOfInventor}}.  FILTER ( regex(?nom, "^(?=.*'+input+').*", "i") ) } GROUP BY ?field ?nom ?description ?namedAfter ?subClassName ORDER BY ?field';
    let url: string = environment.WIKIDATA_URL+sparql;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            value: z['nom'] ? z['nom']['value']: "",
            img: z['images'] ? z['images']['value'].split(' | ')[0]: "",
            description: z['description'] ? z['description']['value']: "",
            inventor: z['nameOfInventors'] ? z['nameOfInventors']['value'] : "",
            subSubject: z['subClassName'] ? z['subClassName']['value']: "",
            field: Field.SUBJECT}
        });
      })
      );
  }
}
