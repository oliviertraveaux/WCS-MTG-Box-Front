import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  standalone: true,
  name: 'getSearchResultText',
})
export class getSearchResultTextPipe implements PipeTransform {
  private _translate = inject(TranslateService);

  transform(cardsLength: number): string {
    if (cardsLength > 1) {
      return cardsLength + ' ' + this._translate.instant('Collection.addCard.searchResults.totalResultTextPlural');
    }

    if (cardsLength === 1) {
      return this._translate.instant('Collection.addCard.searchResults.totalResultTextSingular');
    }

    return this._translate.instant('Collection.addCard.searchResults.noResults');
  }
}
