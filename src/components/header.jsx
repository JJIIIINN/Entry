import React from "react";
import "../Header.css"
import { Link } from "react-router-dom";
import styled from "styled-components";
import EntryLogo from "../assets/img/EntryLogo.png"
import LogoBackImg from "../assets/img/logo.png"
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        navigate("/");
    }

    return (
        <>
            <Wrapper>
                <FlexDiv>
                    <Link to="/">
                        <LogoWrapper>
                            <LogoBack>
                                <Img src={LogoBackImg}></Img>
                                <LogoImg src={EntryLogo}></LogoImg>
                            </LogoBack>
                            <LogoText>Entry DSM</LogoText>
                        </LogoWrapper>
                    </Link>
                </FlexDiv>
                <TextWrapper>
                    {!localStorage.getItem("token") &&
                        (<SignWrapper>
                            <LoginText><Link to="/Login">로그인</Link></LoginText>
                            <SignUpText><Link to="/SignUp">회원가입</Link></SignUpText>
                        </SignWrapper>
                        )}
                    {localStorage.getItem("token") &&
                        (
                            <LogOutDiv>
                                <TextDiv><Link to="/WritingPage">글쓰기</Link></TextDiv>
                                <TextDiv><Link to="/MyPage">마이페이지</Link></TextDiv>
                                <TextDiv onClick={Logout}>로그아웃</TextDiv>
                            </LogOutDiv>
                        )}
                </TextWrapper>
            </Wrapper>
        </>
    )
}

export default Header

const LogOutDiv = styled.div`
    display: flex;
    margin-right: 210px;
`

const Img = styled.img`
    
`

const FlexDiv = styled.div`
    display: flex;
    margin-left: 250px;
`

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const LogoBack = styled.div`
    position: relative;
`

const LogoImg = styled.img`
    position: absolute;
    right: 11px;
    top: 10px;
`

const LogoText = styled.div`
    color: white;
    font-weight: 700;
    font-size: 20px;
    margin-left: 10px;
`

const Wrapper = styled.div`
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0px solid black;
    background-color: #5F85BB;
`

const TextWrapper = styled.div`
    display: flex;
    margin-right: 35px;
`

const TextDiv = styled.div`
    font-weight: 400;
    font-size: 20px;
    color: white;
    margin-left: 20px;
    cursor: pointer;
`

const SignWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-right: 300px;
`

const LoginText = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: white;
    border-right: 1px solid white;
    padding-right: 10px;
`

const SignUpText = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: white;
    padding-left: 10px;
`