import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-search-form-drawer',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, TranslateModule],
    templateUrl: './search-form-drawer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormDrawerComponent {
    @Output() toggleDrawer = new EventEmitter();
}
