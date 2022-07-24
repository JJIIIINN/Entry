import React from 'react';
import '../App.css';
import styled from 'styled-components';
import { useState } from 'react';
import Eyes from '../assets/img/carbon_view.png';
import { BASE_URL } from '../utils/API/axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [name, setName] = useState();
	const [id, setId] = useState();
	const [password, setPassword] = useState();
	const [confirm, setConfirm] = useState();

	const [passwordType, setPasswordType] = useState({
		type: 'password',
		visible: false,
	});
	const isDisabled = !(name && id && password && confirm);
	const navigate = useNavigate();

	const SameChecking = () => {
		if (confirm === password) {
			SignUpAPI();
		} else {
			alert('에러');
		}
	};

	const SignUpAPI = () => {
		axios
			.post(`${BASE_URL}/users/signup`, {
				account_id: id,
				password: password,
				name: name,
			})
			.then((Response) => {
				alert('성공');
				navigate('/');
			})
			.catch((error) => {
				alert('실패');
			});
	};

	const ChangePasswordType = (e) => {
		setPasswordType(() => {
			if (!passwordType.visible) {
				return { type: 'text', visible: true };
			}
			return { type: 'password', visible: false };
		});
	};

	return (
		<Center>
			<Wrapper>
				<SignUpText>회원가입</SignUpText>
				<div>
					<Text>이름</Text>
					<TextInput
						placeholder="2 ~ 10글자 이하여야 합니다."
						type="text"
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div>
					<Text>아이디</Text>
					<TextInput
						placeholder="6 ~ 20글자 이하여야 합니다."
						type="text"
						onChange={(e) => {
							setId(e.target.value);
						}}
					/>
				</div>
				<div>
					<Text>비밀번호</Text>
					<TextInput
						placeholder="대문자, 소문자, 숫자, 특수문자가 최소 1개씩 포함되어야 합니다."
						type={passwordType.type}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<EyeImg onClick={ChangePasswordType} src={Eyes}></EyeImg>
				</div>
				<div>
					<Text>비밀번호 확인</Text>
					<TextInput
						placeholder="대문자, 소문자, 숫자, 특수문자가 최소 1개씩 포함되어야 합니다."
						type={passwordType.type}
						onChange={(e) => {
							setConfirm(e.target.value);
						}}
					/>
					<EyeImg onClick={ChangePasswordType} src={Eyes}></EyeImg>
				</div>
				<Btn disabled={isDisabled} onClick={SameChecking}>
					완료
				</Btn>
			</Wrapper>
		</Center>
	);
};

export default SignUp;

const EyeImg = styled.img`
	position: absolute;
	margin-left: -35px;
	margin-top: 14px;
`;

const SignUpText = styled.div`
	font-weight: 700;
	font-size: 28px;
	margin-top: 40px;
	margin-bottom: 16px;
`;

const Text = styled.div`
	font-weight: 700;
	font-size: 16px;
	margin-top: 10px;
	margin-bottom: 10px;
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
