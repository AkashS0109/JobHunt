import React, { useEffect } from 'react'
import Navbar from './sharedf/Navbar'
import Hero from './Hero'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from "@/Hooks/useGetAllJobs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// export default function Home() {
//   useGetAllJobs();
//   const{user}=useSelector(store=>store.auth);
//   const navigate =useNavigate()
//   useEffect(()=>{
//      if(user?.role === 'recruiter'){
//       navigate("/admin/Companies");
//      }
//   },[])
  
//   return (
//     <>
//     <div className='w-full flex-col  2xl:p-0 '>
//     <Navbar />    
//       <Hero />
//        <CategoryCarousel/>
//        <LatestJob/> 
//     </div>
    
//     <Footer className="w-full"/>
//     </>
//   )
// }


export default function Home() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/Companies');
    }
    // Redirect to login or other page if user is not authenticated
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]); // Ensure dependencies are tracked properly

  return (
    <>
      <div className="w-full flex-col 2xl:p-0">
        <Navbar />
        <Hero />
        <CategoryCarousel />
        <LatestJob />
      </div>
      <Footer className="w-full" />
    </>
  );
}
