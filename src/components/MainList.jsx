import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { BASE_URL } from '../utils/API/axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const Main = () => {
	const [dataList, setDataList] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(`${BASE_URL}/posts/lists`)
			.then((Response) => {
				console.log(Response.data);
				setDataList(Response.data.post_list);
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
				<ListH1>게시물 목록</ListH1>
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
						totalItemsCount={dataList.length - 1}
						pageRangeDisplayed={5}
						onChange={handlePageChange}
					></Pagination>
				</Center>
			</PaginationBox>
		</>
	);
};

export default Main;

const PaginationBox = styled.div`
	.pagination {
		position: absolute;
		display: flex;
		justify-content: center;
		margin-top: -55px;
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
	margin-top: 112.5px;
`;

const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	margin-top: 50px;
`;

const ListH1 = styled.h1`
	margin-right: 50%;
	display: flex;
	justify-content: center;
`;
