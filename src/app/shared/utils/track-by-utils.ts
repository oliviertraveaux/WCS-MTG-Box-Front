import { TrackByFunction } from '@angular/core';

export const trackByIndex: TrackByFunction<unknown> = (index: number, _: unknown) => index;
export function trackByKey<T>(key: keyof T): TrackByFunction<T> {
    return (_: number, obj: T) => obj[key];
}

export const trackById = trackByKey('id');
export const trackByItem: TrackByFunction<unknown> = (_: number, item: unknown) => item;
