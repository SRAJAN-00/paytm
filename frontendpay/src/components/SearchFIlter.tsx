import { InputField } from "./InputField"


const SearchFIlter = () => {
    
  return (
    <div>
        <InputField onChange={(e) => {
              e.target.value
          } } label={""} value={""}/>
    </div>
  )
}

export default SearchFIlter