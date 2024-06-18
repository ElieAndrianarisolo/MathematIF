import axios from "axios";


const dbpedia = axios.create({
  baseURL: "https://dbpedia.org",
  headers: {
    "Content-Type": "application/sparql-results+json",
  },
});

dbpedia.interceptors.request.use((config) => {
  config.params = {
    "default-graph-uri": "http://dbpedia.orgs",
    ...config.params,
  };
  return config;
});

const wikidata = axios.create({
  baseURL: "https://query.wikidata.org",
  headers: {
    "Content-Type": "application/sparql-results+json",
  },
});

export default {
  dbpedia,
  wikidata,
};



