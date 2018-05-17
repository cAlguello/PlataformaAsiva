import { Observable } from "rxjs/Observable";

export class dataDetalleAdmin {
    constructor(
        public titulo: any,
        public nombre_empresa: any,
        public chart: any,
        public dataTable: Observable<Array<any>>
    ) { }
  }