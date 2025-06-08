import auto_names from "@/data/speech-names.json";

export const useAutoName = () => {
  const generateName = (): string => {
    const randomNumber = Math.floor(Math.random() * auto_names.length);
    return auto_names[randomNumber];
  };

  return { generateName };
};
