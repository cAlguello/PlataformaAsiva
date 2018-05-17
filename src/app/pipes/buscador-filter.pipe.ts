import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'buscadorFilter',
  pure: false
})

export class BuscadorFilterPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;
    return categories.filter(function(category){
      //console.log(categories);
      if(category.nombre_giro.toLowerCase().indexOf(searchText.toLowerCase()) !=-1) {       
      return category.nombre_giro.toLowerCase().indexOf(searchText.toLowerCase()) > -1; 
      }
      else      
      return category.nombre_area_giro.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

    })
  }
}



