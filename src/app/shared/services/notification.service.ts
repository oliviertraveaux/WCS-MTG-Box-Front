import { inject, Injectable } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    filter,
    fromEvent,
    map,
    merge,
    Observable,
    pairwise,
} from 'rxjs';
import { OfferStatesService } from '../offer/services/offer.states.service';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private readonly _offerStatesService = inject(OfferStatesService);
    private readonly _offersMadeNotification = new BehaviorSubject(false);
    private readonly _offersReceivedNotification = new BehaviorSubject(false);

    mouseClick$: Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'click');
    keyUp$: Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'keyup');
    mouseOrKeyBoardEvent$: Observable<MouseEvent> = merge(this.mouseClick$, this.keyUp$);

    // We compare previous and current status values.
    // We don't want to be notified when value is initialized
    hasOffersMadeStatusChanged: Observable<boolean> = this._offerStatesService
        .getOffersMade$()
        .pipe(
            pairwise(),
            filter(([prev, curr]) => {
                if (!prev || !curr || !prev.length || !curr.length) return false;
                return curr.some((currOffer) => {
                    const currOfferStatus = currOffer.status;
                    const prevOfferStatus = prev.find(
                        (prevOffer) => prevOffer.id === currOffer.id
                    )?.status;
                    if (!prevOfferStatus) return false;
                    return currOfferStatus !== prevOfferStatus;
                });
            }),
            map(() => true)
        );

    // We don't want to be notified when value is initialized
    hasOfferReceivedLengthChanged: Observable<boolean> = this._offerStatesService
        .getOffersReceived$()
        .pipe(
            pairwise(),
            filter(([prev, curr]) => !!prev.length && prev.length < curr.length),
            map(() => true)
        );

    // We want global notification to be true if at least one is true
    offerNotification$: Observable<boolean> = combineLatest([
        this._offersMadeNotification,
        this._offersReceivedNotification,
    ]).pipe(
        map(([madeNotification, receivedNotification]) => madeNotification || receivedNotification)
    );

    getOfferMadeNotification(): Observable<boolean> {
        return this._offersMadeNotification;
    }

    getOfferReceivedNotification(): Observable<boolean> {
        return this._offersReceivedNotification;
    }

    setOfferMadeNotification(value: boolean): void {
        this._offersMadeNotification.next(value);
    }

    setOfferReceivedNotification(value: boolean): void {
        this._offersReceivedNotification.next(value);
    }
}
