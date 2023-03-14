import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Text } from 'shared/UI/Text/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Accordion,
    Button, Col, Form, InputGroup,
} from 'react-bootstrap';
import { registerByEmail } from 'features/AuthByEmail/model/services/registerByEmail/registerByEmail';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import classes from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const [validated, setValidated] = useState<boolean>(false);
    const [logType, setLogType] = useState<boolean>(true);

    const {
        className,
        onSuccess,
    } = props;

    const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setUsername(e.target.value));
    }, [dispatch]);
    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(e.target.value));
    }, [dispatch]);

    const onLoginClick = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }
        if (logType) {
            // авторизация
            await dispatch(loginByEmail({ username, password }));
        } else {
            // регистрация
            await dispatch(registerByEmail({ username, password }));
        }
    }, [dispatch, logType, password, username]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <Form noValidate validated={validated} onSubmit={onLoginClick}>
                {error && <p className={classes.loginError}>{error}</p>}

                <Form.Group as={Col} md="4">
                    <InputGroup hasValidation>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            required
                            onChange={onUsernameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите имя пользователя.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            required
                            onChange={onPasswordChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите пароль.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button
                    onClick={() => setLogType(true)}
                    type="submit"
                    variant="outline-secondary"
                >
                    Войти
                </Button>
                <Button
                    onClick={() => setLogType(false)}
                    type="submit"
                    variant="outline-warning"
                >
                    Зарегистрироваться
                </Button>
            </Form>

        </DynamicModuleLoader>
    );
});

export default LoginForm;
