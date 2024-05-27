

// 

import SideMenu from "@/components/SideMenu/SideMenu";

interface MainLayoutType {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutType> = ({ children }) => {

  return(
    <div className="flex h-screen">
      
      <SideMenu />

      <main 
        className="flex-1 bg-slate-50 overflow-auto "
      >
        { children }
      </main>

    </div>
  )
}

export default MainLayout;