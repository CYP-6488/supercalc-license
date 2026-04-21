export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>
          Super Calculator
        </h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', opacity: 0.9, marginBottom: '30px' }}>
          License Activation Server
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>How to Activate</h2>
          <ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Open Super Calculator on your computer</li>
            <li>Copy your machine code from the startup dialog</li>
            <li>Contact us to purchase a license</li>
            <li>Enter the license key in the software</li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Pricing</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px' 
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Single Module</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>¥9.9</div>
              <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>One-time purchase</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '5px' }}>All Modules</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>¥49.9</div>
              <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>One-time purchase</div>
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.15)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '10px' }}>Contact Us</h3>
          <p>Email: support@supercalc.com</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Send your machine code and we will reply with a license key
          </p>
        </div>
      </div>

      <footer style={{ marginTop: '30px', opacity: 0.7, fontSize: '0.9rem' }}>
        © 2024 Super Calculator. All rights reserved.
      </footer>
    </main>
  )
}
