import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TheoremDetailService {
  constructor(
    private http: HttpClient
  ) { }
  getTheoremFast(input: string) {
    let sparql: string = 'SELECT DISTINCT ?theorem ?nom ?description (GROUP_CONCAT(DISTINCT ?formula; SEPARATOR=" £ ") as ?formulas) (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) (GROUP_CONCAT(DISTINCT ?subjectName; SEPARATOR=" | ") as ?subjects) (GROUP_CONCAT(DISTINCT ?referenceName; SEPARATOR=" | ") as ?references) (GROUP_CONCAT(DISTINCT ?proverName; SEPARATOR=" | ") as ?provedBy) WHERE { {?theorem wdt:P31 wd:Q65943} UNION {?theorem wdt:P31 wd:Q24034552}UNION {?theorem wdt:P31 wd:Q877802} UNION {?theorem wdt:P31 wd:Q7849339} UNION {?theorem wdt:P31 wd:Q13220368} SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?theorem rdfs:label ?nom. ?theorem schema:description ?description. } OPTIONAL {?theorem wdt:P2534 ?formula.} OPTIONAL {?theorem wdt:P18 ?image.} OPTIONAL { ?theorem wdt:P361 ?subject. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?subject rdfs:label ?subjectName. } FILTER(!regex(str(?subject), ?subjectName)). } OPTIONAL { ?theorem wdt:P138 ?reference. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?reference rdfs:label ?referenceName. } FILTER(!regex(str(?reference), ?referenceName)). } OPTIONAL { ?theorem wdt:P1318 ?prover. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?prover rdfs:label ?proverName. } FILTER(!regex(str(?prover), ?proverName)). } FILTER(regex(?nom, "^(?=.*'+input+').*", "i")) } GROUP BY ?theorem ?nom ?description ?formula ORDER BY ?nom';
    let url: string = environment.WIKIDATA_URL+sparql;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            name: z['nom']?z['nom']['value']:"",
            img: z['images']?z['images']['value'].split(' | '):"",
            description: z['description']?z['description']['value']:"",
            formulas: z['formulas']?z['formulas']['value'].split(' £ '):"",
            references: z['references']?z['references']['value'].split(' | '):"",
            proofBy: z['provedBy']?z['provedBy']['value'].split(' | '):"",
            subjects: z['subjects']?z['subjects']['value'].split(' | '):"",
          }
        });
      })
    );
  }

  getTheoremMore(input: string) {
    let sparql: string = 'SELECT DISTINCT ?theorem ?nom ?description (GROUP_CONCAT(DISTINCT ?formula; SEPARATOR=" £ ") as ?formulas) (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images)     (GROUP_CONCAT(DISTINCT ?subjectName; SEPARATOR=" | ") as ?subjects)  (GROUP_CONCAT(DISTINCT ?referenceName; SEPARATOR=" | ") as ?references) (GROUP_CONCAT(DISTINCT ?proverName; SEPARATOR=" | ") as ?provedBy)  WHERE { {?theorem wdt:P31 wd:Q7936587} UNION {?theorem wdt:P31 wd:Q9357062} UNION {?theorem wdt:P31 wd:Q10843274} UNION {?theorem wdt:P31 wd:Q12294298} UNION {?theorem wdt:P31 wd:Q15176852} UNION {?theorem wdt:P31 wd:Q15614122} UNION {?theorem wdt:P31 wd:Q15615154} UNION {?theorem wdt:P31 wd:Q16526038} UNION {?theorem wdt:P31 wd:Q16908668} UNION {?theorem wdt:P31 wd:Q16958142} UNION {?theorem wdt:P31 wd:Q16959942} UNION {?theorem wdt:P31 wd:Q17005777} UNION {?theorem wdt:P31 wd:Q17017346} UNION {?theorem wdt:P31 wd:Q17086892} UNION {?theorem wdt:P31 wd:Q17097784} UNION {?theorem wdt:P31 wd:Q18205066} UNION {?theorem wdt:P31 wd:Q18354167} UNION {?theorem wdt:P31 wd:Q18376327} UNION {?theorem wdt:P31 wd:Q18533485} UNION {?theorem wdt:P31 wd:Q18694550} UNION {?theorem wdt:P31 wd:Q20968946} UNION {?theorem wdt:P31 wd:Q21028313} UNION {?theorem wdt:P31 wd:Q21653407} UNION {?theorem wdt:P31 wd:Q24175351} UNION {?theorem wdt:P31 wd:Q28458034} UNION {?theorem wdt:P31 wd:Q28575007} UNION {?theorem wdt:P31 wd:Q39045406} UNION {?theorem wdt:P31 wd:Q43431769} UNION {?theorem wdt:P31 wd:Q47457983} UNION {?theorem wdt:P31 wd:Q77827144} UNION {?theorem wdt:P31 wd:Q77987985} UNION {?theorem wdt:P31 wd:Q85789394} UNION {?theorem wdt:P31 wd:Q91915305} UNION {?theorem wdt:P31 wd:Q97380703} UNION {?theorem wdt:P31 wd:Q98815349} UNION {?theorem wdt:P31 wd:Q104822849} UNION {?theorem wdt:P31 wd:Q105682211} UNION {?theorem wdt:P31 wd:Q107427296} UNION {?theorem wdt:P31 wd:Q109298638} UNION {?theorem wdt:P31 wd:Q110956944} UNION {?theorem wdt:P31 wd:Q113355041} UNION {?theorem wdt:P31 wd:Q113853683} UNION {?theorem wdt:P31 wd:Q122271814} UNION {?theorem wdt:P31 wd:Q122488935} UNION {?theorem wdt:P31 wd:Q122488964} UNION {?theorem wdt:P31 wd:Q3968} UNION {?theorem wdt:P31 wd:Q8084} UNION {?theorem wdt:P31 wd:Q8087} UNION {?theorem wdt:P31 wd:Q11205} UNION {?theorem wdt:P31 wd:Q11216} UNION {?theorem wdt:P31 wd:Q12479} UNION {?theorem wdt:P31 wd:Q12482} UNION {?theorem wdt:P31 wd:Q42989} UNION {?theorem wdt:P31 wd:Q44455} UNION {?theorem wdt:P31 wd:Q76592} UNION {?theorem wdt:P31 wd:Q82571} UNION {?theorem wdt:P31 wd:Q131476} UNION {?theorem wdt:P31 wd:Q134787} UNION {?theorem wdt:P31 wd:Q149972} UNION {?theorem wdt:P31 wd:Q149999} UNION {?theorem wdt:P31 wd:Q150008} UNION {?theorem wdt:P31 wd:Q156495} UNION {?theorem wdt:P31 wd:Q159943} UNION {?theorem wdt:P31 wd:Q162886} UNION {?theorem wdt:P31 wd:Q166314} UNION {?theorem wdt:P31 wd:Q173183} UNION {?theorem wdt:P31 wd:Q180969} UNION {?theorem wdt:P31 wd:Q188444} UNION {?theorem wdt:P31 wd:Q190549} UNION {?theorem wdt:P31 wd:Q193756} UNION {?theorem wdt:P31 wd:Q200802} UNION {?theorem wdt:P31 wd:Q209306} UNION {?theorem wdt:P31 wd:Q211294} UNION {?theorem wdt:P31 wd:Q217413} UNION {?theorem wdt:P31 wd:Q225869} UNION {?theorem wdt:P31 wd:Q233858} UNION {?theorem wdt:P31 wd:Q249148} UNION {?theorem wdt:P31 wd:Q256108} UNION {?theorem wdt:P31 wd:Q264224} UNION {?theorem wdt:P31 wd:Q319400} UNION {?theorem wdt:P31 wd:Q326905} UNION {?theorem wdt:P31 wd:Q332430} UNION {?theorem wdt:P31 wd:Q335632} UNION {?theorem wdt:P31 wd:Q357300} UNION {?theorem wdt:P31 wd:Q430450} UNION {?theorem wdt:P31 wd:Q483270} UNION {?theorem wdt:P31 wd:Q515893} UNION {?theorem wdt:P31 wd:Q579978} UNION {?theorem wdt:P31 wd:Q598451} UNION {?theorem wdt:P31 wd:Q613048} UNION {?theorem wdt:P31 wd:Q621550} UNION {?theorem wdt:P31 wd:Q638755} UNION {?theorem wdt:P31 wd:Q727659} UNION {?theorem wdt:P31 wd:Q4688939} UNION {?theorem wdt:P31 wd:Q4688941} UNION {?theorem wdt:P31 wd:Q4723988} UNION {?theorem wdt:P31 wd:Q4724003} UNION {?theorem wdt:P31 wd:Q4783822} UNION {?theorem wdt:P31 wd:Q4791123} UNION {?theorem wdt:P31 wd:Q4791133} UNION {?theorem wdt:P31 wd:Q5051814} UNION {?theorem wdt:P31 wd:Q5051817} UNION {?theorem wdt:P31 wd:Q5064229} UNION {?theorem wdt:P31 wd:Q5150822} UNION {?theorem wdt:P31 wd:Q5164492} UNION {?theorem wdt:P31 wd:Q5251702} UNION {?theorem wdt:P31 wd:Q5275330} UNION {?theorem wdt:P31 wd:Q5277265} UNION {?theorem wdt:P31 wd:Q5422299} UNION {?theorem wdt:P31 wd:Q5498822} UNION {?theorem wdt:P31 wd:Q5535476} UNION {?theorem wdt:P31 wd:Q5535478} UNION {?theorem wdt:P31 wd:Q5535485} UNION {?theorem wdt:P31 wd:Q5535491} UNION {?theorem wdt:P31 wd:Q5535510} UNION {?theorem wdt:P31 wd:Q5610719} UNION {?theorem wdt:P31 wd:Q5758318} UNION {?theorem wdt:P31 wd:Q5862903} UNION {?theorem wdt:P31 wd:Q5891810} UNION {?theorem wdt:P31 wd:Q5891835} UNION {?theorem wdt:P31 wd:Q6007562} UNION {?theorem wdt:P31 wd:Q6035657} UNION {?theorem wdt:P31 wd:Q6206757} UNION {?theorem wdt:P31 wd:Q6501221} UNION {?theorem wdt:P31 wd:Q6784077} UNION {?theorem wdt:P31 wd:Q6865325} UNION {?theorem wdt:P31 wd:Q6889739} UNION {?theorem wdt:P31 wd:Q7100782} UNION {?theorem wdt:P31 wd:Q7208386} UNION {?theorem wdt:P31 wd:Q7246860} UNION {?theorem wdt:P31 wd:Q7249466} UNION {?theorem wdt:P31 wd:Q7268923} UNION {?theorem wdt:P31 wd:Q7269009} UNION {?theorem wdt:P31 wd:Q7269016} UNION {?theorem wdt:P31 wd:Q7301119} UNION {?theorem wdt:P31 wd:Q7432936} UNION {?theorem wdt:P31 wd:Q7543015} UNION {?theorem wdt:P31 wd:Q7577406} UNION {?theorem wdt:P31 wd:Q7595767} UNION {?theorem wdt:P31 wd:Q7598355} UNION {?theorem wdt:P31 wd:Q7625047} UNION {?theorem wdt:P31 wd:Q7643393} UNION {?theorem wdt:P31 wd:Q7662747} UNION {?theorem wdt:P31 wd:Q7818977} UNION {?theorem wdt:P31 wd:Q7834072} UNION {?theorem wdt:P31 wd:Q729429} UNION {?theorem wdt:P31 wd:Q745328} UNION {?theorem wdt:P31 wd:Q761383} UNION {?theorem wdt:P31 wd:Q771334} UNION {?theorem wdt:P31 wd:Q774123} UNION {?theorem wdt:P31 wd:Q833585} UNION {?theorem wdt:P31 wd:Q847526} UNION {?theorem wdt:P31 wd:Q849798} UNION {?theorem wdt:P31 wd:Q874429} UNION {?theorem wdt:P31 wd:Q876215} UNION {?theorem wdt:P31 wd:Q902618} UNION {?theorem wdt:P31 wd:Q903508} UNION {?theorem wdt:P31 wd:Q923592} UNION {?theorem wdt:P31 wd:Q1005222} UNION {?theorem wdt:P31 wd:Q1005603} UNION {?theorem wdt:P31 wd:Q1017338} UNION {?theorem wdt:P31 wd:Q1056428} UNION {?theorem wdt:P31 wd:Q1076274} UNION {?theorem wdt:P31 wd:Q1077896} UNION {?theorem wdt:P31 wd:Q1122491} UNION {?theorem wdt:P31 wd:Q1128453} UNION {?theorem wdt:P31 wd:Q1154357} UNION {?theorem wdt:P31 wd:Q1154848} UNION {?theorem wdt:P31 wd:Q1166618} UNION {?theorem wdt:P31 wd:Q1197190} UNION {?theorem wdt:P31 wd:Q1198874} UNION {?theorem wdt:P31 wd:Q1201165} UNION {?theorem wdt:P31 wd:Q1208658} UNION {?theorem wdt:P31 wd:Q1224402} UNION {?theorem wdt:P31 wd:Q1227061} UNION {?theorem wdt:P31 wd:Q1238474} UNION {?theorem wdt:P31 wd:Q1281926} UNION {?theorem wdt:P31 wd:Q1308570} UNION {?theorem wdt:P31 wd:Q1309100} UNION {?theorem wdt:P31 wd:Q1332450} UNION {?theorem wdt:P31 wd:Q1339058} UNION {?theorem wdt:P31 wd:Q1345659} UNION {?theorem wdt:P31 wd:Q1350838} UNION {?theorem wdt:P31 wd:Q1392559} UNION {?theorem wdt:P31 wd:Q1548483} UNION {?theorem wdt:P31 wd:Q1626229} UNION {?theorem wdt:P31 wd:Q1636734} UNION {?theorem wdt:P31 wd:Q1666739} UNION {?theorem wdt:P31 wd:Q1756677} UNION {?theorem wdt:P31 wd:Q1783105} UNION {?theorem wdt:P31 wd:Q1783542} UNION {?theorem wdt:P31 wd:Q1789829} UNION {?theorem wdt:P31 wd:Q1855669} SERVICE wikibase:label {  bd:serviceParam wikibase:language "en".  ?theorem rdfs:label ?nom.   ?theorem schema:description ?description. } OPTIONAL {?theorem wdt:P2534 ?formula.} OPTIONAL {?theorem wdt:P18 ?image.}   OPTIONAL { ?theorem wdt:P361 ?subject. SERVICE wikibase:label {  bd:serviceParam wikibase:language "en".  ?subject rdfs:label ?subjectName.   } FILTER(!regex(str(?subject), ?subjectName)). } OPTIONAL { ?theorem wdt:P138 ?reference. SERVICE wikibase:label {  bd:serviceParam wikibase:language "en".  ?reference rdfs:label ?referenceName.  } FILTER(!regex(str(?reference), ?referenceName)).   } OPTIONAL { ?theorem wdt:P1318 ?prover. SERVICE wikibase:label {  bd:serviceParam wikibase:language "en".  ?prover rdfs:label ?proverName.  } FILTER(!regex(str(?prover), ?proverName)).  } FILTER(regex(?nom, "^(?=.*'+input+').*", "i")) } GROUP BY ?theorem ?nom ?description ?formula ORDER BY ?nom';
    let url: string = environment.WIKIDATA_URL+sparql;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            name: z['nom']?z['nom']['value']:"",
            img: z['images']?z['images']['value'].split(' | '):"",
            description: z['description']?z['description']['value']:"",
            formulas: z['formulas']?z['formulas']['value'].split(' £ '):"",
            references: z['references']?z['references']['value'].split(' | '):"",
            proofBy: z['provedBy']?z['provedBy']['value'].split(' | '):"",
            subjects: z['subjects']?z['subjects']['value'].split(' | '):"",
          }
        });
      })
    );
  }
}




