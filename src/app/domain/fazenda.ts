import { Talhao } from "./talhao";

export interface Fazenda {
  codigo?:string;
  nome?:string;
  produtividade?:number;
  talhao?:Talhao[];
}
