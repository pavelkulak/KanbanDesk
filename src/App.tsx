import { Provider } from 'react-redux';
import { store } from './app/providers/store';
import { KanbanBoard } from './widgets/KanbanBoard';
import { GlobalStyle } from './shared/ui/globalStyles';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <div className='app'>
        <KanbanBoard />
      </div>
    </Provider>
  );
}

export default App;
