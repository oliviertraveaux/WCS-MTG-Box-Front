import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [CommonModule, MatButtonModule, TranslateModule, MatIconModule],
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
    router = inject(Router);
    redirectToHome() {
        this.router.navigate(['home']);
    }
}
