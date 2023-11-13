import React, { useState } from "react";
import "./inputStyle.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const Input = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // Fungsi untuk mengirim data form ke server
  const onSubmit = async (data) => {
    console.log(data);

    function removeHyphens(inputString) {
      return inputString.replace(/-/g, "");
    }

    const dateWithoutHyphens = Number(removeHyphens(data.tanggal_rilis));

    const newFormData = {
      ...data,
      tanggal_rilis: dateWithoutHyphens,
    };

    console.log(newFormData);
    // Mengirim data newFormData ke server dengan metode POST
    try {
      const response = await fetch("http://localhost:3001/mangalist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (response.ok) {
        console.log(response);
      } else {
        console.error("Failed to post data.");
      }

      const data = await response.json();
      if (data.message === "Manga created successfully") {
        navigate("/")
      }else{
        alert(data.message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="input-container">
      <form className="input-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            required
            placeholder="Judul Manga"
            type="text"
            id="judul"
            name="judul"
            {...register("judul", {required : true})}
          />
          {errors.judul && <p className="text-red-500">{errors.judul.message}</p>}
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Jumlah Volume"
            type="number"
            id="jumlah_volume"
            name="jumlah_volume"
            {...register("jumlah_volume", {required : true, valueAsNumber: true, validate: (value) => value > 0 || "Value Harus Lebih dari 0"})}
            />
            {errors.jumlah_volume && <p className="text-red-500">{errors.jumlah_volume.message}</p>}
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Penerbit"
            type="text"
            id="penerbit"
            name="penerbit"
            {...register("penerbit", {required : true})}
          />
          {errors.penerbit && <p className="text-red-500">{errors.penerbit.message}</p>}
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Penulis"
            type="text"
            id="penulis"
            name="penulis"
            {...register("penulis", {required : true})}
          />
          {errors.penulis && <p className="text-red-500">{errors.penulis.message}</p>}
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Rating"
            type="number"
            id="rating"
            name="rating"
            {...register("rating", {required : true, valueAsNumber: true, validate: (value) => 6 > value > 0 || "Value Harus Kurang dari 5"})}
          />
          {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Tanggal Rilis"
            type="date"
            id="tanggal_rilis"
            name="tanggal_rilis"
            {...register("tanggal_rilis", {required : true})}
          />
          {errors.tanggal_rilis && <p className="text-red-500">{errors.tanggal_rilis.message}</p>}
        </div>
        <div className="form-group">
          <input
            required
            placeholder="Url Baca"
            type="url_baca"
            id="url_baca"
            name="url_baca"
            {...register("url_baca", {required : true})}
          />
          {errors.url_baca && <p className="text-red-500">{errors.url_baca.message}</p>}
        </div>
       <div className="flex justify-between gap-10">
        <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Submit</button>
        <button onClick={()=>navigate("/")} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Back</button>
        </div>
      </form>
    </div>
  );
};

export default Input;