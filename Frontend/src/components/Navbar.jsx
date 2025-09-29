import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Navbar() {
  return (
    <div className="w-ful flex flex-row justify-center items-center py-2 bg-gray-900">
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal text-white" href="/">Home</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal text-white" href="/dashboard">Dashboard</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal text-white" href="/habits">All Habits</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal text-white" href="/stats">Stats</a>
            </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal text-white" href="/login">Register/Login</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

export default Navbar