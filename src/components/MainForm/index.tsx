import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import Cycles from '../Cycles';
import DefaultButton from '../DefaultButton';
import DefaultInput from '../DefaultInput';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskAction';
import { Tips } from '../tips';
import { showMessage } from '../../adapters/showMessage';

export default function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

    const nextCycle = getNextCycle(state.CurrentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        showMessage.dismiss();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            showMessage.warning('Digite o nome da tarefa');
            return;
        }

        const newTask: TaskModel = {
            completeDate: null,
            durationInMinutes: state.config[nextCycleType],
            id: Date.now().toString(),
            interruptDate: null,
            type: nextCycleType,
            name: taskName,
            startDate: Date.now(),
        };

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    };

    const handleInterruptBtn = () => {
        showMessage.dismiss();
        showMessage.confirm('Deseja interromper esta tarefa?', confirmation => {
            if (confirmation) {
                dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
                showMessage.error('Tarefa interrompida');
            }
        });
    };

    return (
        <>
            <form onSubmit={handleCreateNewTask} className='form'>
                <div className='formRow'>
                    <DefaultInput
                        id='taskInput'
                        type='text'
                        labelText='Task'
                        placeholder='Ex: Estudar para prova'
                        ref={taskNameInput}
                        disabled={!!state.activeTask}
                        autoComplete='off'
                        defaultValue={lastTaskName}
                    />
                </div>
                <div className='formRow'>
                    <Tips />
                </div>
                <div className='formRow'>
                    <Cycles />
                </div>
                <div className='formRow'>
                    {!state.activeTask && (
                        <DefaultButton
                            type='submit'
                            aria-label='Iniciar nova tarefa'
                            title='Iniciar nova tarefa'
                            icon={<PlayCircleIcon />}
                            key={'submit_button'}
                        />
                    )}{' '}
                    {!!state.activeTask && (
                        <DefaultButton
                            type='button'
                            aria-label='Interromper tarefa atual'
                            color='red'
                            title='Interromper tarefa atual'
                            icon={<StopCircleIcon />}
                            onClick={handleInterruptBtn}
                            key={'interrupt_button'}
                        />
                    )}
                </div>
            </form>
        </>
    );
}
