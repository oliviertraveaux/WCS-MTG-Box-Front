import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
@Pipe({
    standalone: true,
    name: 'getUserCardName',
})
export class GetUserCardNamePipe implements PipeTransform {
    transform(card: UserCard): string {
        return card.userInfo.languageName === 'English'
            ? card.cardInfo.name
            : card.cardInfo.frenchName;
    }
}
