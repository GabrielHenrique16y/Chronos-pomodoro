import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes, type TaskActionModel } from './taskAction';

export function taskReducer(
    state: TaskStateModel,
    action: TaskActionModel,
): TaskStateModel {
    switch (action.type) {
        case TaskActionTypes.START_TASK: {
            const newTask = action.payload;
            const nextCycle = getNextCycle(state.CurrentCycle);
            const secondsRemaining = newTask.durationInMinutes * 60;

            return {
                ...state,
                activeTask: newTask,
                CurrentCycle: nextCycle,
                secondsRemaining,
                formatedSecondsRemaining:
                    formatSecondsToMinutes(secondsRemaining),
                tasks: [...state.tasks, newTask],
            };
        }
        case TaskActionTypes.INTERRUPT_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formatedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activeTask && state.activeTask.id === task.id) {
                        return { ...task, interruptDate: Date.now() };
                    }
                    return task;
                }),
            };
        }
        case TaskActionTypes.COMPLETE_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formatedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activeTask && state.activeTask.id === task.id) {
                        return { ...task, completeDate: Date.now() };
                    }
                    return task;
                }),
            };
        }
        case TaskActionTypes.RESET_STATE: {
            return { ...state, tasks: initialTaskState.tasks };
        }
        case TaskActionTypes.COUNT_DOWN: {
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formatedSecondsRemaining: formatSecondsToMinutes(
                    action.payload.secondsRemaining,
                ),
            };
        }
        case TaskActionTypes.CHANGE_SETTINGS: {
            return {
                ...state,
                config: { ...action.payload },
            };
        }
        default: {
            return state;
        }
    }
}
