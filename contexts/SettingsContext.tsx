import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Settings = {
  maxCost: number;
  minTimeSaved: number;
  maxTimeCost: number;
  updateSetting: (key: keyof Omit<Settings, "updateSetting">, value: number) => void;
};

const defaultSettings = {
  maxCost: 5,
  minTimeSaved: 2,
  maxTimeCost: 2,
  updateSetting: () => {}
};

const SettingsContext = createContext<Settings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [maxCost, setMaxCost] = useState(defaultSettings.maxCost);
  const [minTimeSaved, setMinTimeSaved] = useState(defaultSettings.minTimeSaved);
  const [maxTimeCost, setMaxTimeCost] = useState(defaultSettings.maxTimeCost);

  useEffect(() => {
    (async () => {
      const savedMaxCost = await AsyncStorage.getItem("maxCost");
      const savedMinTimeSaved = await AsyncStorage.getItem("minTimeSaved");
      const savedMaxTimeCost = await AsyncStorage.getItem("maxTimeCost");

      if (savedMaxCost) setMaxCost(parseFloat(savedMaxCost));
      if (savedMinTimeSaved) setMinTimeSaved(parseFloat(savedMinTimeSaved));
      if (savedMaxTimeCost) setMaxTimeCost(parseFloat(savedMaxTimeCost));
    })();
  }, []);

  const updateSetting = async (
    key: keyof Omit<Settings, "updateSetting">,
    value: number
  ) => {
    switch (key) {
      case "maxCost":
        setMaxCost(value);
        break;
      case "minTimeSaved":
        setMinTimeSaved(value);
        break;
      case "maxTimeCost":
        setMaxTimeCost(value);
        break;
    }
    await AsyncStorage.setItem(key, value.toString());
  };

  return (
    <SettingsContext.Provider
      value={{ maxCost, minTimeSaved, maxTimeCost, updateSetting }}
    >
      {children}
    </SettingsContext.Provider>
  );
};