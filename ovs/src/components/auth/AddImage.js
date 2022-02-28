import React, { useState, useRef, useEffect, Fragment } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AddImage = () => {
  const [Cookies] = useCookies(["token"]);
  const ApiUrl = "http://localhost:3030/api/user/update/image";
  const [ImageResult, setImageResult] = useState(null);
  const [ImageErr, setImageErr] = useState();
  const [imageSend, setimageSend] = useState(false);
  const [image, setImage] = useState();
  const [imageID, setImageID] = useState("");

  async function sendImage() {
    // Image OVS AND CLOUDINARY
    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "vl1x410i");
        const cloudImage = await axios.post(
          "https://api.cloudinary.com/v1_1/ovsepitech/upload",
          formData
        );
        imageUrl = cloudImage.data.url;
      } else {
        throw new Error("Sélectionnez une image");
      }
      const submitPost = {
        image: imageUrl,
      };
      const dbImage = await axios.post(
        "http://localhost:3030/api/images/store-image",
        submitPost
      );
      setImageID(dbImage.data._id);
      setImageResult("Succes");
      setimageSend(true);
    } catch (err) {
      setImageErr(err.response?.data.message || err.message);
    }
  }

  async function sendProfil() {
    const UserData = {
      avatar: imageID,
    };
    try {
      if (!image) {
        throw new Error("Sélectionnez une image");
      }
      const res = await axios.put(`${ApiUrl}`, UserData, {
        headers: {
          "auth-token": Cookies.token,
        },
      });
      const result = res.data.message;
      setImageResult(result);
    } catch (err) {
      setImageErr(err.response?.data.message || err.message);
    }
  }

  return (
    <div>
      <div className="mt-2">
        <input
          className="w-full px-3 py-2 mb-6 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {!imageSend ? (
          <button
            type="button"
            className="bg-blue-600 py-2 px-10 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
            onClick={() => sendImage()}
          >
            Ajouter
          </button>
        ) : (
          <button
            type="button"
            className="bg-blue-600 py-2 px-10 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
            onClick={() => sendProfil()}
          >
            Modifier l'avatar
          </button>
        )}
        {ImageResult && (
          <div
            className="bg-blue-100 border mt-2 flex border-blue-500 text-blue-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="block sm:inline">{ImageResult}</span>
          </div>
        )}
        {ImageErr && (
          <div
            className="bg-red-100 border mt-2 flex border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="block sm:inline">{ImageErr}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddImage;
