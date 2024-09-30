import { ListaReservas } from "../components/ListaReservas";
import '../styles/ListaTasks.css'

export function ListaReservasPage() {
    return (
      <div  className="container mx-auto p-4 lista">
        <h1 style={{textAlign:'center'}}><strong style={{color:'red'}} >Canchas Reservadas</strong> </h1>
        <ListaReservas />
      </div>
    );
  }


