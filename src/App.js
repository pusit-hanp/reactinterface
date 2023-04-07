import {BiCalendarPlus, BiTrash} from "react-icons/bi"
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo";
import {useState, useEffect, useCallback} from"react";

function App() {
  
  let[appointmentList, setAppointmentList] = useState([]);
  let[query,setQuery] = useState("");
  let[sortBy,setSortBy]=useState("petName");
  let[orderBy,setOrderBy]=useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a,b)=>{
    let order = (orderBy === 'asc')? 1 : -1;
    return(
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
      ? -1*order: 1*order
    )
  })

  const fetchData = useCallback(()=>{
    fetch('/data.json')
      .then(response =>response.json())
      .then(data=>{
        setAppointmentList(data)
      });
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 ClassName="text-5xl">
        <BiCalendarPlus className="inline-block text-red-400"/> Your Appointment</h1>
      <AddAppointment/>
      <Search query={query}
        onQueryChange={myQuery=>setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={mysort=>setOrderBy(mysort)}
        sortBy={sortBy}
        onSortByChange={mysort=>setSortBy(mysort)}
      />

      <ul className="divided-y divide-gray-200">
        {filteredAppointments
          .map(appointment=>(
            <AppointmentInfo 
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={
              appoinmentId =>
                setAppointmentList(appointmentList.filter(appointment=>appointment.id!==appoinmentId))
            }
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
