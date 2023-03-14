import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import { LoginForm } from 'features/AuthByEmail';
import classes from './LoginPage.module.scss';

interface LoginPageProps {
    className?: string;
}

const LoginPage = memo((props: LoginPageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.LoginPage, {}, [className])}>
            <LoginForm />
        </Page>
    );
});

export default LoginPage;
