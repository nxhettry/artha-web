"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePeople } from "@/context/PersonContext";

export function PersonSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { people, loading, error } = usePeople();
  const [inputValue, setInputValue] = useState(value || "");

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
        disabled={loading}
      />
      <datalist id="persons">
        {people.length > 0 &&
          people.map((person) => (
            <option key={person._id} value={person.name} />
          ))}
      </datalist>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
