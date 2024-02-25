import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarStatus } from '../enums/snackbar-status.enum';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    private _snackBar = inject(MatSnackBar);

    openSnackBar(message: string, status: SnackbarStatus) {
        this._snackBar.open(message, 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [status],
        });
    }
}
