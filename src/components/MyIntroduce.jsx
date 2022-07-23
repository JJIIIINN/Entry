import React, {useState} from "react";

const MyIntroduce = () => {
    const [photo, setPhoto] = useState("../assets/img/Vectou.png");
    return(
        <>
            <input 
                        type = 'file'
                        id = 'photoInput'
                        accept=".png, .jpg, .jpeg"
                        ref = { photo }
                        onChange={(e) => {
                            setPhoto(e.target.value)
                        }}
                        />
        </>
    )
}

export default MyIntroduce