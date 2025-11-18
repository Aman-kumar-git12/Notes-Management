import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './auth/auth.jsx'
import NotesPage from './components/notes.jsx'
import ViewNotes from './components/viewnotes.jsx'
import { UserProvider } from './context/useContext.jsx'
import ProfilePage from './components/profile.jsx'
import SavedNotes from './components/savednotes.jsx'


const App = () => {
  
  

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/saved-notes' element={<SavedNotes />} />
          <Route path='/notes' element={<NotesPage />} />
          <Route path='/viewnotes' element={<ViewNotes />} />
          <Route path='/viewnotes/:id' element={<ViewNotes />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App