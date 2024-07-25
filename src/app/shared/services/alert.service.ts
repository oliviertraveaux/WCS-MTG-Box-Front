import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarStatus } from '../enums/snackbar-status.enum';
import { ConfirmDialogComponent } from '../ui/confirm-dialog/confirm-dialog';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private _snackBar = inject(MatSnackBar);
    private _dialog = inject(MatDialog);

    openSnackBar(message: string, status: SnackbarStatus) {
        this._snackBar.open(message, 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [status],
        });
    }

    openConfirmDialog(title: string, message: string): Observable<boolean> {
        return this._dialog
            .open(ConfirmDialogComponent, {
                data: { title, message },
            })
            .afterClosed();
    }
}
