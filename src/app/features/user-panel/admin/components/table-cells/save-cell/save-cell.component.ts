import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserInfo } from '../../../../../../shared/user/models/user-info.interface';

@Component({
    selector: 'app-save-cell',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './save-cell.component.html',
})
export class SaveCellComponent implements OnInit {
    @Input({ required: true }) user!: UserInfo;
    @Input({ required: true }) users!: UserInfo[];
    @Output() save = new EventEmitter<UserInfo>();

    originalUser: UserInfo | undefined;

    ngOnInit(): void {
        this.originalUser = this.users.find((user) => user.id === this.user.id);
    }
    onSave() {
        this.save.emit(this.user);
    }

    get hasValueChanged(): boolean {
        return !(
            this.originalUser?.isBanned === this.user.isBanned &&
            this.originalUser?.role.type === this.user.role.type
        );
    }
}
