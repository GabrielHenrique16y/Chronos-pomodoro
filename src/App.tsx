import { Bounce, ToastContainer } from 'react-toastify';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import MainRouters from './routers/routes';

import './styles/global.css';
import './styles/theme.css';

function App() {
    return (
        <TaskContextProvider>
            <MainRouters />
            <ToastContainer
                position='top-center'
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </TaskContextProvider>
    );
}

export default App;
