import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    standalone: true,
    name: 'getSearchResultText',
})
export class getSearchResultTextPipe implements PipeTransform {
    transform(cardsLength: number): string {
        return cardsLength > 1 ? `${cardsLength} resultats` : `${cardsLength} resultat`;
    }
}
