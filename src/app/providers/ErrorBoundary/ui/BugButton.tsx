import { Button } from 'shared/UI/Button';
import { useEffect, useState } from 'react';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => {
        setError(true);
    };

    useEffect(() => {
        if (error) throw Error;
    }, [error]);

    return (
        <Button
            onClick={onThrow}
            theme={ButtonTheme.PRIMARY}
        >
            Сломать
        </Button>
    );
};
