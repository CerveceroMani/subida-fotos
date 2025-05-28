import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bvkttnllojiinblskghw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2a3R0bmxsb2ppaW5ibHNrZ2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTAwNzgsImV4cCI6MjA2Mzg4NjA3OH0.cy19e3ky8U-AxZcLfdeOxlbnGURVpfa4rOksvclmIns' // ⚠️ Cambiala por seguridad si la subiste pública
)

export default function Home() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const uploadPhoto = async () => {
    if (!file) return setMessage('Seleccioná un archivo')
    const { data, error } = await supabase
      .storage
      .from('fotos')
      .upload(`${Date.now()}_${file.name}`, file)

    if (error) setMessage('Error al subir la imagen 😢')
    else setMessage('Imagen subida correctamente ✅')
  }

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f2f2f2',
      padding: 20
    }}>
      <h1 style={{ marginBottom: 20 }}>Compartí tus momentos de la reunión con nosotros 📸</h1>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: 10 }}
      />
      <button 
        onClick={uploadPhoto} 
        style={{
          padding: '8px 16px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          marginBottom: 15
        }}
      >
        Subir
      </button>
      <p>{message}</p>
    </main>
  )
}
