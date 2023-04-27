import React from "react";
import styled from "styled-components";
import "../../style/reset.css";
import Attachment from "./attachment/Attachment";

const Container = styled.div`
  width: 600px;
  font-size: 19px;
  border: 2px solid var(--border);
  border-radius: 20px;
  box-shadow: 1px 1px 5px 1px var(--border);
  overflow: hidden;
`;

const Section = styled.div``;

const Title = styled.h1`
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
  border-bottom: 2px solid var(--border);
`;

const Body = styled.p`
  padding: 50px;
  white-space: pre-line;
  line-height: 1.5;
  border-bottom: 2px solid var(--border);
`;

const OptionBox = styled.div`
  display: flex;
  background: var(--yellow);
`;

const Option = styled.div`
  padding: 20px 0;
  display: flex;
  flex: 1;
  justify-content: center;

  &:first-child {
    border-right: 2px solid var(--border);
  }
`;

const Main = () => {
  return (
    <div>
      <Container>
        <Section>
          <Title>카카오톡 돋보기</Title>
          <Body>
            Kakao Analytics를 사용하기 위해서는
            {`\n`} 먼저 웹사이트를 등록해야 합니다.
            {`\n`} 웹사이트를 등록하려면,
            {`\n`} Kakao Analytics 콘솔에 로그인한 후{`\n`} "웹사이트 추가" 버튼을 클릭합니다.
            {`\n`} 그런 다음, 웹사이트의 이름,
            {`\n`} URL, 카테고리 등을 입력하고 등록합니다.
            {`\n`}
            {`\n`} 등록한 웹사이트에 추적 코드를 설치해야 합니다.
            {`\n`} 추적 코드는 Kakao Analytics 콘솔에서 생성할 수 있습니다.
            {`\n`} 생성한 추적 코드를 웹사이트의 모든 페이지에설치합니다.
            {`\n`}{" "}
          </Body>
        </Section>
        <Section>
          <OptionBox>
            <Option>Window</Option>
            <Option>Mac O/S</Option>
          </OptionBox>
        </Section>
      </Container>
      <Attachment></Attachment>
    </div>
  );
};

export default Main;
