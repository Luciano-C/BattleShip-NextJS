import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import { useEffect } from "react"
import { BattleShipProvider } from "../context/battleshipContext"



// Se importa bootstrap de esta manera porque ocurren errores al importar normal, ya que next hacer correr el servidor para el front
// y back end en una sola consola. 
// Fuente: https://dev.to/anuraggharat/adding-bootstrap-to-nextjs-39b2
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])


  return (
    <BattleShipProvider>
      <div className='animated-bg'>
        <Component {...pageProps} />
      </div>

    </BattleShipProvider>

  )
}

export default MyApp
