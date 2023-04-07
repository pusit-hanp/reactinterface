import {BiCalendarPlus, BiTrash} from "react-icons/bi"
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo";
import {useState, useEffect, useCallback} from"react";

function App() {
  
  let[appointmentList, setAppointmentList] = useState([]);

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
      <Search/>

      <ul className="divided-y divide-gray-200">
        {appointmentList
          .map(appointment=>(
            <AppointmentInfo 
            key={appointment.id}
            appointment={appointment}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
