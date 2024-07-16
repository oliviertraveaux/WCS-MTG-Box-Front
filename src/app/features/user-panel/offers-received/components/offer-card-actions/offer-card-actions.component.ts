import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { OfferStatus } from '../../../../../shared/offer/enums/offer-status.enum';
import { OfferFullWantedCard } from '../../../../../shared/offer/models/offer-full-wanted-card.model';
import { OfferService } from '../../../../../shared/offer/services/offer.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { GetIsConfirmButtonDisabledPipe } from '../../../shared/pipes/get-is-confirm-button-disabled.pipes';
import { fromOfferFullWantedCardToOffer } from '../../../shared/utils/offer.utils';
import { OfferDetailsModalComponent } from '../../../ui/offer-details-modal/offer-details-modal.component';

@Component({
    selector: 'offer-card-actions',
    templateUrl: './offer-card-actions.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatChipsModule, NgIf, GetIsConfirmButtonDisabledPipe],
})
export class OfferCardActionsComponent implements OnInit {
    private readonly _dialog = inject(MatDialog);
    private readonly _offerService = inject(OfferService);
    private readonly _userId = inject(UserInfoStatesService).getUserInfo().id;

    private readonly _translate = inject(TranslateService);
    private readonly _alertService = inject(AlertService);
    @Input() offer!: OfferFullWantedCard;
    @Input() hasDeleteButton: boolean = false;
    @Input() hasAcceptButton: boolean = false;
    @Input() hasValidateButton: boolean = false;
    @Output() delete = new EventEmitter<number>();

    acceptButtontext!: string;
    validateButtonText!: string;

    ngOnInit(): void {
        this.acceptButtontext =
            this.offer.status === OfferStatus.pending
                ? this._translate.instant('transaction.offer.confirm-button-text-accept')
                : this._translate.instant('transaction.offer.confirm-button-text-accepted');

        this.validateButtonText = this._translate.instant(
            'transaction.offer.confirm-button-text-validate'
        );
    }

    openOfferCardsDetailsDialog(): void {
        this._dialog.open(OfferDetailsModalComponent, {
            width: '100%',
            height: '90%',
            minWidth: '375px',
            data: { offer: fromOfferFullWantedCardToOffer(this.offer) },
        });
    }

    acceptOffer(): void {
        this._alertService
            .openConfirmDialog(
                this._translate.instant('transaction.offer.dialog.accept-title'),
                this._translate.instant('transaction.offer.dialog.accept-message')
            )
            .subscribe((res) => {
                if (res) {
                    this._offerService.acceptOffer(this.offer.id).subscribe({
                        next: () => {
                            const acceptedSuccess = this._translate.instant(
                                'transaction.offer.toast.offer-accepted-success'
                            );
                            this._alertService.openSnackBar(
                                acceptedSuccess,
                                SnackbarStatus.success
                            );
                            this._offerService.getOffersReceived(this._userId);
                        },
                        error: () => {
                            const acceptedFailed = this._translate.instant(
                                'transaction.offer.toast.offer-accepted-fail'
                            );
                            this._alertService.openSnackBar(acceptedFailed, SnackbarStatus.error);
                        },
                    });
                }
            });
    }

    validateOffer(): void {
        this._alertService
            .openConfirmDialog(
                this._translate.instant('transaction.offer.dialog.validate-title'),
                this._translate.instant('transaction.offer.dialog.validate-message')
            )
            .subscribe((res) => {
                if (res) {
                    this._offerService.validateOffer(this.offer.id).subscribe({
                        next: () => {
                            const validatedSuccess = this._translate.instant(
                                'transaction.offer.toast.offer-validated-success'
                            );
                            this._alertService.openSnackBar(
                                validatedSuccess,
                                SnackbarStatus.success
                            );
                            this._offerService.getOffersMade(this._userId);
                        },
                        error: () => {
                            const validatedFailed = this._translate.instant(
                                'transaction.offer.toast.offer-validated-fail'
                            );
                            this._alertService.openSnackBar(validatedFailed, SnackbarStatus.error);
                        },
                    });
                }
            });
    }

    onDelete(): void {
        this._alertService
            .openConfirmDialog(
                this._translate.instant('transaction.offer.dialog.delete-title'),
                this._translate.instant('transaction.offer.dialog.delete-message')
            )
            .subscribe((res) => {
                if (res) {
                    this._offerService.deleteOffer(this.offer.id).subscribe({
                        next: () => {
                            const deleteSuccess = this._translate.instant(
                                'transaction.offer.toast.offer-deleted-success'
                            );
                            this._alertService.openSnackBar(deleteSuccess, SnackbarStatus.success);
                            this._offerService.getOffersMade(this._userId);
                        },
                        error: () => {
                            const deleteFailed = this._translate.instant(
                                'transaction.offer.toast.offer-deleted-fail'
                            );
                            this._alertService.openSnackBar(deleteFailed, SnackbarStatus.error);
                        },
                    });
                }
            });
    }
}
