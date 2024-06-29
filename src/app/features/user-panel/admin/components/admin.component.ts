import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash-es';
import { SnackbarStatus } from '../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../shared/services/alert.service';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';
import { LoginService } from '../../../auth/shared/services/login.service';
import { OfferCardComponent } from '../../offers-received/components/offer-card/offer-card-component';
import { AdministrateUserRequest } from '../../profile/shared/model/administrate-user-request.interface';
import { UserInfosService } from '../../profile/shared/services/user-infos.service';
import { FilterOfferBarComponent } from '../../ui/filter-bar/filter-offer-bar.component';
import { ActiveCellComponent } from './table-cells/active-cell/active-cell.component';
import { BannedCellComponent } from './table-cells/banned-cell/banned-cell.component';
import { RoleCellComponent } from './table-cells/role-cell/role-cell.component';
import { SaveCellComponent } from './table-cells/save-cell/save-cell.component';
@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        CommonModule,
        FilterOfferBarComponent,
        OfferCardComponent,
        TranslateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        RoleCellComponent,
        MatButtonModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        BannedCellComponent,
        SaveCellComponent,
        ActiveCellComponent,
    ],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnChanges, AfterViewInit {
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);
    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    private readonly _userInfosService = inject(UserInfosService);
    private readonly _userInfoStateService = inject(UserInfoStatesService);
    private readonly _loginService = inject(LoginService);
    private readonly _alertService = inject(AlertService);
    private readonly _translate = inject(TranslateService);

    @Input() users: UserInfo[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    dataSource = new MatTableDataSource<UserInfo>();

    displayedColumns: string[] = [
        'userName',
        'email',
        'isActive',
        'isBanned',
        'role.type',
        'lastConnectionDate',
        'creationDate',
        'save',
    ];

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<UserInfo>(cloneDeep(this.users));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<UserInfo>(cloneDeep(this.users));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
            // Split '.' to allow accessing property of nested object
            if (property.includes('.')) {
                const accessor = property.split('.');
                let value: any = item;
                accessor.forEach((a) => {
                    value = value[a];
                });
                return value;
            }
            switch (property) {
                case 'userName':
                    return item['username'].toLocaleLowerCase();
                case 'email':
                    return item['email'];
                case 'isActive':
                    return item['isActive'];
                case 'isBanned':
                    return item['isBanned'];
                case 'lastConnectionDate':
                    return item['lastConnectionDate'];
                case 'creationDate':
                    return item['creationDate'];
            }
        };
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    saveUser(element: UserInfo) {
        const requestBody: AdministrateUserRequest = {
            isBanned: element.isBanned,
            role: element.role.type,
        };
        const username = element.username;
        const confirmTitle = this._translate.instant('userPanel.admin.toast.confirm-dialog-title');
        const confirmText = this._translate.instant('userPanel.admin.toast.confirm-dialog-text', {
            username,
        });

        this._alertService.openConfirmDialog(confirmTitle, confirmText).subscribe((result) => {
            if (result) {
                this._userInfosService.administrateUser(element.id, requestBody).subscribe({
                    next: (modifiedUser) => {
                        const userUpdateSuccess = this._translate.instant(
                            'userPanel.admin.toast.user-updated-success'
                        );
                        this._alertService.openSnackBar(userUpdateSuccess, SnackbarStatus.success);
                        // logout user if he has changed its own role to user.
                        if (this.isUserAuthorized(modifiedUser)) {
                            this._userInfosService.getAllUsers();
                        } else {
                            this._loginService.logout();
                        }
                        this._changeDetectorRef.detectChanges();
                    },
                    error: () => {
                        const userUpdateFail = this._translate.instant(
                            'userPanel.admin.toast.user-updated-fail'
                        );
                        this._alertService.openSnackBar(userUpdateFail, SnackbarStatus.error);
                    },
                });
            }
        });
    }

    private isUserAuthorized(modifiedUser: UserInfo) {
        return this._userInfoStateService.getUserInfo().id !== modifiedUser.id;
    }
}
