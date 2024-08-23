import React from 'react'
import { WelcomeTitle } from './Welcome.styles';

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
          <img src='/chat.png' alt=''
              style={{ 
                  width: "150px",
                  height: "150px",
                  margin: 'auto'
               }}
          />

          <WelcomeTitle>Converza</WelcomeTitle>
          <p style={{
                color: 'grey',
                fontSize: '1.2rem'
          }}>Your go-to for seamless conversations</p>
    </div>
  )
}

export default Welcome;