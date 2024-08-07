import { useContext } from "react";
import { AuthContext } from "./share/Context";
import { Link } from "react-router-dom";

function Header() {
  const { user , token} = useContext(AuthContext);
  console.log(token);

  return (
    <>
      <nav className="bg-gray-800 w-full mt-0">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                </button>
            </div> */}
            {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                </div>
                <div className="hidden sm:ml-6 sm:block">
                
                </div>
            </div> */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-4">
                {!user && (
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                  
                  </Link>
                  
                )}
                {user &&  (
                  <>
             
                    <Link
                      to="/homeWorker"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Home
                    </Link>
                
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
