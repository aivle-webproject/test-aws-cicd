# 걷다가 서재 프런트엔드

React 19와 Vite 7로 작성된 개인 서재 관리 웹앱의 프런트엔드입니다. 사용자는 회원가입/로그인 후 도서를 등록하고, OpenAI DALL·E 3를 이용해 표지를 자동 생성하며, 등록된 도서를 조회·수정·삭제할 수 있습니다.

## 빠른 시작
1. **필수 요구 사항**
   - Node.js 18 이상
   - npm 9 이상 (Vite 기본 스크립트 사용)
2. **설치**
   ```bash
   npm install
   ```
3. **환경 변수 설정**
   - 프로젝트 루트에 `.env` 파일을 만들고 OpenAI API 키를 입력합니다. (이 파일은 Git에 커밋하지 않습니다.)
   ```env
   VITE_OPENAI_API_KEY=<당신의_OpenAI_API_키>
   ```
4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   기본적으로 `http://localhost:5173`에서 앱을 확인할 수 있습니다.
5. **프로덕션 번들 생성**
   ```bash
   npm run build
   ```
6. **정적 프리뷰**
   ```bash
   npm run preview
   ```

## 백엔드/외부 의존성
프런트엔드는 별도의 백엔드 API와 OpenAI 서비스를 호출합니다.
- **도서/계정 API**: 기본 주소는 `http://localhost:8080`으로 하드코딩되어 있습니다.
  - 예) `GET /api/books`, `POST /api/books/{userId}`, `PATCH /profile/{userId}/password`, `DELETE /profile/{userId}` 등.
- **OpenAI 이미지 생성**
  - `src/api/openai.js`와 `src/pages/BookRegister.jsx`에서 `import.meta.env.VITE_OPENAI_API_KEY`를 사용해 DALL·E 3 이미지를 생성합니다.
  - 올바른 키가 없으면 표지 생성 시 오류가 발생합니다.

## 주요 기능 흐름
- **인증**: `AuthContext`가 로컬 스토리지에 사용자 정보를 보존하며 로그인/로그아웃/회원가입 페이지가 MUI 카드 UI로 구현되어 있습니다.
- **도서 등록**: 로그인 사용자만 접근하며, 제목·소개·카테고리를 입력하고 AI 표지를 생성한 뒤 `POST /api/books/{userId}`로 서버에 저장합니다.
- **도서 조회/목록**: 홈 화면에서 사이드바와 함께 그리드 카드로 도서를 표시하며, 각 카드를 클릭하면 상세 페이지로 이동합니다.
- **도서 상세 관리**: 단일 도서를 조회하고 수정/삭제 모달을 통해 내용을 변경하거나 삭제할 수 있습니다.
- **프로필 관리**: 비밀번호 변경, 계정 삭제 기능을 제공하며 처리 후 자동으로 로그아웃/리다이렉트합니다.

## 폴더 구조
```
src/
├─ api/
│  └─ openai.js           # OpenAI DALL·E 3 이미지 생성 fetch 래퍼
├─ components/
│  ├─ Header.jsx, Layout.jsx, Sidebar.jsx        # 공통 레이아웃과 헤더/사이드바
│  ├─ BookGrid.jsx, BookCard.jsx, BookDetail.jsx # 도서 목록·카드·상세/수정 모달 UI
│  └─ *.css                                      # 각 컴포넌트 전용 스타일
├─ context/
│  └─ AuthContext.jsx      # 로그인 상태 관리 및 로컬 스토리지 동기화
├─ pages/
│  ├─ Home.jsx             # 홈: 사이드바 + 도서 그리드
│  ├─ BookRegister.jsx     # 도서 등록 및 AI 표지 생성
│  ├─ Login.jsx, Signup.jsx# MUI 기반 인증 화면
│  ├─ ProfilePage.jsx      # 비밀번호 변경/계정 삭제
│  └─ AuthLayout.jsx       # 인증 화면 공통 레이아웃
├─ App.jsx                 # 라우팅 구성 및 레이아웃
└─ main.jsx                # React 엔트리포인트
```

## 코드 구성 요약
- **라우팅**: `App.jsx`가 React Router로 홈(`/`), 도서 등록(`/book-register`), 인증(`/login`, `/signup`), 프로필(`/profile`), 도서 상세(`/:bookId`) 경로를 정의합니다.
- **상태 관리**: `AuthContext`로 로그인 정보를 전역 제공하며, 각 페이지에서 `useAuth`로 접근합니다.
- **데이터 통신**: Axios를 통해 백엔드 REST API와 통신하고, OpenAI 이미지는 `fetch` 또는 Axios로 생성 요청을 보냅니다.
- **스타일**: 전역 `index.css`, `App.css`와 컴포넌트별 CSS를 사용하며, 일부 화면은 MUI 컴포넌트로 구축했습니다.

## 개발 시 유의사항
- OpenAI API 키가 없으면 도서 등록 화면의 AI 표지 생성 및 `src/api/openai.js` 호출이 실패합니다. `.env`가 제대로 로드되었는지 확인하세요.
- 백엔드 API 주소가 변경될 경우, 관련 URL 문자열을 일괄 수정해야 합니다 (`BookGrid.jsx`, `BookRegister.jsx`, `BookDetail.jsx`, `Login.jsx`, `Signup.jsx`, `ProfilePage.jsx`).
- 인증 상태는 로컬 스토리지 `authUser`에 저장되므로, 브라우저 스토리지를 지우면 자동으로 로그아웃됩니다.
