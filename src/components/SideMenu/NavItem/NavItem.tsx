

//
"use client"


import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";

interface NavItemType {
  label: string
  link: string
  icon: React.ReactNode
}

const NavItem: React.FC<NavItemType> = ({ label, link, icon }) => {
// const NavItem: React.FC<NavItemType> = (props) => {
  // console.log(props)

  const pathname = usePathname(); // 現在のパスを取得
  // console.log(pathname, typeof pathname); // 文字列で取得

  // const searchParams = useSearchParams();
  // console.log(searchParams.get("params1")) // ReadonlyURLSearchParams {size: 0}

  return(
    <Link
      href={ link }
      className={`
        p-4 flex items-center w-full hover:bg-gray-700 font-medium duration-100
        ${pathname === link ? "bg-gray-600 border-r-4 border-r-green-500" : ""}
      `}
    >
      <div className="mr-2">{ icon }</div>
      <div>{ label }</div>
    </Link>
  )
}

export default NavItem;