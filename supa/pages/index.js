import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Conectarse a Supabase con la URL y anon key reales
const supabase = createClient(
  'https://bvkttnllojiinblskghw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2a3R0bmxsb2ppaW5ibHNrZ2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTAwNzgsImV4cCI6MjA2Mzg4NjA3OH0.cy19e3ky8U-AxZcLfdeOxlbnGURVpfa4rOksvclmIns'
);

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const uploadPhoto = async () => {
    if (!file) return setMessage('Seleccioná un archivo');

    const { data, error } = await supabase.storage
      .from('fotos')
      .upload(`${Date.now()}_${file.name}`, file);

    if (error) setMessage('Error al subir la imagen');
    else setMessage('Imagen subida correctamente');
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Compartí tus momentos de la reunión con nosotros</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '20px 0' }} />
      <button onClick={uploadPhoto} style={{ marginBottom: 20, padding: '10px 20px' }}>Subir</button>
      <p>{message}</p>
    </div>
  );
}

