import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { editId } = useParams();

  const params = Number(editId);

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    penerbit: "",
    tanggal_rilis: "",
    rating: "",
    jumlah_volume: "",
    url_baca: "",
  }); 

  useEffect(() => {
    fetch("http://localhost:3001/mangalist")
      .then((res) => {
        if (!res.ok) {
          throw Error("Cannot Fetch The End Point..");
        }
        return res.json();
      })
      .then((data) => {
        const datas = data && data.data;
        // Assuming you want to populate formData with the first item in mangaData
        if (datas && datas.length > 0) {
          const singleManga = datas.find((manga) => manga.id === params);
          const newTanggal_rilis = singleManga.tanggal_rilis.substring(0, 10);
          setFormData({
            judul: singleManga.judul,
            penulis: singleManga.penulis,
            penerbit: singleManga.penerbit,
            tanggal_rilis: newTanggal_rilis,
            rating: singleManga.rating,
            jumlah_volume: singleManga.jumlah_volume,
            url_baca: singleManga.url_baca,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const navigate = useNavigate();

  // Fungsi untuk mengirim data form ke server
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.jumlah_volume <= 0 || formData.rating <= 0) {
      alert("Nilai harus diatas 0.");
      setFormData({
        judul: "",
        jumlah_volume: "",
        penerbit: "",
        penulis: "",
        rating: "",
        tanggal_rilis: "",
        url_baca: "",
      });
      return;
    }

    function removeHyphens(inputString) {
      return inputString.replace(/-/g, "");
    }

    const dateWithoutHyphens = Number(removeHyphens(formData.tanggal_rilis));

    const newFormData = {
      ...formData,
      tanggal_rilis: dateWithoutHyphens,
    };
    // Mengirim data newFormData ke server dengan metode POST
    try {
      const response = await fetch(
        `http://localhost:3001/mangalist/${params}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFormData),
        }
      );

      if (response.ok) {
        // Reset form data jika sukses
        setFormData({
          judul: "",
          jumlah_volume: "",
          penerbit: "",
          penulis: "",
          rating: "",
          tanggal_rilis: "",
          url_baca: "",
        });
      } else {
        console.error("Failed to post data.");
      }

      const data = await response.json();
      if (data.message === "Manga created successfully") {
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi untuk mengupdate state formData saat input fields berubah
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="input-container">
      <form className="input-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            required
            placeholder="Judul Manga"
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Jumlah Volume"
            type="number"
            id="jumlah_volume"
            name="jumlah_volume"
            value={formData.jumlah_volume}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Penerbit"
            type="text"
            id="penerbit"
            name="penerbit"
            value={formData.penerbit}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Penulis"
            type="text"
            id="penulis"
            name="penulis"
            value={formData.penulis}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Rating"
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Tanggal Rilis"
            type="date"
            id="tanggal_rilis"
            name="tanggal_rilis"
            value={formData.tanggal_rilis}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Url Baca"
            type="url_baca"
            id="url_baca"
            name="url_baca"
            value={formData.url_baca}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </form>
    </div>
  );
};

export default Edit;
