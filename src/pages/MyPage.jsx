import React from "react";
import Header from "../components/Headers";
import My from "../components/MyList"
import MyIntroduce from "../components/Introduce";

const MyPage = () => {
    return(
        <>
            <Header />
            <MyIntroduce />
            <My />
        </>
    )
}

export default MyPage