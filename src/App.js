import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import './App.css';
import './styles/variables.css';


const App = ({ setGlobalHandleDrop }) => {
  const { handleDrop } = useDroppableArea();

  useEffect(() => {
    if (handleDrop) {
      setGlobalHandleDrop(handleDrop); // Pass handleDrop to the global variable
    } else {
      console.error("[App] handleDrop is undefined.");
    }
  }, [handleDrop, setGlobalHandleDrop]);


}

export default App;
