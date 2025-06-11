import styles from './style.module.css';
import { RouterLink } from '../RouterLink';


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <RouterLink href="/about-pomodoro">Entenda a técnica pomodoro 🍅</RouterLink>
            <RouterLink href="">Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚</RouterLink>
        </footer>
    );
}
