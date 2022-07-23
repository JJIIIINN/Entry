import React from "react";
import Header from "../components/Header";
import My from "../components/My"
import MyIntroduce from "../components/MyIntroduce";

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