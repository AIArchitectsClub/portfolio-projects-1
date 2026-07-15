import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import RequireAuth from './components/RequireAuth'
import { BucketProvider } from './context/BucketContext'
import { ProjectsProvider } from './context/ProjectsContext'
import CatalogPage from './pages/CatalogPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import BucketPage from './pages/BucketPage'
import ApplicationPage from './pages/ApplicationPage'
import MyApplicationsPage from './pages/MyApplicationsPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'

function AppLayout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/apply"
            element={
              <RequireAuth>
                <ApplicationPage />
              </RequireAuth>
            }
          />
          <Route
            path="/my-applications"
            element={
              <RequireAuth>
                <MyApplicationsPage />
              </RequireAuth>
            }
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return (
    <ProjectsProvider>
      <BucketProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </BucketProvider>
    </ProjectsProvider>
  )
}
