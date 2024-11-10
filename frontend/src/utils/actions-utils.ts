
export const isActive = (state: any) => state === '1' || state === 1 || state === true;

export const getActionText = (state: any) => {
    return isActive(state) ? 'Inactivar' : 'Activar';
};
