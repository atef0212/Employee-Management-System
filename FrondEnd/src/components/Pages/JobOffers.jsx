import { jobOffers } from "../../Api/jobs"

function JobOffers() {
  return (
    <>
    <div className="flex flex-row flex-wrap gap-9 mb-52 mt-32 ml-96 w-2/3 relative">
   {jobOffers.map((job, index) => (
     <div key={index} className="w-[25%]">
       <div className="border-2 border-white h-96 rounded-2xl shadow-xl shadow-gray-400 p-4 flex flex-col justify-center items-center">
         <div className="relative overflow-hidden group">
           <img
             className="h-52 w-50 mb-4 rounded-2xl transition-transform duration-300 transform scale-100 group-hover:scale-110"
             src={job.imgURL}
             alt=""
           />
         </div>
         <h1 className="text-xl font-bold mb-2">{job.salary}</h1>
         <h1 className=" font-bold ">{job.workHours}</h1>
         <p className="text-sm font-bold pb-2 text-left">{job.description}</p>
         <div className="flex gap-4 mt-3">
           <a
             href="mailto:tim@gmail.com"
             className="bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600 transition duration-300"
             target="_blank"
             rel="noopener noreferrer"
           >
            Apply
           </a>
    
         </div>
       </div>
     </div>
   ))}
 </div></>
  )
}

export default JobOffers