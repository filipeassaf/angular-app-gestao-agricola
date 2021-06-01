import { Talhao } from "./talhao";

export interface Producao {
  codigo?:string;
  nome?:string;
  quantidade?:number;
  talhao?:Talhao;
}
