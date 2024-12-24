import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import Jobs from './Components/Jobs';
import Browse from './Components/ui/Browse';
import Profile from './Components/profile/Profile';
import JobDetails from './Components/JobDetails';
import Companies from './Components/Admin/Companies';
import CompanyCreate from './Components/Admin/CompanyCreate';
import CompanySetup from './Components/Admin/CompanySetup'
import AdminJobs from './Components/Admin/JobsFoler/AdminJobs'
import PostJob from './Components/Admin/JobsFoler/PostJob';
import Applicants from './Components/Admin/Applicants';
const appRouter=createBrowserRouter([
{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/signup',
  element:<Signup/>
},
{
  path:'/jobs',
  element:<Jobs/>
},
{
  path:'/browse',
  element:<Browse/>
},
{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/description/:id',
  element:<JobDetails/>
},

//for admin
{
  path:'/admin/companies',
  element:<Companies/>
},
{
  path:'/admin/companies/create',
  element:<CompanyCreate/>
},
{
  path:'/admin/companies/:id',
  element:<CompanySetup/>
},
{
  path:'/admin/jobs',
  element:<AdminJobs/>
},
{
  path:'/admin/jobs/create',
  element:<PostJob/>
},
{
  path:'/admin/jobs/:id/applicants',
  element:<Applicants/>
},
])
function App() {
  

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
