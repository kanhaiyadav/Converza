import React from 'react'
import { CustomStyledButton } from './CustomButton.styles'

const CustomButton = ({children, style, ...otherProps}) => {
  return (
      <CustomStyledButton
          style={style}
            {...otherProps}
      >
          {
              children
          }
    </CustomStyledButton>
  )
}

export default CustomButton;