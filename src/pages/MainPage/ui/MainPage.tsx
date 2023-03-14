import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = memo((props: MainPageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.MainPage, {}, [className])}>
            <h2>Main page</h2>
        </Page>
    );
});

export default MainPage;
