# 원티드 프리온보딩 프론트엔드 - 선발 과제

### 프로젝트 목적

#### 원티드 프리온보딩 프론트엔드 과정 선발 과제 수행

배포 링크 : https://juhee067.github.io/wanted-pre-onboarding-frontend/

---

### 1. 프로젝트의 실행 방법

    git clone 후
    npm install
    npm start

---

### 2. 데모 영상

- 로그인



https://user-images.githubusercontent.com/66045537/230775475-3cb1f2ce-4575-4abc-986b-93b8f6c908cc.mov




- 회원가입



https://user-images.githubusercontent.com/66045537/230775478-d0e54623-8967-4a1e-8fa3-2b73520b2bff.mov




- TODO CRUD


https://user-images.githubusercontent.com/66045537/230775484-cd4d7811-8d33-4442-aaea-0ff8798356d3.mov



- 로그아웃


https://user-images.githubusercontent.com/66045537/230775490-8d55a1b4-8f70-46f5-9a83-fbccbd244577.mov



---

### 3. 구현 요구 사항

#### :: 1. 로그인 / 회원가입

- `/signup` 경로에 회원가입 기능을 개발해주세요
- `/signin` 경로에 로그인 기능을 개발해주세요
- 페이지 안에 이메일 input, 비밀번호 input, 제출 button이 포함된 형태로 구성해주세요

##### Assignment 1

- 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

  - 이메일 조건: `@` 포함
  - 비밀번호 조건: 8자 이상

- 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여해주세요

##### Assignment 2

- 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요

##### Assignment 3

- 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요

  - 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
  - 응답받은 JWT는 로컬 스토리지에 저장해주세요

##### Assignment 4

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

  - 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

---

#### :: 2. TODO LIST

##### Assignment 5

- `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.

##### Assignment 6

- 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.

##### Assignment 7

- TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

##### Assignment 8

- TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요

##### Assignment 9

- 투두 리스트의 삭제 기능을 구현해주세요

##### Assignment 10

- 투두 리스트의 수정 기능을 구현해주세요

  - TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
  - 수정모드에서는 TODO의 내용을 변경할 수 있어야 합니다.
  - 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경해주세요
  - 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요
  - 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
  - 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요
