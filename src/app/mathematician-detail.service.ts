import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Field} from "./field";


@Injectable({
  providedIn: 'root'
})
export class MathematicianDetailService {

  constructor(
    private http: HttpClient
  ) { }

  getMathematicianPart1(input: string) {
    let sparql1: string = 'SELECT+DISTINCT+xsd%3Astring%28%3Fname%29+AS+%3Fnom+%0D%0A%3Fdescription%0D%0A%3FdateNaissance+%0D%0A%3FdateMort%0D%0A%3Fnationalite%0D%0AGROUP_CONCAT%28DISTINCT+%3Ff%3B+SEPARATOR%3D%22+%7C+%22%29+AS+%3Fp_isKnownFor+%0D%0A%0D%0AWHERE+%7B%0D%0A%0D%0A%7B%3Fm+a+yago%3AMathematician110301261%7DUNION%7B%3Fm+dbo%3AmainInterest+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3Afield+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3AmainInterests+dbr%3AIslamic_mathematics%7D%0D%0A%3Fm+a+foaf%3APerson.+%7B%3Fm+foaf%3Aname+%3Fname%7D+UNION+%7B%3Fm+dbp%3Aname+%3Fname%7D+%0D%0A%0D%0AFILTER%28langMatches%28lang%28%3Fname%29%2C+%22EN%22%29%29%0D%0AFILTER+%28+regex%28%3Fname%2C+%22%5E%28%3F%3D.*'+input+'%29.*%22%2C+%22i%22%29+%29%0D%0A%0D%0AOPTIONAL+%7B%3Fm+dbo%3Aabstract+%3Fdescription.+FILTER%28langMatches%28lang%28%3Fdescription%29%2C+%22EN%22%29%29%7D%0D%0A%0D%0AOPTIONAL+%7B%3Fm+dbo%3AbirthDate+%3FdateNaissance%7D%0D%0A%0D%0AOPTIONAL+%7B%3Fm+dbo%3AdeathDate+%3FdateMort%7D%0D%0A%0D%0AOPTIONAL+%7B%0D%0A%7B%3Fm+dbo%3Anationality+%3Fcountry.+%3Fcountry+rdfs%3Alabel+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnationalite%29%3E0%29.%7D%0D%0AUNION%0D%0A%7B%3Fm+dbo%3AbirthPlace+%3Fplace.+%3Fplace+dbo%3Acountry+%3Fcountry.+%3Fcountry+rdfs%3Alabel+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnationalite%29%3E0%29.%7D%0D%0AUNION%0D%0A%7B%3Fm+dbp%3AbirthPlace+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29+%26%26+datatype%28%3Fnationalite%29+%3D+xsd%3Astring%29%7D%0D%0AUNION%0D%0A%7B%3Fm+dbo%3AbirthPlace+%3Fplace.+%3Fplace+dbp%3AsubdivisionName+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29%29.%7D%0D%0A%7D%0D%0A%0D%0A%0D%0A%0D%0A%7D%0D%0AGROUP+BY+%3Fname+%3Fdescription+%3FdateNaissance+%3FdateMort+%3Fnationalite%0D%0ALIMIT+1';
    let url1: string = environment.DBPEDIA_URL+sparql1;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url1, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings'][0]),
      map((y: any) => {
        console.log(y);
        return {
          description: y['description'] ? y['description']['value'] : "",
          birthDate: y['dateNaissance'] ? y['dateNaissance']['value'] : "",
          deathDate: y['dateMort'] ? y['dateMort']['value'] : "",
          nationality: y['nationalite'] ? y['nationalite']['value'] : ""
        }
      })
    );
  }

  getMathematicianPart2(input: string) {
    let sparql2: string = 'SELECT+DISTINCT+xsd%3Astring%28%3Fname%29+AS+%3Fnom+%0D%0A%3Fimg%0D%0AGROUP_CONCAT%28DISTINCT+%3Foccupation%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fmetier%0D%0A%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_etudiant%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fetudiants%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_universite%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Funiversites%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_discipline%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fdisciplines%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_lieuNaissance%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3FlieuNaissances%0D%0AGROUP_CONCAT%28DISTINCT+%3FknownFor%3B+SEPARATOR%3D%22+%7C+%22%29+AS+%3FisKnownFor%0D%0A%0D%0AWHERE+%7B%0D%0A%0D%0A%7B%3Fm+a+yago%3AMathematician110301261%7DUNION%7B%3Fm+dbo%3AmainInterest+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3Afield+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3AmainInterests+dbr%3AIslamic_mathematics%7D%0D%0A%3Fm+a+foaf%3APerson.+%7B%3Fm+foaf%3Aname+%3Fname%7D+UNION+%7B%3Fm+dbp%3Aname+%3Fname%7D+%0D%0A%0D%0AFILTER%28langMatches%28lang%28%3Fname%29%2C+%22EN%22%29%29%0D%0AFILTER+%28+regex%28%3Fname%2C+%22%5E%28%3F%3D.*'+input+'%29.*%22%2C+%22i%22%29+%29%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AnotableStudent+%3Fs.+%3Fs+dbp%3Aname+%3Fnom_etudiant.+FILTER%28langMatches%28lang%28%3Fnom_etudiant%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_etudiant%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AalmaMater+%3Funiversite.+%3Funiversite+dbp%3Aname+%3Fnom_universite.+FILTER%28langMatches%28lang%28%3Fnom_universite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_universite%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AacademicDiscipline+%3Fdiscipline.+%3Fdiscipline+rdfs%3Alabel+%3Fnom_discipline.+FILTER%28langMatches%28lang%28%3Fnom_discipline%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_discipline%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B%3Fm+dbo%3AbirthPlace+%3FlieuNaissance.+%3FlieuNaissance+foaf%3Aname+%3Fnom_lieuNaissance+FILTER%28langMatches%28lang%28%3Fnom_lieuNaissance%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_lieuNaissance%29%3E0%29+%7D%0D%0AOPTIONAL%7B+%3Fm+dbo%3Athumbnail+%3Fimg%7D%0D%0A%0D%0AOPTIONAL%7B%3Fm+dbo%3AknownFor+%3Ff.+%3Ff+rdfs%3Alabel+%3FknownFor.+FILTER%28langMatches%28lang%28%3FknownFor%29%2C+%22EN%22%29+%26%26+STRLEN%28%3FknownFor%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL+%7B+%7B%3Fm+dbo%3AmainInterest+%3Fo.+%3Fo+dbp%3Atitle+%3Foccupation%7D+UNION+%7B%3Fm+dbo%3Aoccupation+%3Fo.+%3Fo+dbo%3Atitle+%3Foccupation%7D+UNION+%7B%3Fm+gold%3Ahypernym+%3Fo.+%3Fo+rdfs%3Alabel+%3Foccupation.+FILTER%28langMatches%28lang%28%3Foccupation%29%2C+%22EN%22%29%29%7D%7D%0D%0A%7D%0D%0AGROUP+BY+%3Fname+%3Fimg%0D%0ALIMIT+1';
    let url2: string = environment.DBPEDIA_URL+sparql2;
    let httpHeader: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(url2, {headers: httpHeader}).pipe(
      map((x: any) => x['results']['bindings'][0]),
      map((y: any) => {
        console.log(y);
        return {
          name: y['nom'] ? y['nom']['value'] : "",
          img: y['img'] ? y['img']['value'] : "",
          works: y['isKnownFor'] ? y['isKnownFor']['value'].split(', ') : "",
          students: y['etudiants'] ? y['etudiants']['value'].split(', ') : "",
          studies: y['universites'] ? y['universites']['value'].split(', ') : "",
          subject: y['discipline'] ? y['discipline']['value'] : "",
          birthPlace: y['lieuNaissances'] ? y['lieuNaissances']['value'] : ""
        }
      })
    );
  }

  getTop10() {
    let sparql: string = "SELECT+DISTINCT+%3Fm+xsd%3Astring%28%3Fname%29+AS+%3Fnom+%3Fphoto+GROUP_CONCAT%28DISTINCT+%3FknownFor+%3BSEPARATOR%3D\"+%7C+\"%29+AS+%3FisKnownFor+COUNT%28%3Freference%29+AS+%3FnbReferences+WHERE+%7B%0D%0A%7B%3Fm+a+yago%3AMathematician110301261%7DUNION%7B%3Fm+dbo%3AmainInterest+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3Afield+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3AmainInterests+dbr%3AIslamic_mathematics%7D%0D%0A%3Fm+a+foaf%3APerson.%0D%0A%7B%3Fm+foaf%3Aname+%3Fname%7DUNION%7B%3Fm+dbp%3Aname+%3Fname%7D%0D%0AFILTER%28langMatches%28lang%28%3Fname%29%2C+\"EN\"%29+%26%26+STRLEN%28%3Fname%29>0%29.%0D%0A%3Fm+dbo%3AwikiPageWikiLink+%3Freference.%0D%0A%3Fm+dbo%3Athumbnail+%3Fphoto.%0D%0AOPTIONAL%7B%0D%0A%3Fm+dbo%3AknownFor+%3Ff.+%3Ff+rdfs%3Alabel+%3FknownFor.+FILTER%28langMatches%28lang%28%3FknownFor%29%2C+\"EN\"%29+%26%26+STRLEN%28%3FknownFor%29>0%29%0D%0A%7D%0D%0A%7D%0D%0AGROUP+BY+%3Fm+%3Fname+%3Fphoto%0D%0AORDER+BY+DESC%28%3FnbReferences%29%0D%0ALIMIT+10"
    return this.http.get<any>(environment.DBPEDIA_URL+sparql).pipe(
      map((x: any) => x['results']['bindings']),
      map((y: any) => {
        return y.map((z: any) => {
          return {
            value: z['nom'] ? z['nom']['value'] : "",
            img: z['photo'] ? z['photo']['value'] : "",
            field: Field.MATHEMATICIAN
          }
        });
      })
    );
  }
}



