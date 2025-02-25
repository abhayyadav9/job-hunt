import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import JobDescription from './components/JobDescription '
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import JobUpdate from './components/admin/JobUpdate'
import Protectedroute from './components/admin/ProtectedRoute'
import ProtectedUser from './components/ProtectUser'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <ProtectedUser><Profile/></ProtectedUser>
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <Companies/>
  },
  {
    path:"/admin/companies/create",
    element: <CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<Protectedroute><AdminJobs/></Protectedroute>
  },
  {
    path:"/admin/jobs/create",
    element:<Protectedroute><PostJob/></Protectedroute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Protectedroute><Applicants/></Protectedroute>
  },
  {
    path:"/admin/job/:id",
    element:<Protectedroute><JobUpdate/></Protectedroute>
  }

])
function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
