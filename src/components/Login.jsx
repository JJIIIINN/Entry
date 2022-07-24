import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import '../App.css';
import Eyes from '../assets/img/carbon_view.png';
import { BASE_URL } from '../utils/API/axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [id, setId] = useState(localStorage.getItem('id'));
	const [password, setPassword] = useState();
	const [passwordType, setPasswordType] = useState({
		type: 'password',
		visible: false,
	});
	const [checking, setchecking] = useState(localStorage.getItem('token'));
	const isDisabled = !(id && password);
	const navigate = useNavigate();

	const CheckBox = () => {
		setchecking(!checking);
	};

	const ChangePasswordType = (e) => {
		setPasswordType(() => {
			if (!passwordType.visible) {
				return { type: 'text', visible: true };
			}
			return { type: 'password', visible: false };
		});
	};

	const LoginAPI = () => {
		axios
			.post(`${BASE_URL}/users/login`, {
				account_id: id,
				password: password,
			})
			.then((Response) => {
				if (checking === true) {
					localStorage.setItem('id', id);
					localStorage.setItem('token', Response.data.access_token);
				} else {
					localStorage.setItem('token', Response.data.access_token);
				}
				alert('성공');
				navigate('/');
			})
			.catch((error) => {
				alert('실패');
			});
	};

	return (
		<>
			<Center>
				<Wrapper>
					<SignUpText>로그인</SignUpText>
					<div>
						<Text>아이디</Text>
						<TextInput
							defaultValue={id}
							placeholder="아이디를 입력해주세요."
							type="text"
							onChange={(e) => {
								setId(e.target.value);
							}}
						/>
					</div>
					<div>
						<Text>비밀번호</Text>
						<TextInput
							placeholder="비밀번호를 입력해주세요."
							type={passwordType.type}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<EyeImg onClick={ChangePasswordType} src={Eyes}></EyeImg>
					</div>
					<RememberDiv>
						<RememberCheckBox type="checkbox" onClick={CheckBox} defaultChecked={id} />
						<div>아이디 저장</div>
					</RememberDiv>
					<Btn disabled={isDisabled} onClick={LoginAPI}>
						완료
					</Btn>
				</Wrapper>
			</Center>
		</>
	);
};

export default Login;

const RememberDiv = styled.div`
	display: flex;
	margin-top: 10px;
	margin-right: 320px;
`;

const RememberCheckBox = styled.input`
	margin-right: 6px;
`;

const EyeImg = styled.img`
	position: absolute;
	margin-left: -35px;
	margin-top: 14px;
`;

const SignUpText = styled.div`
	font-weight: 700;
	font-size: 28px;
	margin-top: 80px;
	margin-bottom: 50px;
`;

const Text = styled.div`
	font-weight: 700;
	font-size: 16px;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const TextInput = styled.input`
	width: 350px;
	border: 1px solid #999999;
	border-color: #999999;
	border-radius: 4px;
	border-width: 1.45px;
	padding: 16px 16px;
	padding-right: 40px;
`;

const Center = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 100px;
	min-height: 79.6vh;
	background-color: lightgray;
`;

const Btn = styled.button`
	margin-top: 30px;
	width: 410px;
	height: 48px;
	border-radius: 4px;
	border-width: 0px;
	font-weight: 700;
	font-size: 16px;
	color: white;
	background-color: #5f85bb;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 0px solid gray;
	background-color: white;
	width: 490px;
	height: 580px;

	${Btn}:disabled {
		background-color: #e0e0e0;
	}
`;
