import ReactDOM from 'react-dom/client';
import App from './App';
import { bubbleSort } from './components/sortingAlgorythm';
import { RandomNumbersArray } from './randomGenerator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App 
      sortFunc={bubbleSort}
      arrayGenerator={RandomNumbersArray}
    />
);
