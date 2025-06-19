import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiFacebook } from "react-icons/fi";

const Topbar = () => {
  return (
    <>
    {/* TopBar OF Web App */}
      <div className="bg-e-black text-white">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-gray-600">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-600">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-600">
              <RiTwitterXLine className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-gray-600">
              <FiFacebook className="h-4 w-4" />
            </a>
          </div>
          <div className="text-sm text-center flex-grow">
            <span>We Ship National - Fast and Reliable Shipping!</span>
          </div>
          <div className="text-sm hidden md:block">
            <a href="" className="hover:text-gray-600">
              PK ( +92 3275359491 )
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
