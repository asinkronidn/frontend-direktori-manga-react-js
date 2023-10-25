import { useState, useEffect } from "react";
import "./tabelStyle.css";
import { Link } from "react-router-dom";

const Tabel = (props) => {
  const [data, setdata] = useState();
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/mangalist")
      .then((res) => {
        if (!res.ok) {
          throw Error("Cannot Fetch The End Point..");
        }
        setloading(true);
        return res.json();
      })
      .then((data) => {
        const datas = data && data.data;
        setloading(false);
        setdata(datas);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleDelete = async (id) => {
    fetch(`http://localhost:3001/mangalist/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Data deleted successfully.");
          fetch("http://localhost:3001/mangalist")
            .then((res) => {
              if (!res.ok) {
                throw Error("Cannot Fetch The End Point..");
              }
              return res.json();
            })
            .then((data) => {
              const datas = data && data.data;
              setdata(datas);
            })
            .catch((err) => {
              setError(err.message);
            });
        } else {
          console.error("Failed to delete data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function dateConvert(params) {
    // Membuat objek tanggal dari tahun, bulan, dan hari yang telah diparse
    const date = params.substring(0, 10);

    return date;
  }

  return (
    <div className="table-container">
      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Jumlah Volume</th>
              <th>Penerbit</th>
              <th>Penulis</th>
              <th>Rating</th>
              <th>Tanggal Rilis</th>
              <th>Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && (
              data.map((manga) => (
                <tr key={manga.id} className="table-row">
                  <td>{manga.judul}</td>
                  <td>{manga.jumlah_volume}</td>
                  <td>{manga.penerbit}</td>
                  <td>{manga.penulis}</td>
                  <td>{manga.rating}</td>
                  <td>{dateConvert(manga.tanggal_rilis)}</td>
                  <td>
                    <a href={manga.url_baca}>{manga.url_baca}</a>
                  </td>
                  <td>
                    <div className="wrapper">
                      <Link to={`edit/${manga.id}`}>
                        <img src="/brush.svg" />
                      </Link>
                      <div onClick={() => handleDelete(manga.id)}>
                        <img src="/trash.svg" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {loading && <div>Loading...</div>}
        {error && <div>Error Terjadi</div>}
      </div>
    </div>
  );
};

export default Tabel;
