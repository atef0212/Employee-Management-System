import { Link } from "react-router-dom";
import Logout from "../User/Logout";
import WorkersSideBar from "./WorkersSideBar";
import Comment from "./Comment";
import AllComments from "./Allcomments";

function Home() {
  console.log(Comment)
  return (
    <>
      <nav className="bg-gray-800 w-full mt-0">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <span className="absolute -inset-0.5"></span>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                <Link
                    to="/homeWorker"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                      to="/profilePage"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Profile 
                    </Link>
                    <Link
                      to="/dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      dashboard 
                    </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-4">
                <h1
               
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                    <Logout />
                </h1>
            
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-4">
   
        <WorkersSideBar />
      </div>
      <Comment/>
    <AllComments/>
   
    </>
  );
}

export default Home;
