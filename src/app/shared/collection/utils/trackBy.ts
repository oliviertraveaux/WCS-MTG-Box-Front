const trackById = (index: number, item: any): any => item.id;
const trackByIndex = (index: number): number => index;
const trackByItem = (index: number, item: any): any => item;
const trackBy = (item: any, property: string): any => item[property];

export const trackByUtils = {
    trackById,
    trackByIndex,
    trackByItem,
    trackBy,
};
