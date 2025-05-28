import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bvktlnlojilbinlsbkyhm.supabase.co',
  'TU_CLAVE_PUBLICA' // ⚠️ Cambiala por seguridad si la subiste pública
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
