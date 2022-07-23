import React from "react";
import { BASE_URL } from "../utils/API/axios";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Writing = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const isDisabled = !(title && content);
    const navigate = useNavigate();

    const WritingAPI = () => {
        axios.post(`${BASE_URL}/posts`,
            {
                "title": title,
                "content": content
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then((Response) => {
                alert("성공");
                navigate("/")
            })
            .catch((error) => {
                alert("에러")
            })
    }

    return (
        <>
            <Center>
                <Wrapper>
                    <TitleInput
                        placeholder="1 ~ 100글자 이하로 적어주세요."
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <ContentTextarea
                        placeholder="1~1000글자 이하로 적어주세요."
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                    <WritingBtn
                        disabled={isDisabled}
                        onClick={WritingAPI}
                    >게시하기</WritingBtn>
                </Wrapper>
            </Center>
        </>
    )
}

export default Writing

const TitleInput = styled.input`
    width: 770px;
    height: 30px;
    padding: 10px 10px 10px 10px;
    font-size: 15px;
    margin-top: 90px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    background-color: #F9F9F9;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

const ContentTextarea = styled.textarea`
    width: 770px;
    height: 350px;
    margin-top: 40px;
    padding: 10px 10px 10px 10px;
    border-width: 2px;
    resize: none;
    font-size: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    background-color: #F9F9F9;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

const WritingBtn = styled.button`
    background: #E0E0E0;
    border: 0px solid #5F85BB;
    background-color: #5F85BB;
    border-radius: 8px;
    width: 120px;
    height: 39px;
    font-weight: 700;
    color: white;
    font-size: 15px;
    margin-top: 40px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0px solid black;
    width: 1000px;
    margin-top: 60px;
    height: 680px;
    background-color: white;
    ${WritingBtn}:disabled {
        background-color: #E0E0E0;
    }
`

const Center = styled.div`
    display: flex;
    justify-content: center;
    min-height: 91vh;
    height: 100%;
    background-color: #999999;
`