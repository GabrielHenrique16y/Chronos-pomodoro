import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import Home from '../pages/Home';
import AboutPomodoro from '../pages/AboutPomodoro';
import NotFound from '../pages/NotFound';
import { useEffect } from 'react';
import History from '../pages/History';
import Settings from '../pages/Settings';

// eslint-disable-next-line react-refresh/only-export-components
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [pathname]);

    return null;
}

export default function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/history' element={<History />} />
                <Route path='/about-pomodoro' element={<AboutPomodoro />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ScrollToTop />
        </BrowserRouter>
    );
}
