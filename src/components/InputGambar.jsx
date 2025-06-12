// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Camera, Paperclip, RefreshCw, ImagePlus } from "lucide-react";

// const InputGambarModern = () => {
//   const [preview, setPreview] = useState(null);
//   const [imageBlob, setImageBlob] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [mode, setMode] = useState(null); // 'file' | 'camera'
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const inputFileRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let stream;

//     if (mode === "camera") {
//       navigator.mediaDevices
//         .getUserMedia({ video: { facingMode: "environment" } })
//         .then((mediaStream) => {
//           stream = mediaStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((err) => {
//           alert("Tidak bisa akses kamera: " + err.message);
//         });
//     }

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//         videoRef.current.srcObject = null;
//       }
//     };
//   }, [mode]);

//   const resetInput = () => {
//     setPreview(null);
//     setImageBlob(null);
//     setMode(null);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageBlob(file);
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const captureFromCamera = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       setImageBlob(blob);
//       setPreview(URL.createObjectURL(blob));
//     }, "image/png");
//   };

//   const handleSend = async () => {
//     if (!imageBlob) return alert("Gambar belum dipilih atau diambil.");

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("file", imageBlob, "image.png");

//     try {
//       const res = await axios.post(
//         "https://syauqic-recycle-api.hf.space/predict",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       const hasil = res.data.top_predictions;
//       navigate("/hasil", { state: { predictions: hasil } });
//     } catch (err) {
//       alert("Gagal kirim gambar: " + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section id="InputGambar" className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8">
//           Waste Detection
//         </h2>
//       <div
//         className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center border border-dashed border-blue-400"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           if (e.dataTransfer.files[0]) handleFileChange({ target: { files: e.dataTransfer.files } });
//         }}
//       >
//         {!preview && mode !== "camera" && (
//           <>
//             <ImagePlus className="w-12 h-12 text-blue-500 mx-auto mb-4" />

//             <p className="text-gray-500 text-sm mt-3">
//               Upload atau
//               <br /><span className="text-xs mt-1 block">Foto</span>
//             </p>
//           </>
//         )}

//         {mode === "camera" && !preview && (
//           <div className="flex flex-col items-center">
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               className="w-full rounded-md mb-2 object-cover"
//             />
//             <canvas ref={canvasRef} width="300" height="300" className="hidden" />
//             <button
//               onClick={captureFromCamera}
//               className="bg-green-600 text-white px-4 py-2 rounded mb-2"
//             >
//               Ambil Gambar
//             </button>
//           </div>
//         )}

//         {preview && (
//           <div>
//             <img src={preview} alt="Preview" className="object-cover w-full h-60 rounded-md mb-4" />
//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={handleSend}
//                 className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Memproses..." : "Kirim Gambar"}
//               </button>
//               <button
//                 onClick={resetInput}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 <RefreshCw className="w-4 h-4 inline mr-1" /> Ulang
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mt-4 flex justify-center gap-3">
//           <button
//             onClick={() => {
//               setMode("file");
//               resetInput();
//               inputFileRef.current.click();
//             }}
//             className="bg-gray-200 p-2 rounded-full shadow"
//           >
//             <Paperclip className="w-5 h-5 text-gray-800" />
//           </button>

//           <button
//             onClick={() => {
//               resetInput();
//               setMode("camera");
//             }}
//             className="bg-gray-200 p-2 rounded-full shadow"
//           >
//             <Camera className="w-5 h-5 text-gray-800" />
//           </button>
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           ref={inputFileRef}
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>
//     </section>
//   );
// };

// export default InputGambarModern;

import React, { useState, useRef, useEffect } from "react";
import { Camera, Paperclip } from "lucide-react";
import axios from "axios";

const InputGambar = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (stream && videoRef.current && showCamera) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, showCamera]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      sendImageToAPI(file);
    }
  };

  const sendImageToAPI = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://syauqic-recycle-api.hf.space/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPredictions(response.data.top_predictions);
    } catch (error) {
      alert("Gagal mengirim gambar: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(console.error);
        };
      }
    } catch (err) {
      alert("Gagal mengakses kamera: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", {
              type: "image/jpeg",
            });
            setSelectedImage(URL.createObjectURL(blob));
            sendImageToAPI(file);
          }
        },
        "image/jpeg",
        0.8
      );
      stopCamera();
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const resetImage = () => {
    setSelectedImage(null);
    setPredictions([]);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getYouTubeTitle = async (url) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      const data = await response.json();
      return data.title || "Video Tanpa Judul";
    } catch (error) {
      console.error("Gagal ambil judul YouTube:", error);
      return "Video Tanpa Judul";
    }
  };

  const [videoTitles, setVideoTitles] = useState({});

  useEffect(() => {
    const fetchTitles = async () => {
      const titles = {};
      for (const item of predictions) {
        for (const link of item.recycle_links) {
          if (link.includes("youtube.com") || link.includes("youtu.be")) {
            const title = await getYouTubeTitle(link);
            titles[link] = title;
          }
        }
      }
      setVideoTitles(titles);
    };

    fetchTitles();
  }, [predictions]);

  const extractYouTubeId = (url) => {
    try {
      const youtubeRegex =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(youtubeRegex);
      return match ? match[1] : null;
    } catch (error) {
      console.error("Gagal ekstrak ID YouTube:", error);
      return null;
    }
  };

  const isTikTokLink = (url) => {
    return url.includes("tiktok.com");
  };

  const labelTranslations = {
    cardboard: "Kardus",
    shoes: "Sepatu",
    biological: "Organik",
    glass: "Kaca",
    metal: "Logam",
    trash: "Sampah Umum",
    clothes: "Pakaian",
    paper: "Kertas",
    plastic: "Plastik",
    battery: "Baterai",
  };

  return (
    <section className="bg-[#f8f9ff] py-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2">
          <div className="relative bg-gray-800 rounded-xl overflow-hidden group shadow-xl">
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={resetImage}
                    className="bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    Reset
                  </button>
                </div>
              </>
            ) : showCamera ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-4 right-4 flex gap-3">
                  <button
                    onClick={captureImage}
                    className="bg-white hover:bg-gray-100 text-green-600 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Camera size={24} />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-white hover:bg-gray-100 text-red-600 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-64 bg-gray-500 group-hover:scale-105 transition-transform duration-300 flex justify-center items-center" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 flex gap-3">
                  <button
                    onClick={triggerFileInput}
                    className="bg-white hover:bg-gray-50 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    title="Unggah Foto"
                  >
                    <Paperclip size={20} />
                  </button>
                  <button
                    onClick={startCamera}
                    disabled={isLoading}
                    className="bg-white hover:bg-gray-50 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                    title="Ambil Foto"
                  >
                    {isLoading ? (
                      <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                    ) : (
                      <Camera size={20} />
                    )}
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 text-left">
          <div className="border-l-4 border-pink-400 pl-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Deteksi Sampahmu
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Unggah foto sampahmu atau ambil foto secara langsung menggunakan
              kamera.
            </p>
          </div>
        </div>
      </div>

      {predictions.length > 0 && (
        <div className="mt-6 px-4">
          {predictions.map((item, index) => (
            <section
              key={index}
              className="bg-[#f5f7ff] py-12 rounded-xl shadow mb-10"
            >
              <div className="w-full max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-green-700 mb-1 text-center">
                  Hasil Deteksi
                </h2>

                <h3 className="text-2xl font-bold text-green-700 mb-2 text-center">
                  {labelTranslations[item.label] || item.label} (
                  {item.confidence}
                  %)
                </h3>

                {item.message && (
                  <div className="bg-white border border-blue-200 rounded-lg p-6 mb-6 shadow-sm">
                    <p className="text-gray-800 text-justify whitespace-pre-line leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {item.recycle_links.map((link, i) => (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="relative bg-gray-800 rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="w-full h-48 bg-gray-300 group-hover:scale-105 transition-transform duration-300">
                      {isTikTokLink(link) ? (
                        <img
                          src="/TikTok-Logo.wine.png"
                          alt="TikTok Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={`https://img.youtube.com/vi/${extractYouTubeId(
                            link
                          )}/0.jpg`}
                          alt="YouTube Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h4 className="text-white font-semibold text-sm truncate">
                        {videoTitles[link] || "TikTok Video"}
                      </h4>
                      <p className="text-gray-300 text-xs mt-1 truncate">
                        Pelajari cara mengelola sampah dengan benar
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

export default InputGambar;
