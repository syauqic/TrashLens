import React, { useState, useEffect } from 'react';
import { Play, Filter, Search, ExternalLink, Tag, User } from 'lucide-react';
import { videoData } from '../data/videoData';

const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const convertToEmbedUrl = (url) => {
  if (url.includes('/embed/')) return url;
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const getOriginalYouTubeUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
};

export default function VideoPage() {
  const [videos] = useState(
    videoData.map((video) => ({
      id: `${video.Link}_${video.Kategori}`,
      title: video.Notes,
      videoUrl: video.Link,
      category: video.Kategori,
      notes: video.Notes,
      source: video.Source,
      thumbnail: 
        video.Source === 'Youtube'
        ? `https://img.youtube.com/vi/${getYouTubeVideoId(video.Link)}/0.jpg`
        : './TikTok-Logo.wine.png',
    }))
  );

  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', ...new Set(videos.map((video) => video.category))];

  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    setFilteredVideos(filtered);
  }, [searchTerm, selectedCategory, videos]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            🎥 Video Edukasi Pengelolaan Sampah
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kumpulan video edukatif untuk membantu Anda memahami cara mengelola sampah dengan benar,
            dari pemilahan hingga pengolahan yang ramah lingkungan.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari video berdasarkan judul, deskripsi, atau sumber..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {filteredVideos.length} dari {videos.length} video
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative group cursor-pointer" onClick={() => openVideoModal(video)}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/480x360/22C55E/FFFFFF?text=Video+Edukasi';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-600 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {video.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                  {video.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{video.notes}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{video.source}</span>
                  </div>

                  <button
                    onClick={() => openVideoModal(video)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Tonton
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Video Ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}

        {isModalOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {selectedVideo.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedVideo.source}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video mb-4">
                  {selectedVideo.source === 'Youtube' ? (
                  <iframe
                    src={convertToEmbedUrl(selectedVideo.videoUrl)}
                    title={selectedVideo.title}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                      <img src="./TikTok-Logo.wine.png" alt="Tiktok Video" className="w-full h-full object-contain"/>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Deskripsi Video</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedVideo.notes}</p>
                </div>

                <div className="mt-4 flex justify-center">
                  <a
                    href={getOriginalYouTubeUrl(selectedVideo.videoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Buka di {selectedVideo.source}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};