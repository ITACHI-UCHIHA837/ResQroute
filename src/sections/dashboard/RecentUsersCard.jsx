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

// ==========================|| RECENT USERS CARD ||========================== //

export default function RecentUsersCard({ recent, triggerReload }) {
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    setCalculations(Array.isArray(recent) ? recent : []);
  }, [recent]);

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          aut: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Unable to delete record.");
        return;
      }

      setCalculations((prev) => prev.filter((item) => item._id !== id));
      if (typeof triggerReload === "function") {
        triggerReload();
      }
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete entry. See console for details.");
    }
  };

  return (
    <MainCard title="Accident detail" className="Recent-Users table-card" bodyClassName="p-0">
      <div className="table-responsive p-3">
        <Table hover className="mb-0">
          <thead>
            <tr>
              <th>Project</th>
              <th>Result</th>
              <th>Inputs</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {calculations.length > 0 ? (
              calculations.map((item) => {
                const { _id, projname, payload, result, createdAt } = item;
                const resultLabel = result?.Utilization_Ratio || result?.utilization_ratio || result?.status || "N/A";
                const inputs = payload
                  ? Object.entries(payload)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(", ")
                  : "-";

                return (
                  <tr key={_id || `${projname}-${createdAt}`}>
                    <td>{projname || payload?.projname || "Unknown Project"}</td>
                    <td>{resultLabel}</td>
                    <td>{inputs}</td>
                    <td>{formatDate(createdAt)}</td>
                    <td>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(_id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No recent calculations found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </MainCard>
  );
}
