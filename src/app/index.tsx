import { createRoot } from 'react-dom/client';
import Main from '@/app/main.tsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Main />);
