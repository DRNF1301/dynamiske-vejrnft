import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      const key = process.env.NEXT_PUBLIC_OWM_KEY
      const city = 'Copenhagen,DK'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
      try {
        const resp = await axios.get(url)
        setWeather(resp.data.weather[0].main.toLowerCase())
      } catch (e) {
        console.error(e)
      }
    }
    fetchWeather()
  }, [])

  const outfits = {
    clear:   '/assets/sunny_outfit.png',
    rain:    '/assets/rainy_outfit.png',
    snow:    '/assets/snowy_outfit.png',
    thunder: '/assets/thunder_outfit.png',
  }
  const outfit = outfits[weather] || null

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <h1>Min Dynamiske Vejr‑Panda</h1>
      <div style={{
        position: 'relative',
        width: 512,
        height: 512
      }}>
        <img
          src="/assets/panda_base_avatar.png"
          width={512} height={512}
          alt="Panda Base"
        />
        {outfit && (
          <img
            src={outfit}
            style={{ position: 'absolute', top: 0, left: 0 }}
            width={512} height={512}
            alt="Outfit"
          />
        )}
      </div>
      {!weather && <p>Henter vejrdata…</p>}
      {weather && <p>Vejret er: {weather}</p>}
    </main>
  )
}
