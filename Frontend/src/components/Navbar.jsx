import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

function Navbar() {
  return (
    <div className="w-ful flex flex-row justify-center items-center py-2 bg-amber-600">
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal" href="/">Home</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal" href="/dashboard">Dashboard</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal" href="/habits">All Habits</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="md:text-lg px-2 font-normal" href="/login">Login</a>
            </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

export default Navbar