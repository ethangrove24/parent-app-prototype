import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WorkspaceProvider } from './context/WorkspaceContext'
import Navigation from './components/navigation/Navigation'
import ScrollToTop from './components/common/ScrollToTop'
import HomePage from './pages/HomePage'
import EventProfilePage from './pages/EventProfilePage'
import HighlightPlayerPage from './pages/HighlightPlayerPage'
import SearchPage from './pages/SearchPage'
import FavoritesPage from './pages/FavoritesPage'
import TicketsPage from './pages/TicketsPage'
import NotificationsPage from './pages/NotificationsPage'
import './App.css'

function App() {
  return (
    <WorkspaceProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/event/:id" element={<EventProfilePage />} />
              <Route path="/highlight/:id" element={<HighlightPlayerPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WorkspaceProvider>
  )
}

export default App

