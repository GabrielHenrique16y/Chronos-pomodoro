import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './style.module.css';

export default function CountDown() {
    const {state} = useTaskContext();
    
    return <div className={styles.container}>{state.formatedSecondsRemaining}</div>;
}
