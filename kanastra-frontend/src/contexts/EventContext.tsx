import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Listener<T> = (data: T) => void;
type Listeners = { [event: string]: Listener<unknown>[] };

interface EventContextProps {
  emitEvent: <T>(event: string, data: T) => void;
  addEventListener: <T>(event: string, listener: Listener<T>) => () => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listeners, setListeners] = useState<Listeners>({});

  const emitEvent = useCallback(<T,>(event: string, data: T) => {
    if (listeners[event]) {
      listeners[event].forEach(listener => listener(data));
    }
  }, [listeners]);

  const addEventListener = useCallback(<T,>(event: string, listener: Listener<T>) => {
    setListeners(prevListeners => ({
      ...prevListeners,
      [event]: [...(prevListeners[event] || []), listener as Listener<unknown>],
    }));

    return () => {
      setListeners(prevListeners => ({
        ...prevListeners,
        [event]: prevListeners[event].filter(l => l !== listener),
      }));
    };
  }, []);

  return (
    <EventContext.Provider value={{ emitEvent, addEventListener }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextProps => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
