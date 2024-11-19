import { useState } from "react"

const InputBox = ({name,type,placeholder,value,id,icon}) => {

    const [Pass_vis , setPass_vis] = useState(false)

    return (
        <div className="relative w-[100%] mb-4">
            <input 
                name={name}
                // for hidding password 
                type={type == 'password'?Pass_vis?"text":"password":type}
                placeholder={placeholder}
                defaultValue={value }
                id={id}

                className="input-box "
      
            />

            <i className={"fi " + icon + " input-icon"}></i>

            {
                type == 'password'? Pass_vis? 
                <i className="fi fi-rr-eye input-icon left-[auto] right-4 cursor-pointer" 
                onClick={() => setPass_vis(prev => !prev)}
                // for showing

                ></i>   :
                <i className="fi fi-rr-eye-crossed input-icon left-[auto] right-4 cursor-pointer" 
                    onClick={() => setPass_vis(prev => !prev)}
                    // for hiding 
                ></i>
                :""
            }

            

        </div>
    )
}

export default InputBox