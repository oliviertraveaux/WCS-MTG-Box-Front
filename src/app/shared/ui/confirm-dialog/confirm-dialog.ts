import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
    title: string;
    message: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {
        this.title = data.title;
        this.message = data.message;
    }
}
