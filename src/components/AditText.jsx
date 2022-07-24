import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/API/axios';

const Adit = () => {
	const { id } = useParams();
	const [dataList, setDataList] = useState([]);

	const navigate = useNavigate();

	const [data, setData] = useState({
		title: '',
		content: '',
	});
	const isDisabled = !(data.title && data.content);

	const onChange = (e) => {
		const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
		setData({
			...data, // 기존의 input 객체를 복사한 뒤
			[name]: value, // name 키를 가진 값을 value 로 설정
		});
	};

	useEffect(() => {
		axios
			.get(`${BASE_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
			.then((response) => {
				setDataList(response.data);
				setData(response.data);
			})
			.catch((error) => {
				alert('실패');
			});
	}, [id]);

	const AditAPI = () => {
		axios
			.patch(`${BASE_URL}/posts/${id}`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
			.then((response) => {
				navigate(`/`);
			})
			.catch((error) => {
				alert('실패');
			});
	};

	return (
		<>
			<Center>
				<Wrapper>
					<TitleInput placeholder="1 ~ 100글자 이하로 적어주세요." onChange={onChange} name="title" defaultValue={dataList.title} />
					<ContentTextarea placeholder="1~1000글자 이하로 적어주세요." name="content" onChange={onChange} defaultValue={dataList.content} />
					<WritingBtn disabled={isDisabled} onClick={AditAPI}>
						수정하기
					</WritingBtn>
				</Wrapper>
			</Center>
		</>
	);
};

export default Adit;

const TitleInput = styled.input`
	width: 770px;
	height: 30px;
	padding: 10px 10px 10px 10px;
	font-size: 15px;
	margin-top: 90px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	background-color: #f9f9f9;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

const ContentTextarea = styled.textarea`
	width: 770px;
	height: 350px;
	margin-top: 40px;
	padding: 10px 10px 10px 10px;
	border-width: 2px;
	resize: none;
	font-size: 15px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	background-color: #f9f9f9;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

const WritingBtn = styled.button`
	background: #e0e0e0;
	border: 0px solid #5f85bb;
	background-color: #5f85bb;
	border-radius: 8px;
	width: 120px;
	height: 39px;
	font-weight: 700;
	color: white;
	font-size: 15px;
	margin-top: 40px;
`;

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
		background-color: #e0e0e0;
	}
`;

const Center = styled.div`
	display: flex;
	justify-content: center;
	min-height: 91vh;
	height: 100%;
	background-color: #999999;
`;
