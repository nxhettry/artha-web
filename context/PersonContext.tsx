"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface People {
  _id?: string;
  name: string;
}

interface PeopleContextType {
  people: People[];
  loading: boolean;
  error: string | null;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [people, setPeople] = useState<People[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPeople = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/people", {
          cache: "no-cache",
        });

        const data = await res.json();

        if (data.data) {
          setPeople(data.data);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError("An unknown error occurred.");
        }
      } catch (error) {
        console.log("Error ", error);
        setError(error as string || "An error occured");
      } finally {
        setLoading(false);
      }
    };

    getPeople();
  }, []);

  const value = {
    people,
    loading,
    error,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error("usePeople must be used within a PeopleProvider");
  }
  return context;
};
