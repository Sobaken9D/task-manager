import './App.css'
import {MainContent} from "@/components/shared/main-content.tsx";
import {Sidebar} from "@/components/shared/sidebar.tsx";

function App() {

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar className="shrink-0"/>
      <MainContent className="flex-1"/>
    </div>
  )
}

export default App
