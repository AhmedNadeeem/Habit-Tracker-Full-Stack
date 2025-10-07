import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
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
    <div className="w-ful flex justify-center items-center py-2 bg-gray-900">
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <Link className="md:text-lg px-2 font-normal text-white" to="/">Home</Link>
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
        <span className="flex justify-between gap-2 items-center">

          <p className="text-white text-2xl font-thin">|</p>

          <NavigationMenuItem>
              <NavigationMenuLink>
                <Dialog>
                  <DialogTrigger className="text-white cursor-pointer py-1 text-lg">New Habits</DialogTrigger>
                  <DialogContent className="bg-gray-500 border-0">
                    <DialogHeader>
                      <DialogTitle>New habit:</DialogTitle>
                      </DialogHeader>
                    <HabitDialog btnText={"Add"} title={""} description={""} frequency={""} icon={""} />
                  </DialogContent>
                </Dialog>
              </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
              <NavigationMenuLink>
                <button onClick={logoutUser} className="md:text-lg px-2 font-normal text-white hover:cursor-pointer">Logout</button>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <div className="flex items-center px-4 py-1 gap-4 border-1 rounded-2xl">
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