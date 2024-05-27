
// 

import { FaRegCheckSquare, FaRegClock, FaTasks } from "react-icons/fa";
import NavItem from "../NavItem/NavItem";


interface NavItemType {
  id: number
  label: string
  link: string
  icon: React.ReactNode
}


const NavList = () => {

  const navLists: NavItemType[] = [
    { id: 1, label: "All Tasks", link: "/", icon: <FaTasks className="size-5" /> },
    { id: 2, label: "Completed Tasks", link: "/completed", icon: <FaRegCheckSquare className="size-5" /> },
    { id: 3, label: "Expired Tasks", link: "/expired", icon: <FaRegClock className="size-5" /> },
  ];

  return(
    <div className="mt-24">
      { 
        navLists.map((list) => (
            <NavItem
              key={list.id}
              // label={ list.label } 
              // link={ list.link } 
              // icon={ list.icon } 
              { ...list }
            />
        ))
      }
    </div>
  )
}

export default NavList;
