import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
    standalone: true,
    name: 'getSearchResultText',
})
export class getSearchResultTextPipe implements PipeTransform {
    private _translate = inject(TranslateService);

    transform(cardsLength: number): string {
        return cardsLength > 1
            ? cardsLength +
                  this._translate.instant('Collection.addCard.searchResults.totalResultTextPlural')
            : this._translate.instant('Collection.addCard.searchResults.totalResultTextSingular');
    }
}
