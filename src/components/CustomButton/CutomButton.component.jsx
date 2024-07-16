import React from 'react'
import { CustomStyledButton } from './CustomButton.styles'

const CustomButton = ({children, style}) => {
  return (
      <CustomStyledButton
          style={style}
      >
          {
              children
          }
    </CustomStyledButton>
  )
}

export default CustomButton;