import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoFilter'
})

export class ProductoFilterPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;
    return categories.filter(function(category){
      if(category.nombre_producto.toLowerCase().indexOf(searchText.toLowerCase()) !=-1) {       
      return category.nombre_producto.toLowerCase().indexOf(searchText.toLowerCase()) > -1; 
      }
    })
  }
}
