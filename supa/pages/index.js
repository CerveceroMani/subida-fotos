import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://bvkttnllojiinblskghw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2a3R0bmxsb2ppaW5ibHNrZ2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTAwNzgsImV4cCI6MjA2Mzg4NjA3OH0.cy19e3ky8U-AxZcLfdeOxlbnGURVpfa4rOksvclmIns'
);

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadPhoto = async () => {
    if (!file) return setMessage('Seleccioná un archivo');

    setLoading(true);
    setProgress(0);
    setMessage('');

    const fileName = `${Date.now()}_${file.name}`;

    const upload = supabase.storage.from('fotos').upload(fileName, file);

    // Simulación de progreso (ya que Supabase no lo da)
    const simulateProgress = () => {
      let val = 0;
      const interval = setInterval(() => {
        val += 10;
        setProgress(val);
        if (val >= 100) clearInterval(interval);
      }, 100);
    };

    simulateProgress();

    const { data, error } = await upload;

    setLoading(false);
    setProgress(100);

    if (error) setMessage('Error al subir la imagen');
    else setMessage('Imagen subida correctamente');
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial', minHeight: '100vh', background: '#f7f9fc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 0 20px rgba(0,0,0,0.1)', padding: 40, textAlign: 'center', width: '100%', maxWidth: 400 }}>
        <h1 style={{ marginBottom: 30, color: '#333' }}>Compartí tus momentos de la reunión con nosotros</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: 20 }} />
        <br />
        <button
          onClick={uploadPhoto}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Subir
        </button>

        {loading && (
          <div style={{ marginTop: 20, width: '100%', background: '#eee', borderRadius: 10 }}>
            <div
              style={{
                height: 10,
                width: `${progress}%`,
                background: '#0070f3',
                borderRadius: 10,
                transition: 'width 0.3s ease-in-out'
              }}
            ></div>
          </div>
        )}

        <p style={{ marginTop: 20 }}>{message}</p>
      </div>
    </div>
  );
}
