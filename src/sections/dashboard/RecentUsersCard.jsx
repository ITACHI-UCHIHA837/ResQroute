// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import "../pipeline/Result.scss";
// project-imports
import MainCard from 'components/MainCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan , faDownload} from '@fortawesome/free-solid-svg-icons';
// assets
import Image1 from 'assets/images/user/avatar-1.png';
import Image2 from 'assets/images/user/avatar-2.png';
import Image3 from 'assets/images/user/avatar-3.png';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import { useParams } from "react-router-dom";
//import { param } from '../../../../bck/routes/calculationRoutes';
//import { loguser } from '../../../../bck/controllers/authenticationcontroller';

// ===============================|| RECENT USERS CARD - DATA ||============================== //


const recentUsersData = [
  {
    image: Image1,
    projectname: 'Isabella Christensen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '11 MAY 12:56',
    iconClass: 'text-success',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image2,
    projectname: 'Mathilde Andersen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '11 MAY 10:35',
    iconClass: 'text-danger',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image3,
    projectname: 'Karla Sorensen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '9 MAY 17:38',
    iconClass: 'text-success',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image1,
    projectname: 'Ida Jorgensen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '19 MAY 12:56',
    iconClass: 'text-danger',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image1,
    projectname: 'Albert Andersen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '21 July 12:56',
    iconClass: 'text-success',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image1,
    projectname: 'Albert Andersen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '21 July 12:56',
    iconClass: 'text-success',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image1,
    projectname: 'Albert Andersen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '21 July 12:56',
    iconClass: 'text-success',
    badge1: 'Reject',
    badge2: 'Approve'
  }
];

// ==========================|| RECENT USERS CARD ||========================== //

export default function RecentUsersCard({recent, triggerReload}) {


  const [calculations, setCalculations] = useState([]);
  useEffect(() => {
  if (recent) {
    setCalculations(recent);
  }
}, [recent]);



const handeldelet = async(id)=>{
      const token =sessionStorage.getItem("token");
       const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;
  try {
    console.log("trying:"+id);
  const res=  await fetch(`${import.meta.env.VITE_API_URL}/${id}`,
  // const res=  await fetch(`http://localhost:8000/api/calculations/${id}`,
      {
        method:'delete',
      headers:{
        aut:`Bearer ${token}`
      }});

      const data = await res.json();
      if(!res.ok){
        alert(data.message);
        return;
      }
       setCalculations(prev => prev.filter(item => item._id !== id));
      triggerReload();
      // setCalculations((react) => react.filter(item => item._id !== id));
    console.log("deleting");
    
    //  setData((prev) => prev.filter((item) => item._id !== id));
  } catch (error) {
   console.log("recant delet" , error); 
  } 
  }

//  const recentdata = recent.recent 
//  console.log(recentdata);
    


return (
    <MainCard  title="Accident detail" className="Recent-Users table-card" bodyClassName="p-0">
     
    </MainCard>
  );
}
