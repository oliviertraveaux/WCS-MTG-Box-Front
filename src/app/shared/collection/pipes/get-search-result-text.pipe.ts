import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
@Pipe({
    standalone: true,
    name: 'getSearchResultText',
})
export class getSearchResultTextPipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(cardsLength: number): string {
    const translationKey = cardsLength > 1 ? 'Collection.results' : 'Collection.result';
    return `${cardsLength} ${this.translate.instant(translationKey) }`;
  }
}
