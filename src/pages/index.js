import { Board } from "../components/board"


export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-around">
          
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Your board</h3>
            <Board />
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Computer board</h3>
            <Board />
          </div>
          
          
          
        </div>
      </div>

    </div>

  )
}
