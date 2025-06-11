import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
    const { state } = useTaskContext();

    const nextCycle = getNextCycle(state.CurrentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const tipsForWhenActiveTask = {
        workTime: (
            <span>
                Foque por <b>{state.config.workTime}min</b>
            </span>
        ),
        shortBreakTime: (
            <span>
                descanse por <b>{state.config.shortBreakTime}min</b>
            </span>
        ),
        longBreakTime: (
            <span>
                descanse por <b>{state.config.longBreakTime}min</b>
            </span>
        ),
    };

    const tipsForNoActiveTask = {
        workTime: (
            <span>
                Próximo ciclo será de <b>{state.config.workTime}min</b>
            </span>
        ),
        shortBreakTime: (
            <span>
                Próximo descanso será de <b>{state.config.shortBreakTime}min</b>
            </span>
        ),
        longBreakTime: (
            <span>
                Próximo descanso será <b>longo</b>
            </span>
        ),
    };

    return (
        <>
            {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
            {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
        </>
    );
}
