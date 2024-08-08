import { SearchboxContainer } from './Searchbox.styles'

const Searchbox = ({children}) => {
    return (
        <SearchboxContainer>
            {children}
        </SearchboxContainer>
  )
}

export default Searchbox;