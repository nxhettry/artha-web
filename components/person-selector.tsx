"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { getPersons } from "@/lib/data";
import { PersonData } from "@/lib/actions";

export function PersonSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [persons, setPersons] = useState<PersonData[]>([]);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    const loadPersons = async () => {
      const data = await getPersons();
      setPersons(data as unknown as PersonData[]);
    };

    loadPersons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Input
        list="persons"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter person name"
      />
      <datalist id="persons">
        {persons.map((person) => (
          <option key={person._id} value={person.name} />
        ))}
      </datalist>
    </div>
  );
}
