import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  
  const logoutUser = () => {
    localStorage.removeItem("userLocal");
    navigate(0)
  }
  
  return (
    <div className="w-ful flex flex-row justify-center items-center py-2 bg-gray-900">
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/">Home</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/dashboard">Dashboard</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/habits">All Habits</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/stats">Stats</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        {
          Object.keys(user).length == 0 
          ?
          <>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/auth/register">Register</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/auth/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          </>

        : 
        <NavigationMenuItem>
            <NavigationMenuLink>
              <button onClick={logoutUser} className="md:text-lg px-2 font-normal text-white hover:cursor-pointer">Logout</button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        }
        
        

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

export default Navbar