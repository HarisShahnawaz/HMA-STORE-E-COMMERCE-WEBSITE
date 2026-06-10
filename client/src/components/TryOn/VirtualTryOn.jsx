import { useState, useRef, useCallback, useEffect } from 'react';
import {
  X, Upload, Sparkles, Loader2, CheckCircle, AlertCircle,
  RotateCcw, Download, Camera, CameraOff, Shirt, Heart, Trash2
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── FASHION LOADING ANIMATION ──
function FashionLoader() {
  const tips = [
    '👗 Analyzing your style...',
    '✨ AI is placing the garment...',
    '🪡 Adjusting fabric drape...',
    '🎨 Perfecting the fit...',
    '💫 Almost ready to wear...',
  ];
  const [tipIdx, setTipIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full rounded-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden"
      style={{ aspectRatio: '3/4', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>

      {/* Runway lights */}
      <div className="absolute inset-0 flex justify-around items-end pb-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-0.5 opacity-40"
            style={{
              height: `${30 + i * 10}%`,
              background: 'linear-gradient(to top, #a855f7, transparent)',
              animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
            }} />
        ))}
      </div>

      {/* Spinning dress silhouette */}
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 border-t-purple-400 animate-spin absolute" />
        <div className="w-16 h-16 rounded-full border-4 border-pink-500/30 border-b-pink-400 animate-spin absolute"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <Shirt size={32} className="text-white/80 relative z-10" style={{ animation: 'float 2s ease-in-out infinite' }} />
      </div>

      <div className="text-center px-6 z-10">
        <p className="text-white font-bold text-sm mb-1 transition-all duration-500">{tips[tipIdx]}</p>
        <p className="text-purple-300 text-xs">This takes ~30–60 seconds</p>
        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center mt-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
              style={{ animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </div>
  );
}

// ── WEBCAM CAPTURE ──
function WebcamCapture({ onCapture, onCancel }) {
  const videoRef = useRef();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 720, height: 1280 } })
      .then(s => {
        stream = s;
        videoRef.current.srcObject = s;
        videoRef.current.play();
        setReady(true);
      })
      .catch(() => setError('Camera access denied. Please allow camera permission.'));
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    onCapture(canvas.toDataURL('image/jpeg', 0.9));
  };

  return (
    <div className="flex flex-col gap-3">
      {error ? (
        <div className="w-full rounded-2xl bg-red-50 flex items-center justify-center p-8 text-center" style={{ aspectRatio: '3/4' }}>
          <div>
            <CameraOff size={40} className="text-red-300 mx-auto mb-3" />
            <p className="text-sm text-red-500">{error}</p>
            <button onClick={onCancel} className="mt-4 text-xs text-gray-500 underline">Go back</button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '3/4' }}>
          <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
          {/* Overlay guides */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-56 border-2 border-white/40 rounded-full" />
          </div>
          <div className="absolute bottom-0 inset-x-0 p-4 flex gap-3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
            <button onClick={onCancel}
              className="flex-1 py-3 rounded-xl bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
              Cancel
            </button>
            <button onClick={capture} disabled={!ready}
              className="flex-1 py-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
              <Camera size={15} /> Snap Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper: Resize and compress base64 images on the client side to bypass Vercel's 4.5MB payload limits
function compressBase64(base64Str, maxWidth = 800, maxHeight = 1000, quality = 0.8) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Keep aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Return compressed JPEG base64 string
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(base64Str); // Fallback to original if failure
  });
}

// ── MAIN MODAL ──
export default function VirtualTryOn({ product, relatedProducts = [], onClose }) {
  const { user, token } = useUserAuth();

  const [photoMode, setPhotoMode]     = useState('upload'); // 'upload' | 'webcam'
  const [userPhoto, setUserPhoto]     = useState(null);
  const [productB64, setProductB64]   = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [step, setStep]               = useState('upload'); // 'upload'|'processing'|'result'
  const [dragOver, setDragOver]       = useState(false);
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [activeProduct, setActiveProduct] = useState(product);
  const fileRef = useRef();

  // When user switches product, clear previous result
  const switchProduct = (p) => {
    setActiveProduct(p);
    setResultImage(null);
    setProductB64(null);
    setStep('upload');
    setError(null);
    setSaved(false);
  };

  // Convert product image to base64 via canvas
  const getProductBase64 = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (productB64) return resolve(productB64);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width  = img.width;
        c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        const b64 = c.toDataURL('image/jpeg');
        // Compress product image as well
        compressBase64(b64, 800, 1000, 0.8).then(comp => {
          setProductB64(comp);
          resolve(comp);
        });
      };
      img.onerror = () => reject(new Error('Failed to load product image'));
      img.src = activeProduct.image;
    });
  }, [activeProduct.image, productB64]);

  const handleFileChange = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      // Compress the uploaded photo
      const compressed = await compressBase64(e.target.result, 800, 1000, 0.8);
      setUserPhoto(compressed);
      setResultImage(null);
      setError(null);
      setStep('upload');
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleTryOn = async () => {
    if (!userPhoto) { setError('Please upload or capture your photo first!'); return; }
    setLoading(true);
    setError(null);
    setStep('processing');
    setSaved(false);

    try {
      const pb64 = await getProductBase64();
      const res  = await fetch(`${API_URL}/api/tryon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoBase64:    userPhoto,
          productImageBase64: pb64,
          category:           activeProduct.category,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Try-on failed. Please try again in a moment.');
      setResultImage(data.resultImage?.url || data.resultImage);
      setStep('result');
    } catch (err) {
      setError(err.message);
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!token) { setError('Please log in to save try-ons to your profile.'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/tryon/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          resultImage:  resultImage,
          productId:    activeProduct._id,
          productName:  activeProduct.name,
          productImage: activeProduct.image,
          category:     activeProduct.category,
        }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
    } catch {
      setError('Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href     = resultImage;
    a.download = `tryon-${activeProduct.name}.jpg`;
    a.click();
  };

  const allProducts = [product, ...relatedProducts.filter(p => p._id !== product._id)].slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', animation: 'fadeIn 0.2s ease' }}>

      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col"
        style={{ maxHeight: '92vh', animation: 'slideUp 0.3s ease-out' }}>

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">Virtual Fitting Room</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Powered by AI · Free</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* ── PRODUCT SWITCHER (Multiple Outfits) ── */}
        {allProducts.length > 1 && (
          <div className="px-7 py-3 border-b border-gray-50 shrink-0">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-2">Switch Outfit</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allProducts.map(p => (
                <button key={p._id} onClick={() => switchProduct(p)}
                  className="relative shrink-0 w-12 h-14 rounded-xl overflow-hidden border-2 transition-all"
                  style={{ borderColor: activeProduct._id === p._id ? '#7c3aed' : 'transparent' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {activeProduct._id === p._id && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(124,58,237,0.25)' }}>
                      <CheckCircle size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PHOTO MODE TABS ── */}
        <div className="px-7 pt-4 shrink-0">
          <div className="flex bg-gray-100 rounded-xl p-1 w-fit gap-1">
            {[
              { id: 'upload', icon: <Upload size={13} />, label: 'Upload' },
              { id: 'webcam', icon: <Camera size={13} />, label: 'Camera' },
            ].map(tab => (
              <button key={tab.id} onClick={() => { setPhotoMode(tab.id); setError(null); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                style={photoMode === tab.id
                  ? { background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white' }
                  : { color: '#9ca3af' }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">

          {/* LEFT — Photo Input */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Your Photo</p>

            {photoMode === 'webcam' ? (
              userPhoto ? (
                <div className="relative group rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img src={userPhoto} alt="Captured" className="w-full h-full object-cover" />
                  <button onClick={() => setUserPhoto(null)}
                    className="absolute bottom-3 inset-x-3 py-2 rounded-xl bg-black/60 text-white text-xs font-bold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Retake Photo
                  </button>
                </div>
              ) : (
                <WebcamCapture onCapture={async (b64) => {
                  const compressed = await compressBase64(b64, 800, 1000, 0.8);
                  setUserPhoto(compressed);
                  setPhotoMode('upload');
                }} onCancel={() => setPhotoMode('upload')} />
              )
            ) : (
              userPhoto ? (
                <div className="relative group rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img src={userPhoto} alt="Your photo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button onClick={() => fileRef.current.click()}
                      className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                      <Upload size={13} /> Change
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                </div>
              ) : (
                <button onClick={() => fileRef.current.click()}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileChange(e.dataTransfer.files[0]); }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  className="w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all cursor-pointer"
                  style={{ aspectRatio: '3/4', borderColor: dragOver ? '#7c3aed' : '#e5e7eb', background: dragOver ? '#f5f3ff' : '#fafafa' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #ede9fe, #fce7f3)' }}>
                    <Upload size={22} className="text-purple-500" />
                  </div>
                  <div className="text-center px-4">
                    <p className="font-bold text-gray-700 text-sm mb-1">Upload photo</p>
                    <p className="text-xs text-gray-400">Drag & drop or click to browse</p>
                    <p className="text-[10px] text-gray-300 mt-1">Full-body, clear background = best results</p>
                  </div>
                </button>
              )
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])} />
          </div>

          {/* RIGHT — Result / Product Preview */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
              {step === 'result' ? '✨ Your Look' : 'Outfit to Try'}
            </p>

            {step === 'processing' ? <FashionLoader /> : (
              <div className="relative rounded-2xl overflow-hidden group" style={{ aspectRatio: '3/4' }}>
                <img src={resultImage || activeProduct.image} alt="result"
                  className="w-full h-full object-cover transition-all duration-700" />

                {step === 'result' && (
                  <>
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
                      <Sparkles size={10} /> AI Result
                    </div>
                    {/* Hover actions */}
                    <div className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={handleDownload}
                        className="flex-1 py-2 rounded-xl bg-black/60 text-white text-xs font-bold backdrop-blur-sm flex items-center justify-center gap-1.5">
                        <Download size={13} /> Save
                      </button>
                      <button onClick={() => { setResultImage(null); setStep('upload'); setSaved(false); }}
                        className="flex-1 py-2 rounded-xl bg-black/60 text-white text-xs font-bold backdrop-blur-sm flex items-center justify-center gap-1.5">
                        <RotateCcw size={13} /> Retry
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Active product info */}
            <div className="mt-3 flex items-center gap-2">
              <img src={activeProduct.image} className="w-8 h-10 rounded-lg object-cover border border-gray-100" alt="" />
              <div>
                <p className="text-xs font-bold text-gray-700 truncate max-w-[180px]">{activeProduct.name}</p>
                <p className="text-[10px] text-gray-400">Rs {activeProduct.price?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div className="mx-7 mb-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2 shrink-0">
            <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* ── ACTION BUTTONS ── */}
        <div className="px-7 pb-7 shrink-0">
          {step === 'result' ? (
            <div className="flex gap-3">
              <button onClick={() => { setResultImage(null); setStep('upload'); setSaved(false); }}
                className="flex-1 h-12 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <RotateCcw size={15} /> Try Again
              </button>
              {user ? (
                <button onClick={handleSave} disabled={saving || saved}
                  className="flex-1 h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                  style={{ background: saved ? '#22c55e' : 'linear-gradient(135deg, #7c3aed, #ec4899)', opacity: (saving || saved) ? 0.85 : 1 }}>
                  {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <><CheckCircle size={15} /> Saved!</> : <><Heart size={15} /> Save to Profile</>}
                </button>
              ) : (
                <button onClick={handleDownload}
                  className="flex-1 h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
                  <Download size={15} /> Download
                </button>
              )}
            </div>
          ) : (
            <button onClick={handleTryOn} disabled={loading || !userPhoto}
              className="w-full h-14 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', boxShadow: '0 8px 24px rgba(124,58,237,0.3)' }}>
              {loading
                ? <><Loader2 size={17} className="animate-spin" /> AI is processing...</>
                : <><Sparkles size={17} /> Try This On Now</>}
            </button>
          )}
          <p className="text-center text-[10px] text-gray-300 mt-2">
            🔒 Photos are processed securely and never stored
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
