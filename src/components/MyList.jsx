import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { BASE_URL } from '../utils/API/axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const My = () => {
	const [dataList, setDataList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(`${BASE_URL}/users/mypage`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
			.then((Response) => {
				console.log(Response.data);
				setDataList(Response.data.my_feed_list);
			})
			.catch((error) => {
				alert('실패');
			});
	}, []);

	return (
		<>
			<ListH1>나의 게시물</ListH1>
			<table className="table">
				<thead>
					<tr>
						<th>NO</th>
						<th>제목</th>
					</tr>
				</thead>
				{dataList.map((list, index) => (
					<tbody
						key={index}
						className={localStorage.getItem('token') ? 'Curser' : ''}
						onClick={() => {
							if (localStorage.getItem('token')) {
								navigate(`/posts/${list.id}`);
							}
						}}
					>
						<tr>
							<td>{index + 1}</td>
							<td>{list.title}</td>
						</tr>
					</tbody>
				))}
			</table>
		</>
	);
};

export default My;

const ListH1 = styled.h1`
	margin-top: 75px;
	margin-right: 673px;
	margin-bottom: -60px;
	display: flex;
	justify-content: center;
	font-size: 17px;
`;
