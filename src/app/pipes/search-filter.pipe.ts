import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText.toLowerCase());
  }

  private searchItems(items: any[], searchText:any): any[] {

   let results:any = [];
   console.log(items);
      items.forEach(it => {
        // console.log(it);
        for(let i of Object.keys(it)){
          if(typeof i === 'string' && it[i].toLowerCase().includes(searchText)) {
            console.log(i , it)
            if(!results.includes(it)){
              results.push(it);
            }
            }
        }
      });
      return results;
  }

}
