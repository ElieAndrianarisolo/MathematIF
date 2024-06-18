# MathematIF

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

## Install angular

`npm install -g @angular/cli`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## tree structure of the website

```bash
searchbar
mathematician/{name}
field/{name}
theorem/{name}
```

## requests

#### search mathematician

dbpedia

```sql
SELECT DISTINCT ?name ?img ?dateNaissance ?dateMort WHERE {\n{?m a yago:Mathematician110301261}\nUNION\n{?m dbo:mainInterest dbr:Mathematics}\nUNION\n{?m dbp:field dbr:Mathematics}\nUNION\n{?m dbp:mainInterests dbr:Islamic_mathematics}\n?m a foaf:Person.\n?m dbp:name ?name\nFILTER ( regex(?name, "^(?=.*'+input+').*", "i") )\nOPTIONAL{?m dbo:thumbnail ?img}\nOPTIONAL {?m dbo:birthDate ?dateNaissance}\nOPTIONAL {?m dbo:deathDate ?dateMort}\n}
```

#### search field

```sql
SELECT DISTINCT ?field ?nom ?description (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) ?namedAfter (GROUP_CONCAT(DISTINCT ?inventor; SEPARATOR=" | ") as ?inventors) (GROUP_CONCAT(DISTINCT ?nameOfInventor; SEPARATOR=" | ") as ?nameOfInventors) WHERE { ?field wdt:P31 wd:Q1936384. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?field rdfs:label ?nom. ?field schema:description ?description. } OPTIONAL{?field wdt:P18 ?image}. OPTIONAL{?field wdt:P138 ?reference.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?reference rdfs:label ?namedAfter}}. OPTIONAL{?field wdt:P138 ?inventor.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?inventor rdfs:label ?nameOfInventor}}. FILTER ( regex(?nom, "^(?=.*'+input+').*", "i") ) } GROUP BY ?field ?nom ?description ?namedAfter ORDER BY ?field
```

#### search theorem

```sql
SELECT DISTINCT ?theorem ?nom (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images)  WHERE { ?theorem wdt:P31 wd:Q65943. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?theorem rdfs:label ?nom. }OPTIONAL{?theorem wdt:P18 ?image.} FILTER(regex(?nom, "^(?=.*pythagore).*", "i"))}GROUP BY ?theorem ?nom
```

#### mathematician detail

dbpedia

```sql
SELECT+DISTINCT+xsd%3Astring%28%3Fname%29+AS+%3Fnom+%0D%0A%3Fdescription%0D%0A%3FdateNaissance+%0D%0A%3FdateMort%0D%0A%3Fnationalite%0D%0AGROUP_CONCAT%28DISTINCT+%3Ff%3B+SEPARATOR%3D%22+%7C+%22%29+AS+%3Fp_isKnownFor+%0D%0A%0D%0AWHERE+%7B%0D%0A%0D%0A%7B%3Fm+a+yago%3AMathematician110301261%7DUNION%7B%3Fm+dbo%3AmainInterest+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3Afield+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3AmainInterests+dbr%3AIslamic_mathematics%7D%0D%0A%3Fm+a+foaf%3APerson.+%7B%3Fm+foaf%3Aname+%3Fname%7D+UNION+%7B%3Fm+dbp%3Aname+%3Fname%7D+%0D%0A%0D%0AFILTER%28langMatches%28lang%28%3Fname%29%2C+%22EN%22%29%29%0D%0AFILTER+%28+regex%28%3Fname%2C+%22%5E%28%3F%3D.*'+input+'%29.*%22%2C+%22i%22%29+%29%0D%0A%0D%0AOPTIONAL+%7B%3Fm+dbo%3Aabstract+%3Fdescription.+FILTER%28langMatches%28lang%28%3Fdescription%29%2C+%22EN%22%29%29%7D%0D%0A%0D%0AOPTIONAL+%7B%3Fm+dbo%3AbirthDate+%3FdateNaissance%7D%0D%0A%0D%0AOPTIONAL+%7B%3Fm+dbo%3AdeathDate+%3FdateMort%7D%0D%0A%0D%0AOPTIONAL+%7B%0D%0A%7B%3Fm+dbo%3Anationality+%3Fcountry.+%3Fcountry+rdfs%3Alabel+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnationalite%29%3E0%29.%7D%0D%0AUNION%0D%0A%7B%3Fm+dbo%3AbirthPlace+%3Fplace.+%3Fplace+dbo%3Acountry+%3Fcountry.+%3Fcountry+rdfs%3Alabel+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnationalite%29%3E0%29.%7D%0D%0AUNION%0D%0A%7B%3Fm+dbp%3AbirthPlace+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29+%26%26+datatype%28%3Fnationalite%29+%3D+xsd%3Astring%29%7D%0D%0AUNION%0D%0A%7B%3Fm+dbo%3AbirthPlace+%3Fplace.+%3Fplace+dbp%3AsubdivisionName+%3Fnationalite.+FILTER%28langMatches%28lang%28%3Fnationalite%29%2C+%22EN%22%29%29.%7D%0D%0A%7D%0D%0A%0D%0A%0D%0A%0D%0A%7D%0D%0AGROUP+BY+%3Fname+%3Fdescription+%3FdateNaissance+%3FdateMort+%3Fnationalite%0D%0ALIMIT+1
```

```sql
SELECT+DISTINCT+xsd%3Astring%28%3Fname%29+AS+%3Fnom+%0D%0A%3Fimg%0D%0AGROUP_CONCAT%28DISTINCT+%3Foccupation%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fmetier%0D%0A%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_etudiant%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fetudiants%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_universite%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Funiversites%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_discipline%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fdisciplines%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_lieuNaissance%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3FlieuNaissances%0D%0AGROUP_CONCAT%28DISTINCT+%3FknownFor%3B+SEPARATOR%3D%22+%7C+%22%29+AS+%3FisKnownFor%0D%0A%0D%0AWHERE+%7B%0D%0A%0D%0A%7B%3Fm+a+yago%3AMathematician110301261%7DUNION%7B%3Fm+dbo%3AmainInterest+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3Afield+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3AmainInterests+dbr%3AIslamic_mathematics%7D%0D%0A%3Fm+a+foaf%3APerson.+%7B%3Fm+foaf%3Aname+%3Fname%7D+UNION+%7B%3Fm+dbp%3Aname+%3Fname%7D+%0D%0A%0D%0AFILTER%28langMatches%28lang%28%3Fname%29%2C+%22EN%22%29%29%0D%0AFILTER+%28+regex%28%3Fname%2C+%22%5E%28%3F%3D.*'+input+'%29.*%22%2C+%22i%22%29+%29%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AnotableStudent+%3Fs.+%3Fs+dbp%3Aname+%3Fnom_etudiant.+FILTER%28langMatches%28lang%28%3Fnom_etudiant%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_etudiant%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AalmaMater+%3Funiversite.+%3Funiversite+dbp%3Aname+%3Fnom_universite.+FILTER%28langMatches%28lang%28%3Fnom_universite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_universite%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AacademicDiscipline+%3Fdiscipline.+%3Fdiscipline+rdfs%3Alabel+%3Fnom_discipline.+FILTER%28langMatches%28lang%28%3Fnom_discipline%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_discipline%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B%3Fm+dbo%3AbirthPlace+%3FlieuNaissance.+%3FlieuNaissance+foaf%3Aname+%3Fnom_lieuNaissance+FILTER%28langMatches%28lang%28%3Fnom_lieuNaissance%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_lieuNaissance%29%3E0%29+%7D%0D%0AOPTIONAL%7B+%3Fm+dbo%3Athumbnail+%3Fimg%7D%0D%0A%0D%0AOPTIONAL%7B%3Fm+dbo%3AknownFor+%3Ff.+%3Ff+rdfs%3Alabel+%3FknownFor.+FILTER%28langMatches%28lang%28%3FknownFor%29%2C+%22EN%22%29+%26%26+STRLEN%28%3FknownFor%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL+%7B+%7B%3Fm+dbo%3AmainInterest+%3Fo.+%3Fo+dbp%3Atitle+%3Foccupation%7D+UNION+%7B%3Fm+dbo%3Aoccupation+%3Fo.+%3Fo+dbo%3Atitle+%3Foccupation%7D+UNION+%7B%3Fm+gold%3Ahypernym+%3Fo.+%3Fo+rdfs%3Alabel+%3Foccupation.+FILTER%28langMatches%28lang%28%3Foccupation%29%2C+%22EN%22%29%29%7D%7D%0D%0A%7D%0D%0AGROUP+BY+%3Fname+%3Fimg%0D%0ALIMIT+1
```

#### subject detail

wikidata

```sql
SELECT DISTINCT ?field ?nom ?description (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) ?namedAfter (GROUP_CONCAT(DISTINCT ?inventor; SEPARATOR=" | ") as ?inventors) (GROUP_CONCAT(DISTINCT ?nameOfInventor; SEPARATOR=" | ") as ?nameOfInventors) WHERE { ?field wdt:P31 wd:Q1936384. SERVICE wikibase:label {  bd:serviceParam wikibase:language "en". ?field rdfs:label ?nom. ?field schema:description ?description. } OPTIONAL{?field wdt:P18 ?image}. OPTIONAL{?field wdt:P138 ?reference.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?reference rdfs:label ?namedAfter}}. OPTIONAL{?field wdt:P138 ?inventor.  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?inventor rdfs:label ?nameOfInventor}}.  FILTER ( regex(?nom, "^(?=.*+'input'+).*", "i") ) } GROUP BY ?field ?nom ?description ?namedAfter ORDER BY ?field
```

#### theorem detail

```sql
SELECT DISTINCT ?theorem ?nom ?description (GROUP_CONCAT(DISTINCT ?formula; SEPARATOR=" £ ") as ?formulas) (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) (GROUP_CONCAT(DISTINCT ?subjectName; SEPARATOR=" | ") as ?subjects) (GROUP_CONCAT(DISTINCT ?referenceName; SEPARATOR=" | ") as ?references) (GROUP_CONCAT(DISTINCT ?proverName; SEPARATOR=" | ") as ?provedBy) WHERE { ?theorem wdt:P31 wd:Q65943. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?theorem rdfs:label ?nom. ?theorem schema:description ?description. } OPTIONAL {?theorem wdt:P2534 ?formula.} OPTIONAL {?theorem wdt:P18 ?image.} OPTIONAL { ?theorem wdt:P361 ?subject. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?subject rdfs:label ?subjectName. } FILTER(!regex(str(?subject), ?subjectName)). } OPTIONAL { ?theorem wdt:P138 ?reference. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?reference rdfs:label ?referenceName. } FILTER(!regex(str(?reference), ?referenceName)). } OPTIONAL { ?theorem wdt:P1318 ?prover. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?prover rdfs:label ?proverName. } FILTER(!regex(str(?prover), ?proverName)). } FILTER(regex(?nom, "^(?=.*pythagore).*", "i")) } GROUP BY ?theorem ?nom ?description ?formula ORDER BY ?nom LIMIT 1
```

#### top mathematician

```sql
SELECT+DISTINCT+xsd%3Astring%28%3Fname%29+AS+%3Fnom+%0D%0A%3Fimg%0D%0AGROUP_CONCAT%28DISTINCT+%3Foccupation%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fmetier%0D%0A%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_etudiant%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fetudiants%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_universite%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Funiversites%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_discipline%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fdisciplines%0D%0AGROUP_CONCAT%28DISTINCT+%3Fnom_lieuNaissance%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3FlieuNaissances%0D%0AGROUP_CONCAT%28DISTINCT+%3FknownFor%3B+SEPARATOR%3D%22+%7C+%22%29+AS+%3FisKnownFor%0D%0A%0D%0AWHERE+%7B%0D%0A%0D%0A%7B%3Fm+a+yago%3AMathematician110301261%7DUNION%7B%3Fm+dbo%3AmainInterest+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3Afield+dbr%3AMathematics%7DUNION%7B%3Fm+dbp%3AmainInterests+dbr%3AIslamic_mathematics%7D%0D%0A%3Fm+a+foaf%3APerson.+%7B%3Fm+foaf%3Aname+%3Fname%7D+UNION+%7B%3Fm+dbp%3Aname+%3Fname%7D+%0D%0A%0D%0AFILTER%28langMatches%28lang%28%3Fname%29%2C+%22EN%22%29%29%0D%0AFILTER+%28+regex%28%3Fname%2C+%22%5E%28%3F%3D.*'+input+'%29.*%22%2C+%22i%22%29+%29%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AnotableStudent+%3Fs.+%3Fs+dbp%3Aname+%3Fnom_etudiant.+FILTER%28langMatches%28lang%28%3Fnom_etudiant%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_etudiant%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AalmaMater+%3Funiversite.+%3Funiversite+dbp%3Aname+%3Fnom_universite.+FILTER%28langMatches%28lang%28%3Fnom_universite%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_universite%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B+%3Fm+dbo%3AacademicDiscipline+%3Fdiscipline.+%3Fdiscipline+rdfs%3Alabel+%3Fnom_discipline.+FILTER%28langMatches%28lang%28%3Fnom_discipline%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_discipline%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL%7B%3Fm+dbo%3AbirthPlace+%3FlieuNaissance.+%3FlieuNaissance+foaf%3Aname+%3Fnom_lieuNaissance+FILTER%28langMatches%28lang%28%3Fnom_lieuNaissance%29%2C+%22EN%22%29+%26%26+STRLEN%28%3Fnom_lieuNaissance%29%3E0%29+%7D%0D%0AOPTIONAL%7B+%3Fm+dbo%3Athumbnail+%3Fimg%7D%0D%0A%0D%0AOPTIONAL%7B%3Fm+dbo%3AknownFor+%3Ff.+%3Ff+rdfs%3Alabel+%3FknownFor.+FILTER%28langMatches%28lang%28%3FknownFor%29%2C+%22EN%22%29+%26%26+STRLEN%28%3FknownFor%29%3E0%29%7D%0D%0A%0D%0AOPTIONAL+%7B+%7B%3Fm+dbo%3AmainInterest+%3Fo.+%3Fo+dbp%3Atitle+%3Foccupation%7D+UNION+%7B%3Fm+dbo%3Aoccupation+%3Fo.+%3Fo+dbo%3Atitle+%3Foccupation%7D+UNION+%7B%3Fm+gold%3Ahypernym+%3Fo.+%3Fo+rdfs%3Alabel+%3Foccupation.+FILTER%28langMatches%28lang%28%3Foccupation%29%2C+%22EN%22%29%29%7D%7D%0D%0A%7D%0D%0AGROUP+BY+%3Fname+%3Fimg%0D%0ALIMIT+1
```

#### top subject

wikidata

```sql
SELECT DISTINCT ?nom ?description (GROUP_CONCAT(DISTINCT ?image; SEPARATOR=" | ") as ?images) ?namedAfter WHERE { wd:Q395 wdt:P527 ?field. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?field rdfs:label ?nom.  ?field schema:description ?description. } OPTIONAL{?field wdt:P18 ?image}. OPTIONAL{ ?field wdt:P138 ?reference. SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?reference rdfs:label ?namedAfter}}} GROUP BY ?nom ?description ?namedAfter ORDER BY ?nom LIMIT 50
```







