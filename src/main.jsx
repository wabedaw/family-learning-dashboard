import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { DataProvider } from './store/DataContext.jsx'
import { PetProvider } from './store/PetStore.jsx'
import { TaskProvider } from './store/TaskStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <DataProvider>
        <PetProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </PetProvider>
      </DataProvider>
    </LangProvider>
  </StrictMode>,
)
