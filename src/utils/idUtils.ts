/**
 * Gera um ID temporário.
 * @returns Uma string com um ID temporário.
 */
export const generateTemporaryId = (): string => {
    return 'temp_' + Math.random().toString(36).slice(2, 11);
};

