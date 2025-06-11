import {
    HistoryIcon,
    HouseIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
} from 'lucide-react';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvaliablesThemes = 'dark' | 'light';

export default function Menu() {
    const [theme, setTheme] = useState<AvaliablesThemes>(() => {
        const storageTheme =
            (localStorage.getItem('theme') as AvaliablesThemes) || 'dark';
        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    };

    const handleChangeTheme = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        e.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        });
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <>
            <div
                className={styles.menu}
                aria-label='Ir para a página inicial'
                title='Página inicial'
            >
                <RouterLink
                    href='/'
                    className={styles.menuLink}
                    aria-label='Ir para a página inicial'
                    title='Página inicial'
                >
                    <HouseIcon />
                </RouterLink>
                <RouterLink
                    href='/history'
                    className={styles.menuLink}
                    aria-label='Histórico de tarefas'
                    title='Histórico de tarefas'
                >
                    <HistoryIcon />
                </RouterLink>
                <RouterLink
                    href='/settings'
                    className={styles.menuLink}
                    aria-label='Configurações do pomodoro'
                    title='Configurações do pomodoro'
                >
                    <SettingsIcon />
                </RouterLink>
                <RouterLink
                    href='#'
                    className={styles.menuLink}
                    aria-label={`Alternar tema para ${
                        theme === 'dark' ? 'claro' : 'escuro'
                    }`}
                    title={`Alternar tema para ${
                        theme === 'dark' ? 'claro' : 'escuro'
                    }`}
                    onClick={e => handleChangeTheme(e)}
                >
                    {nextThemeIcon[theme]}
                </RouterLink>
            </div>
        </>
    );
}
