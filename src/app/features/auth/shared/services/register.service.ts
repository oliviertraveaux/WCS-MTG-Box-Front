import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRepository } from '../repositories/register.repository';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private readonly registerRepository = inject(RegisterRepository);

    register(formData: any): Observable<any> {
        return this.registerRepository.register(formData);
    }

    checkAvailability(username: string, email: string): Observable<any> {
        return this.registerRepository.checkAvailability(username, email);
    }
}
