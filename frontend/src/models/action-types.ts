export enum ModalTypes {
    YesNo = 'yesno',
    Info = 'info',
    Accept = 'accept',
    None = 'none',
}

export class TActions {
    type: ModalTypes;
    label: string;
    onProcess: () => any;
    title?: string;
    description?: string;
    preProcess?: () => any;
    constructor(type: ModalTypes, label: string, onProcess: () => any, title?: string, description?: string, preProcess?: () => any) {
        this.type = type;
        this.label = label;
        this.onProcess = onProcess;
        this.title = title;
        this.description = description;
        this.preProcess = preProcess;
    }
}


