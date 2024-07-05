// import { useContext } from "react";
// import { AuthContext } from "../share/Context";
// import { Link } from "react-router-dom";

// function NavBar() {
//     const { isLoggedIn } = useContext(AuthContext);
//     console.log(isLoggedIn)
//     return (
//         <>
//             {isLoggedIn ? (
//                 <nav className="bg-gray-800 w-full mt-0">
//                     <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                         <div className="relative flex h-16 items-center justify-between">
//                             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                                 <div className="flex space-x-4">
//                                     <Link to="/worker" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
//                                         Worker
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//             ) : (
//                 <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
//                     Login
//                 </Link>
//             )}
//         </>
//     );
// }

// export default NavBar;
