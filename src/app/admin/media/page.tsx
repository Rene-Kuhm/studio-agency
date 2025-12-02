'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '@/components/admin';
import Image from 'next/image';

interface MediaFile {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.ok) {
        setSuccessMessage('Archivo subido correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
        await fetchFiles();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al subir archivo');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Error de conexion');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (filename: string) => {
    if (!confirm('¿Estas seguro de eliminar este archivo?')) return;

    try {
      const res = await fetch(`/api/admin/media?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMessage('Archivo eliminado correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
        setSelectedFile(null);
        await fetchFiles();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al eliminar archivo');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Error de conexion');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setSuccessMessage('URL copiada al portapapeles');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Media</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus archivos multimedia</p>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500"
            >
              {error}
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
              ${dragActive
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/50 hover:bg-secondary/30'
              }
            `}
          >
            <input
              type="file"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            {isUploading ? (
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">Subiendo archivo...</p>
                <div className="w-full max-w-xs mx-auto bg-secondary rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <svg
                  className="w-12 h-12 mx-auto text-muted-foreground mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-lg font-medium mb-2">
                  Arrastra archivos aqui o haz clic para seleccionar
                </p>
                <p className="text-sm text-muted-foreground">
                  Imagenes, videos, PDFs y documentos (max 10MB)
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Files Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : files.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-muted-foreground">No hay archivos multimedia</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Sube tu primer archivo arrastrando o haciendo clic arriba
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedFile(file)}
                className={`
                  relative group cursor-pointer bg-secondary/30 rounded-xl overflow-hidden border-2 transition-all
                  ${selectedFile?.name === file.name
                    ? 'border-accent'
                    : 'border-transparent hover:border-accent/50'
                  }
                `}
              >
                <div className="aspect-square relative">
                  {isImage(file.type) ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                      <svg
                        className="w-12 h-12 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(file.url);
                      }}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      title="Copiar URL"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.name);
                      }}
                      className="p-2 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* File Info */}
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* File Detail Modal */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setSelectedFile(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Preview */}
                <div className="relative aspect-video bg-secondary">
                  {isImage(selectedFile.type) ? (
                    <Image
                      src={selectedFile.url}
                      alt={selectedFile.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedFile.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground block mb-2">
                      URL del archivo
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedFile.url}
                        readOnly
                        className="flex-1 px-4 py-2 bg-secondary rounded-lg text-sm"
                      />
                      <button
                        onClick={() => copyUrl(selectedFile.url)}
                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <a
                      href={selectedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-secondary text-center rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                    >
                      Abrir en nueva pestaña
                    </a>
                    <button
                      onClick={() => deleteFile(selectedFile.name)}
                      className="px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
