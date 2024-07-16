import React from 'react'
import { CustomStyledButton } from './CustomButton.styles'

const CustomButton = ({children}) => {
  return (
      <CustomStyledButton>
          {
              children
          }
    </CustomStyledButton>
  )
}

export default CustomButton;