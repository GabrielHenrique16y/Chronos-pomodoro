import { TrashIcon } from 'lucide-react';
import Container from '../../components/Container';
import MainTemplate from '../../templates/MainTemplate';
import Heading from '../../components/Heading';
import DefaultButton from '../../components/DefaultButton';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { TaskActionTypes } from '../../contexts/TaskContext/taskAction';
import { showMessage } from '../../adapters/showMessage';
import { useEffect } from 'react';

export default function History() {
    const { state, dispatch } = useTaskContext();
    const hasTasks = state.tasks.length > 0;
    const sortedTasks = [...state.tasks].sort((a, b) => {
        return b.startDate - a.startDate;
    });

    useEffect(() => {
        document.title = 'Histórico - Chronos Pomodoro';
    }, []);

    function handleResetState() {
        showMessage.dismiss();
        showMessage.confirm('Tem certeza?', confirmation => {
            if (confirmation) {
                dispatch({ type: TaskActionTypes.RESET_STATE });
                showMessage.success('Histórico apagado com sucesso!');
            }
        });
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>History</span>
                    {hasTasks && (
                        <span className={styles.buttonContainer}>
                            <DefaultButton
                                icon={<TrashIcon />}
                                color='red'
                                aria-label='Apagar todo o histórico'
                                title='Apagar histórico'
                                onClick={() => handleResetState()}
                            />
                        </span>
                    )}
                </Heading>
            </Container>
            <Container>
                {hasTasks && (
                    <div className={styles.responsiveTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tarefa</th>
                                    <th>Duração</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sortedTasks.slice(0, 100).map(task => {
                                    const taskTypeDicionary = {
                                        workTime: 'Foco',
                                        shortBreakTime: 'Descanso curto',
                                        longBreakTime: 'Descanso longo',
                                    };
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>
                                            <td>{task.durationInMinutes}min</td>
                                            <td>
                                                {formatDate(task.startDate)}
                                            </td>
                                            <td>
                                                {getTaskStatus(
                                                    task,
                                                    state.activeTask,
                                                )}
                                            </td>
                                            <td>
                                                {taskTypeDicionary[task.type]}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {!hasTasks && (
                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Ainda não existem tarefas criadas.
                    </p>
                )}
            </Container>
        </MainTemplate>
    );
}
