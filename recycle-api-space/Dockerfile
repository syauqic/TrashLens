# Gunakan Python versi terbaru yang kompatibel
FROM python:3.10-slim

# Atur working directory di dalam container
WORKDIR /app

# Atur environment variable HOME agar gdown bisa bikin cache/cookies
ENV HOME=/app
RUN mkdir -p /app/.cache/gdown

# Install OS-level dependencies
RUN apt-get update && apt-get install -y \
    git \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Salin semua file ke container
COPY . .

# Install dependensi Python
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install python-multipart

# Expose port FastAPI (harus 7860 agar cocok dengan Hugging Face Spaces)
EXPOSE 7860

# Jalankan server saat container mulai
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
