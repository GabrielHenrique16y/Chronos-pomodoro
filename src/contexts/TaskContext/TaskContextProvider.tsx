import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManage } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskAction';
import loadBeep from '../../utils/loadBeep';

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('Chronos Pomodoro');

        if(storageState === null) return initialTaskState;

        const parsedStorageState = JSON.parse(storageState);

        return {
            ...parsedStorageState,
            activeTask: null,
            formatedSecondsRemaining: '00:00',
            secondsRemaining: 0
        }
    });
    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    const Worker = TimerWorkerManage.getInstance();

    Worker.onmessage(e => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }
            dispatch({
                type: TaskActionTypes.COMPLETE_TASK,
            });
            Worker.terminate();
        } else {
            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        }
    });

    useEffect(() => {
        localStorage.setItem('Chronos Pomodoro', JSON.stringify(state))
        if (!state.activeTask) {
            Worker.terminate();
        }

        if (state.activeTask) {
            document.title = `${state.formatedSecondsRemaining} - Chronos Pomodoro`
        }else{
            document.title = `Chronos Pomodoro`

        }

        Worker.postMessage(state);
    }, [Worker, state]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
