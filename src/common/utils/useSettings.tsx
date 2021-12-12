import React, { createContext, useContext, useState } from 'react';
import { merge } from 'lodash';
import { AdminLayoutSettings } from '../settings/AdminLayoutSettings';

const SettingsContext = createContext({
  settings: AdminLayoutSettings,
  updateSettings: (update = {}) => {}
});

interface Props {
  settings?: any;
  children?: any;
}

export const SettingsProvider = ({ settings, children }: Props) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || AdminLayoutSettings
  );

  const handleUpdateSettings = (update = {}) => {
    const merged = merge({}, currentSettings, update);
    setCurrentSettings(merged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}


export const useSettings = () => useContext(SettingsContext);