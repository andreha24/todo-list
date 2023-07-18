import { useState, createContext } from "react";
import TodoList from "./components/TodoList";


import './App.css';

export const ThemeContext = createContext(null)

function App() {

  // const [theme, setTheme] = useState('light')

  // const toggleTheme = () => {
  //   setTheme(prev => prev === 'light' ? 'dark' : 'light')
  // }

  return (
          <TodoList/>
      // <ThemeContext.Provider value={{theme, toggleTheme}}>
      //   <div className='App' id={theme}>
      //     <TodoList changeMode={toggleTheme}/>
      //   </div>
      // </ThemeContext.Provider>
  );
}

export default App;
