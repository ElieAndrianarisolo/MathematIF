import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Field } from './field';
import {Filters} from "./filters";
import {forkJoin} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  public filters: Filters = {
    mathematicians: true,
    domains: false,
    theorems: false
  }

  constructor(
    private http: HttpClient
  ) { }

  setFilters(filters:Filters) {
    this.filters = filters;
  }

  search(searchInput: string | null = null, ) {
    let sources = [];
    if (this.filters.mathematicians && searchInput) {
      sources.push(this.searchMathematician(searchInput));
    }
    if (this.filters.domains && searchInput) {
      sources.push(this.searchDomain(searchInput))
    }
    if (this.filters.theorems && searchInput ) {
      sources.push(this.searchTheorem(searchInput))
    }
    return forkJoin(...sources);
  }

  searchDomain(input: string) {
    let sparql: string = 'SELECT DISTINCT ?field ?nom (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) WHERE { ?field wdt:P31 wd:Q1936384. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?field rdfs:label ?nom. ?field schema:description ?description. } OPTIONAL {?field wdt:P18 ?image} FILTER (regex(?nom, "^(?=.*'+input+').*", "i")) } GROUP BY ?nom ?field';
    let url: string = environment.WIKIDATA_URL+sparql;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            value: z['nom']['value'],
            img: z['img'] ?z['img']['value']:"",
            field: Field.SUBJECT
          }
        });
      })
    );
  }

  searchMathematician(input: string) {
    let sparql: string = 'SELECT DISTINCT ?name ?img ?dateNaissance ?dateMort WHERE { {?m a yago:Mathematician110301261} UNION {?m dbo:mainInterest dbr:Mathematics} UNION {?m dbp:field dbr:Mathematics} UNION {?m dbp:mainInterests dbr:Islamic_mathematics} ?m a foaf:Person. ?m dbp:name ?name FILTER(langMatches(lang(?name), "EN")) FILTER ( regex(?name, "^(?=.*'+input+').*", "i") ) OPTIONAL{?m dbo:thumbnail ?img} OPTIONAL {?m dbo:birthDate ?dateNaissance} OPTIONAL {?m dbo:deathDate ?dateMort} }';
    let url: string = environment.DBPEDIA_URL+sparql;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            value: z['name']['value'],
            img: z['img'] ?z['img']['value']:"",
            field: Field.MATHEMATICIAN
          }
        });
      })
      );
  }

  searchTheorem(input: string) {
    let sparql: string = 'SELECT DISTINCT ?theorem ?nom (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) WHERE { {?theorem wdt:P31 wd:Q65943} UNION {?theorem wdt:P31 wd:Q24034552} SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?theorem rdfs:label ?nom.  } OPTIONAL{?theorem wdt:P18 ?image.} FILTER(regex(?nom, "^(?=.*'+input+').*", "i")) } GROUP BY ?theorem ?nom';
    let url: string = environment.WIKIDATA_URL+sparql;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            value: z['nom']['value'],
            img: z['img'] ?z['img']['value']:"",
            field: Field.THEOREM
          }
        });
      })
    );
  }
}




