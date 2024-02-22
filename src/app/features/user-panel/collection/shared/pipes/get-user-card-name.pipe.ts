import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from '@shared';
@Pipe({
    standalone: true,
    name: 'getUserCardName',
})
export class GetUserCardNamePipe implements PipeTransform {
    transform(card: UserCard): string {
        return card.userInfo.languageId === 1 ? card.cardInfo.name : card.cardInfo.frenchName;
    }
}
