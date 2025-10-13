import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImg from "../assets/man.png"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HabitDialog from "./HabitDialog";

function Navbar() {
  const user = useSelector(state => state.user.user);
  console.log(user)
  const navigate = useNavigate();
  
  const logoutUser = () => {
    localStorage.removeItem("userLocal");
    navigate(0)
  }
  
  return (
    <div className="max-w-ful flex justify-center items-center py-2 bg-gray-900">
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="max-sm:text-sm max-sm:px-1 md:text-lg px-2 font-normal text-white" to="/">Home</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="max-sm:text-sm md:text-lg px-2 font-normal text-white" to="/habits">All Habits</Link>
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
              <NavLink className="md:text-lg px-2 font-normal text-white" to="/auth/register">Register/Login</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          </>

        : 
        <span className="flex justify-between flex-1 gap-2 items-center">

          <p className="text-white text-2xl font-thin">|</p>

          <NavigationMenuItem>
              <NavigationMenuLink>
                <Dialog>
                  <DialogTrigger className="text-white max-sm:text-sm cursor-pointer py-1 text-lg">New Habits</DialogTrigger>
                  <DialogContent className="bg-gray-500 border-0">
                    <DialogHeader>
                      <DialogTitle>New habit:</DialogTitle>
                      </DialogHeader>
                    <HabitDialog btnText={"Add"} title={""} description={""} frequency={""} icon={""} habitId={""} />
                  </DialogContent>
                </Dialog>
              </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
              <NavigationMenuLink>
                <button onClick={logoutUser} className="max-sm:text-sm md:text-lg px-2 font-normal text-white hover:cursor-pointer">Logout</button>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <div className="max-sm:hidden flex items-center px-4 py-1 gap-4 border-1 rounded-2xl">
            <div>
              <p className="text-white text-sm">{user?.user?.username}</p>
              <p className="text-white text-xs font-thin">{user?.user?.email.slice(0, 8)}...</p>
            </div>
            <img className="w-8 h-8 border-gray-500 border-2 rounded-4xl" src={UserImg} />
          </div>

        </span>
        }
        
        

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

export default Navbar