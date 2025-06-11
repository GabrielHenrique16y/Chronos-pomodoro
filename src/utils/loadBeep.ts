import gravitacionalBeep from '../assets/audios/gravitacionalBeep.mp3';

export default function loadBeep() {
    const beep = new Audio(gravitacionalBeep);
    beep.load();

    return () => {
        beep.currentTime = 0;
        beep.play().catch(error => console.log('erro ao tocar o áudio', error));
    };
}
