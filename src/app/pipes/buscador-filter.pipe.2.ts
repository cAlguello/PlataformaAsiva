import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'buscadorFilter2'
})

export class BuscadorFilterPipe2 implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;
    return categories.filter(function(category){
      if(category.nombre_giro.toLowerCase().indexOf(searchText.toLowerCase()) !=-1) {       
      return category.nombre_giro.toLowerCase().indexOf(searchText.toLowerCase()) > -1; 
      }
    })
  }
}