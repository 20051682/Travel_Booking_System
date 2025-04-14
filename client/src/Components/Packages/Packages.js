import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Packages = () => {
  const [role, setRole] = useState("");
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    // Fetch travel packages
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleAddPackage = () => {
    navigate("/add_package");
  };

  const handleDeletePackage = (packageId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/package/${packageId}`)
          .then(() => {
            setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
            Swal.fire('Deleted!', 'Package has been deleted.', 'success');
          })
          .catch((error) => {
            console.error("Error deleting package:", error);
            Swal.fire('Error', 'Failed to delete package', 'error');
          });
      }
    });
  };
  

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Explore Our Travel Packages</h2>

        {role === "admin" && (
          <button className="btn btn-primary mb-4" onClick={handleAddPackage}>
            <span className="me-2">+</span>Add Package
          </button>
        )}

        <div className="row">
          {packages.map((pkg) => (
            <div className="col-md-4 mb-4" key={pkg._id || pkg.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={pkg.image_url}
                  className="card-img-top"
                  alt={pkg.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pkg.name}</h5>
                  <p className="card-text">{pkg.hotel_name}</p>
                  <p className="card-text">{pkg.place_from} to {pkg.place_to}</p>
                  <p className="card-text">{pkg.start_date} to {pkg.end_date}</p>
                  <div className="mt-auto">
                    <h6 className="text-success fw-bold mb-2">€{pkg.price}</h6>
                    {role === "user" && (
                      <button className="btn btn-primary w-100">Book Now</button>
                    )}
                    {role === "admin" && (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => navigate(`/update_package/${pkg._id}`)}
                        >
                          Update Hotel
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeletePackage(pkg._id)}>Delete Hotel</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {role === "admin" && (
          <div className="text-center mt-5">
          </div>
        )}
      </div>
    </>
  );
};

export default Packages;
