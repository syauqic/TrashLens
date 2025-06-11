import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, Paperclip, RefreshCw, ImagePlus } from "lucide-react";

const InputGambarModern = () => {
  const [preview, setPreview] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(null); // 'file' | 'camera'
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let stream;

    if (mode === "camera") {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          alert("Tidak bisa akses kamera: " + err.message);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [mode]);

  const resetInput = () => {
    setPreview(null);
    setImageBlob(null);
    setMode(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageBlob(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const captureFromCamera = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setImageBlob(blob);
      setPreview(URL.createObjectURL(blob));
    }, "image/png");
  };

  const handleSend = async () => {
    if (!imageBlob) return alert("Gambar belum dipilih atau diambil.");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imageBlob, "image.png");

    try {
      const res = await axios.post("https://syauqic-recycle-api.hf.space/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const hasil = res.data.top_predictions;
      navigate("/hasil", { state: { predictions: hasil } });
    } catch (err) {
      alert("Gagal kirim gambar: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="InputGambar" className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8">
          Waste Detection
        </h2>
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center border border-dashed border-blue-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) handleFileChange({ target: { files: e.dataTransfer.files } });
        }}
      >
        {!preview && mode !== "camera" && (
          <>
            <ImagePlus className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          
            <p className="text-gray-500 text-sm mt-3">
              Upload atau 
              <br /><span className="text-xs mt-1 block">Foto</span>
            </p>
          </>
        )}

        {mode === "camera" && !preview && (
          <div className="flex flex-col items-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-md mb-2 object-cover"
            />
            <canvas ref={canvasRef} width="300" height="300" className="hidden" />
            <button
              onClick={captureFromCamera}
              className="bg-green-600 text-white px-4 py-2 rounded mb-2"
            >
              Ambil Gambar
            </button>
          </div>
        )}

        {preview && (
          <div>
            <img src={preview} alt="Preview" className="object-cover w-full h-60 rounded-md mb-4" />
            <div className="flex justify-center gap-3">
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Kirim Gambar"}
              </button>
              <button
                onClick={resetInput}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                <RefreshCw className="w-4 h-4 inline mr-1" /> Ulang
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => {
              setMode("file");
              resetInput();
              inputFileRef.current.click();
            }}
            className="bg-gray-200 p-2 rounded-full shadow"
          >
            <Paperclip className="w-5 h-5 text-gray-800" />
          </button>

          <button
            onClick={() => {
              resetInput();
              setMode("camera");
            }}
            className="bg-gray-200 p-2 rounded-full shadow"
          >
            <Camera className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputFileRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
};

export default InputGambarModern;
