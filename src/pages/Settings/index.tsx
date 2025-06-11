import { SaveIcon } from 'lucide-react';
import Container from '../../components/Container';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Heading from '../../components/Heading';
import MainTemplate from '../../templates/MainTemplate';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskAction';

export default function Settings() {
    const { state, dispatch } = useTaskContext();

    const workTimeInput = useRef<HTMLInputElement>(null);
    const shortBreakTimeInput = useRef<HTMLInputElement>(null);
    const longBreakTimeInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = 'Configurações - Chronos Pomodoro';
    }, []);

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const workTime = Number(workTimeInput.current?.value);
        const shortBreakTime = Number(shortBreakTimeInput.current?.value);
        const longBreakTime = Number(longBreakTimeInput.current?.value);

        const formErrors = [];

        if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            formErrors.push('Digite um número para TODOS os campos');
        }

        if (workTime < 1 || workTime > 60) {
            formErrors.push('Digite valores entre 1 e 60 para Foco');
        }

        if (shortBreakTime < 1 || shortBreakTime > 30) {
            formErrors.push('Digite valores entre 1 e 30 para Descanso curto');
        }

        if (longBreakTime < 1 || longBreakTime > 60) {
            formErrors.push('Digite valores entre 1 e 60 para Descanso longo');
        }

        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                showMessage.error(error);
            });
        }

        dispatch({
            type: TaskActionTypes.CHANGE_SETTINGS,
            payload: { workTime, shortBreakTime, longBreakTime },
        });
        showMessage.success('Configurações salvas');
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>
            <Container>
                <p style={{ textAlign: 'center' }}>
                    Configure os minutos para as etapas do Pomodoro.
                </p>
            </Container>
            <Container>
                <form
                    action=''
                    className='form'
                    onSubmit={e => handleSaveSettings(e)}
                >
                    <div className='formRow'>
                        <DefaultInput
                            id='workTime'
                            labelText='Foco(min):'
                            ref={workTimeInput}
                            type='number'
                            defaultValue={state.config.workTime}
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput
                            id='shortBreakTime'
                            labelText='Descanso curto(min):'
                            ref={shortBreakTimeInput}
                            type='number'
                            defaultValue={state.config.shortBreakTime}
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput
                            id='longBreakTime'
                            labelText='Descanso longo(min):'
                            ref={longBreakTimeInput}
                            type='number'
                            defaultValue={state.config.longBreakTime}
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultButton
                            color='green'
                            icon={<SaveIcon />}
                            aria-label='Salvar confirações'
                            title='Salvar configurações'
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}
