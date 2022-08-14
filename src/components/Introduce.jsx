import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import styled from 'styled-components';
import { BASE_URL } from '../utils/API/axios';
import NotHover from '../assets/img/Group 24.png';
import Hover from '../assets/img/Group 25.png';
import BasicProfile from '../assets/img/Vector.png';

const MyIntroduce = () => {
	const [hoverCheck, setHoverCheck] = useState(NotHover);
	const [dataList, setDataList] = useState([]);
	const [TextStyle, setTextStyle] = useState();
	const [EditStyle, setEditStyle] = useState('None');
	const [introduceText, setIntoduceText] = useState();
	const [name, setName] = useState();
	const [ImgAdress, setImgAdress] = useState(BasicProfile);
	const isDisabled = !(introduceText && name);

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

	const FormSubmit = (e) => {
		const img = e.target.files[0];
		const formData = new FormData();
		formData.append('file', img);

		axios
			.post(`${BASE_URL}/images`, formData)
			.then((res) => {
				setImgAdress(res.data.location);
				alert('성공');
			})
			.catch((err) => {
				alert('실패');
			});
	};

	const SaveAPI = () => {
		axios
			.patch(
				`${BASE_URL}/users/mypage`,
				{
					profile_image_url: ImgAdress,
					name: name,
					introduce: introduceText,
				},
				{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
			)
			.then((Response) => {
				console.log(Response.data);
				if (Response.data.profile_image_url != null) {
					setImgAdress(Response.data.profile_image_url);
				}
				setDataList(Response.data);
			})
			.catch((error) => {
				alert('실패');
			});
	};

	return (
		<>
			<Wrapper>
				<TextStyled className="TextStyle" id={TextStyle}>
					<PhotoDiv>
						<PhotoImg src={ImgAdress}></PhotoImg>
					</PhotoDiv>
					<NameWrapper>
						<NameDiv>{dataList.name}</NameDiv>
						<AditImg
							onMouseLeave={() => {
								setHoverCheck(NotHover);
							}}
							onMouseEnter={() => {
								setHoverCheck(Hover);
							}}
							onClick={() => {
								setTextStyle('None');
								setEditStyle('');
							}}
							src={hoverCheck}
						></AditImg>
					</NameWrapper>
					<ContentDiv>{dataList.introduce}</ContentDiv>
				</TextStyled>
				<EditStyled id={EditStyle}>
					<PhotoDiv>
						<PhotoImg src={ImgAdress}></PhotoImg>
						<UploadImg type="file"
						accept="image/*"
						id='img'
						onChange={FormSubmit}></UploadImg>
					</PhotoDiv>
					<InputWrapper>
						<Positioning>
							<NameInput
								type="text"
								placeholder={dataList.name}
								maxLength={10}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
							<SaveBtn disabled={isDisabled} onClick={SaveAPI}>
								저장
							</SaveBtn>
						</Positioning>
						<IntroduceText
							onChange={(e) => {
								setIntoduceText(e.target.value);
							}}
							maxLength={20}
							placeholder={dataList.introduce}
						/>
					</InputWrapper>
				</EditStyled>
			</Wrapper>
		</>
	);
};

export default MyIntroduce;

const TextStyled = styled.div`
	display: flex;
`;

const UploadImg = styled.input`
	position: absolute;
	border: 0px solid black;
	width: 70px;
	height: 100px;
	margin-top: 220px;

`

const EditStyled = styled.div`
	display: flex;
	margin-left: -140px;
`;

const SaveBtn = styled.button`
	width: 80px;
	height: 35px;
	background: #5f85bb;
	border-radius: 100px;
	border-width: 0px;
	color: white;
	font-weight: 700;
	font-size: 12px;
`;

const Positioning = styled.div`
	display: flex;
	justify-content: space-between;

	${SaveBtn}:disabled {
		background-color: #e0e0e0;
	}
`;
const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const IntroduceText = styled.textarea`
	width: 600px;
	height: 39;
	padding: 10px 10px 10px 10px;
	border-width: 2px;
	resize: none;
	font-size: 12.5px;
	border: 1.5px solid #bebbbb;
	border-radius: 8px;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

const NameInput = styled.input`
	width: 80px;
	padding: 10px 10px 10px 7px;
	font-size: 15px;
	border: none;
	border-bottom: 1.5px solid #bebbbb;
	margin-bottom: 16px;
	margin-left: 3px;
	text-align: center;
`;

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

const PhotoDiv = styled.div`
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 50%;
	margin-left: 150px;
`;

const PhotoImg = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
`;
