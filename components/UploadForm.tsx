import { Upload, Image as ImageIcon, Search } from 'lucide-react';
import React from 'react';

export type UploadFormProps = {
  image: string | null;
  setImage: (img: string | null) => void;
  setDominantColor: (color: string | null) => void;
  setFile: (file: File | null) => void;
  analyzed: boolean;
  inferredColor: string | null;
  inferredCategory: string | null;
  inferredName: string;
  onAnalyze?: () => void;
  onSearch: () => void;
  onSave: () => void;
  analyzing?: boolean;
};

const UploadForm: React.FC<UploadFormProps> = (props) => {
  const { image, setImage, setDominantColor, setFile, analyzed, inferredColor, inferredCategory, inferredName, onAnalyze, onSearch, onSave, analyzing } = props;
  const extractDominantColor = (src: string) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        const step = 10 * 4;
        for (let i = 0; i < data.length; i += step) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          setDominantColor(`#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
        }
      };
      img.onerror = () => setDominantColor(null);
      img.src = src;
    } catch {
      setDominantColor(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setImage(dataUrl);
        extractDominantColor(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImage(url);
    if (!url) return;
    // Try to fetch via server to avoid CORS for color extraction
    fetch('/api/fetch-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    }).then(async (res) => {
      if (!res.ok) return;
      const data = await res.json();
      if (data?.dataUrl) extractDominantColor(data.dataUrl);
    }).catch(() => {});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 items-center">
      <div className="flex gap-2 w-full">
        <label className="flex-1 flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
          <Upload className="w-5 h-5 text-gray-500" />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <span className="text-gray-700">Upload Image</span>
        </label>
        <div className="flex-1 flex items-center gap-2 border rounded px-3 py-2">
          <ImageIcon className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="Paste image URL"
            className="flex-1 outline-none"
            value={image && image.startsWith('http') ? image : ''}
            onChange={handleUrlChange}
          />
        </div>
      </div>
      {image && (
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-sm text-gray-600">Your uploaded image</span>
          <img src={image} alt="Preview" className="max-h-40 rounded shadow border object-contain" />
          {analyzed && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-sm text-gray-700">
              <div><span className="font-medium">Name:</span> {inferredName}</div>
              <div><span className="font-medium">Category:</span> {inferredCategory || 'N/A'}</div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Color:</span>
                {inferredColor || 'N/A'}
                {inferredColor && <span className="inline-block w-4 h-4 rounded border" style={{ backgroundColor: inferredColor }} />}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {onAnalyze && (
          <button
            className={`mt-2 px-4 py-2 rounded-full shadow transition text-white flex items-center gap-2 ${analyzing ? 'bg-indigo-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            onClick={onAnalyze}
            disabled={!image || analyzing}
          >
            {analyzing && (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {analyzing ? 'Analyzing...' : 'Analyze Image'}
          </button>
        )}
        <button
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          onClick={onSearch}
          disabled={!image || !analyzed}
        >
          Find Similar Products
        </button>
        <button
          className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow transition"
          onClick={onSave}
          disabled={!image || !analyzed}
        >
          Save to Catalog
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
