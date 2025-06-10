import React, { useState, useRef, useEffect } from "react";
import { Camera, Paperclip } from "lucide-react";
// import axios from "axios";
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
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Komunitas Edukasi
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Share your notes, assignments and study materials with fellow
              students in just a few clicks.
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
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Hasil Deteksi '{labelTranslations[item.label] || item.label} (
                {item.confidence}%)'
              </h2>

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
