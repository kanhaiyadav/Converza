import React from 'react'

const Welcome = () => {
  return (
      <div
          style={{
              textAlign: 'center',
              display: 'grid',
              placeContent: 'center',
              flexGrow: 1,
        }}
      >
          <img src='https://cdn-icons-png.freepik.com/256/3992/3992601.png?uid=R119661384&ga=GA1.1.1818177471.1708742591&semt=ais_hybrid' alt=''
              style={{ 
                  width: "150px",
                  height: "150px",
                  margin: 'auto'
               }}
          />

          <h2 style={{ color: "#399918" }}>Welcome to WhatsApp</h2>
          <p>Click on a user to start chatting</p>
    </div>
  )
}

export default Welcome;