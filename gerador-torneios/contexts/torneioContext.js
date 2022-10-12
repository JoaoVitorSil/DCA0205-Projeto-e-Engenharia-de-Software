import React, { createContext, useState, useEffect, useContext } from 'react';


const TorneioContext = createContext();

export const TorneioProvider = ({ children }) => {
  const [torneio, setTorneio] = useState({});

  return (
    <TorneioContext.Provider
      value={torneio}
    >
      {children}
    </TorneioContext.Provider>
  );
};

export function useTorneio() {
  const context = useContext(TorneioContext);
  return context;
}