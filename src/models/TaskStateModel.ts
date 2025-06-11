import type { TaskModel } from "./TaskModel"

export type TaskStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formatedSecondsRemaining: string;
    activeTask: TaskModel | null;
    CurrentCycle: number;
    config: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
    }
}
