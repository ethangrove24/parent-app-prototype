import React, { createContext, useContext, useState } from 'react'

const WorkspaceContext = createContext()

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return context
}

export const WorkspaceProvider = ({ children }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState({
    id: 'personal',
    name: 'Your Hudl',
    type: 'personal',
    subscriptionType: 'Personal'
  })

  const [activeNavItem, setActiveNavItem] = useState('Home')

  return (
    <WorkspaceContext.Provider
      value={{
        selectedWorkspace,
        setSelectedWorkspace,
        activeNavItem,
        setActiveNavItem
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}
