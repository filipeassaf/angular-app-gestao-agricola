import { Fazenda } from "./fazenda";

export interface Talhao {
  codigo?:string;
  nome?:string;
  area?:number;
  produtividade?:number;
  fazenda?:Fazenda;
}
