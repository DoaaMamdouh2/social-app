import { createContext, useState } from "react";

type CounterContextType = {
  x: number;
  setX: React.Dispatch<React.SetStateAction<number>>;
};

export const counter = createContext<CounterContextType>({
  x: 0,
  setX: () => {},
});

export function CounterContext({ children }: { children: React.ReactNode }) {
  const [x, setX] = useState(0);
  return (
    <counter.Provider value={{ x, setX }}>
      {children}
    </counter.Provider>
  );
}