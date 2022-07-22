import React from "react";
import { useState ,useEffect } from "react";
import axios from "axios";
import "../App.css"
import { BASE_URL } from "../assets/API/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    useEffect(
        () => {
        axios.get(`${ BASE_URL }/posts/lists`)
        .then((Response) => {
            setDataList(Response.data.post_list)
        })
        .catch((error) => {
            alert("실패")
        })
},[])

return (
    <>
        <ListH1>게시물 목록</ListH1>
            <table className="table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>제목</th>
                    </tr>
                </thead>
                {dataList.map((list, index) => (
                    <tbody key={index} onClick={() => {navigate(`/posts/${list.id}`)}}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{list.title}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
    </>
)
};


export default Main;

const ListH1 = styled.h1`
    margin-top: 80px;
    margin-right: 50%;
    display: flex;
    justify-content: center;
`