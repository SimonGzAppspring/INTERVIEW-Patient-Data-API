import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Appointment {
  date: string;
  reason: string;
}

export default function App() {
  const [dateAppointments, setDateAppintments] = useState([]);
  const queryDate = "2021-11-15";

  const getDateAppointments = (token: string) => {
    const mockClientID = "SBOX02";
    axios(`https://api.healthjump.com/hjdw/${mockClientID}/appointment`, {
      headers: {
        Authorization: "Bearer" + token,
        Secretkey: "yemj6bz8sskxi7wl4r2zk0ao77b2wdpvrceyoe6g"
      },
      withCredentials: true
    })
      .then((res) => {
        console.log(res);
        // Iterate client appointments and filter them to match each one
        // with the given date
        const { data: appointments } = res.data;
        const resDateAppointments = appointments.filter(
          (appointment: Appointment) => {
            return appointment.date === queryDate.split("-").join();
          }
        );

        setDateAppintments(resDateAppointments);
      })
      .catch((err) => console.error(JSON.stringify(err)));
  };

  useEffect(() => {
    const credentials = new FormData();
    credentials.append("email", "sandbox@healthjump.com");
    credentials.append("password", "R-%Sx?qP%+RN69CS");

    fetch("https://api.healthjump.com/authenticate", {
      method: "POST",
      body: credentials
    })
      .then((res) => res.json())
      .then((res) => {
        getDateAppointments(res.token);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderAppointments = () => {
    dateAppointments.map((dateAppointment: Appointment) => (
      <p>{dateAppointment.reason}</p>
    ));
  };

  return (
    <div className="App">
      <h1>Appointments {queryDate}</h1>
      {renderAppointments()}
    </div>
  );
}
