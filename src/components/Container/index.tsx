import styles from './style.module.css'

type ContainerProps = {
    children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
