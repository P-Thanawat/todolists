import React, { createContext, useState } from 'react'

const triggerContxet = createContext();

function TriggerContextProvider({ children }) {
  const [trigModal, setTrigModal] = useState(false)
  return <triggerContxet.Provider value={{ trigModal, setTrigModal }}>{children}</triggerContxet.Provider>
}

export { triggerContxet, TriggerContextProvider }
