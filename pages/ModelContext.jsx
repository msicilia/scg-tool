import { createContext } from "react";
import model from '../json/model.json';

// create context
const ModelContext = createContext();

const ModelContextProvider = ({ children }) => {

  return (
    // the Provider gives access to the context to its children
    <ModelContext.Provider value={model}>
      {children}
    </ModelContext.Provider>
  );
};

export { ModelContext, ModelContextProvider };