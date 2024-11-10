export enum ModalTypesSelector {
    YesNo = 'yesno',
    Cancel = 'cancel',
    None = 'none',
}

export class BActions {
    type: ModalTypesSelector;
    children: () => any;
    title?: string;
    description?: string;
    constructor(type: ModalTypesSelector, children: () => any, title?: string, description?: string) {
        this.type = type;
        this.children = children;
        this.title = title;
        this.description = description;
    }
}


