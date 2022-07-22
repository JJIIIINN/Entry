import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { BASE_URL } from "../assets/API/axios";

const Detail = () => {
    const { id } = useParams();
    const [ dataList, setDataList ] = useState([]);
    const navigate = useNavigate()

    useEffect(
        () => {
            axios.get(`${ BASE_URL }/posts/${id}`)
            .then((response) =>{
                console.log(response.data)
                setDataList(response.data)
        })
        .catch((error) => {
            alert("에러")
        })
    },[ id ]
    )

    const Adit = () => {
        navigate(`/posts/adit/${ id }`)
    }

    const Delete = () => {
        axios.delete(`${ BASE_URL }/posts/${ id }`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((response) => {
            alert("성공")
            navigate("/")
        })
        .catch((error) => {
            alert("실패")
        })
    }
    
    return(
        <>
        <Wrapper>
            <TextWrapper>
                <TitleDiv>
                    <div>{dataList.title}</div>
                    <div>{dataList.name}</div>
                </TitleDiv>
                <ContentDiv>
                    <div>{dataList.content}</div>
                </ContentDiv>
            </TextWrapper>
            <BtnDiv>
                {dataList.is_mine ? 
                <>
                    <AditBtn
                    onClick={ Adit }
                    >수정하기</AditBtn>
                    <DeleteBtn
                    onClick={ Delete }
                    >삭제하기</DeleteBtn> 
                </> :
                <></>}
            </BtnDiv>
        </Wrapper>
        </>
    )
}

export default Detail

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const BtnDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-left: 555px;
`

const DeleteBtn = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 48px;
    background: #5F85BB;
    border-radius: 100px;
    border-width: 0px;
    color: white;
    font-weight: 700;
    font-size: 15px;
    margin-left: 10px;
`

const AditBtn = styled.button`
    cursor: pointer;
    width: 120px;
    height: 48px;
    background: #5F85BB;
    border-radius: 100px;
    border-width: 0px;
    color: white;
    font-weight: 700;
    font-size: 15px;
`

const TextWrapper = styled.div`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 200px;
`

const TitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E0E0E0;
    padding: 20px 30px;
`

const ContentDiv = styled.div`
    padding: 50px 30px;
    height: 250px;
`