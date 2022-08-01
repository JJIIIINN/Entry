import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { BASE_URL } from '../utils/API/axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const My = () => {
	const [dataList, setDataList] = useState([]);
	const [page, setPage] = useState(1);
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

	const handlePageChange = (page) => {
		setPage(page);
	};

	return (
		<>
			<Wrapper>
				<ListH1>나의 게시물</ListH1>
				<table className="table">
					<thead>
						<tr>
							<th>NO</th>
							<th>제목</th>
						</tr>
					</thead>
					{dataList.slice(10 * (page - 1), 10 * (page - 1) + 10).map((list, index) => (
						<tbody
							key={index}
							className={localStorage.getItem('token') ? 'Curser' : ''}
							onClick={() => {
								if (localStorage.getItem('token')) {
									navigate(`/posts/${list.id}`);
								}
							}}
						>
							<tr id="color">
								<td>{index + 1 * (page - 1) * 10 + 1}</td>
								<td>{list.title}</td>
							</tr>
						</tbody>
					))}
				</table>
			</Wrapper>
			<Center>
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</Center>
			<PaginationBox>
				<Center>
					<Pagination
						prevPageText={'<'}
						nextPageText={'>'}
						activePage={page}
						itemsCountPerPage={10}
						totalItemsCount={dataList.length}
						pageRangeDisplayed={5}
						onChange={handlePageChange}
					></Pagination>
				</Center>
			</PaginationBox>
		</>
	);
};

export default My;

const PaginationBox = styled.div`

	margin-bottom: 90px;

	.pagination {
		position: absolute;
		display: flex;
		justify-content: center;
		margin-top: -10px;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	ul.pagination li {
		display: inline-block;
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}
	ul.pagination li a {
		text-decoration: none;
		color: #0000005d;
		font-size: 1rem;
	}
	ul.pagination li.active a {
		color: black;
	}
	ul.pagination li a:hover,
	ul.pagination li a.active {
		color: black;
	}
`;

const Center = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 37px;
`;

const Wrapper = styled.div`
	position: absolute;
	width: 100%;
`;

const ListH1 = styled.h1`
	margin-top: 75px;
	margin-right: 673px;
	margin-bottom: -60px;
	display: flex;
	justify-content: center;
	font-size: 17px;
`;
