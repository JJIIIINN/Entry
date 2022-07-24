import React, { useEffect, useState } from 'react';
import nullPhoto from '../assets/img/Vector.png';
import axios from 'axios';
import styled from 'styled-components';
import { BASE_URL } from '../utils/API/axios';
import NotHover from '../assets/img/Group 24.png';
import Hover from '../assets/img/Group 25.png';

const MyIntroduce = () => {
	const [hoverCheck, setHoverCheck] = useState(NotHover);
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/users/mypage`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
			.then((Response) => {
				console.log(Response.data);
				setDataList(Response.data);
			})
			.catch((error) => {
				alert('실패');
			});
	}, []);
	return (
		<>
			<Wrapper>
				<PhotoBorder>
					<PhotoImg src={nullPhoto}></PhotoImg>
				</PhotoBorder>
				<TextWrapper>
					<NameWrapper>
						<NameDiv>{dataList.name}</NameDiv>
						<AditImg
							onMouseLeave={() => {
								setHoverCheck(NotHover);
							}}
							onMouseEnter={() => {
								setHoverCheck(Hover);
							}}
							onClick={() => {}}
							src={hoverCheck}
						></AditImg>
					</NameWrapper>
					<ContentDiv>{dataList.introduce}</ContentDiv>
				</TextWrapper>
			</Wrapper>
		</>
	);
};

export default MyIntroduce;

const TextWrapper = styled.div``;

const NameWrapper = styled.div`
	display: flex;
`;

const AditImg = styled.img`
	width: 24px;
	height: 24px;
	margin-top: 8px;
	margin-left: 15px;
`;

const ContentDiv = styled.div`
	font-weight: 700;
	font-size: 16px;
	margin-top: 10px;
	margin-left: 37px;
	border: 0px solid black;
	width: 612px;
	word-break: break-all;
`;

const NameDiv = styled.div`
	font-weight: 700;
	font-size: 24px;
	margin-top: 5px;
	margin-left: 37px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-left: -10px;
	margin-top: 130px;
`;

const PhotoBorder = styled.div`
	border: 2px solid black;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PhotoImg = styled.img`
	padding-top: 20px;
	width: 80px;
`;
