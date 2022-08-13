import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import { useEffect } from "react"
import { BattleShipProvider } from "../context/battleshipContext"

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])


  return (
    <BattleShipProvider>
      <div className='animated-bg'>
      <Component {...pageProps}/>
      </div>
      
    </BattleShipProvider>

  )
}

export default MyApp
