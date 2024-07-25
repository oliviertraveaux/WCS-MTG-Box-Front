import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';
import { UserInfosService } from '../../profile/shared/services/user-infos.service';
import { AdminComponent } from '../components/admin.component';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    imports: [CommonModule, TranslateModule, AdminComponent],
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
    private readonly _userInfosService = inject(UserInfosService);
    private readonly _userInfosStateService = inject(UserInfoStatesService);
    users: Observable<UserInfo[]> = of([]);

    ngOnInit(): void {
        this._userInfosService.getAllUsers();
        this.users = this._userInfosStateService.getUsers$();
    }
}
