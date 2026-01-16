## Project Preview
리액트 기반 프로젝트를 시작할 때, 빠른 초기 셋업을 위한 레포입니다.
FSD(Feature-Sliced Design) 구조를 참고해 app, entities, shared 레이어로 구성했습니다.

## Getting Started
```bash
  npm install
  npm run dev
```

## Tech Stack
* React 19, TypeScript
* Styling: Tailwind CSS 3
* Code Quality: ESLint, Prettier
* State Management: Zustand 4
* Build Tool: Vite

## Project Structure
```bash
  src/
  |-- app/              # 프로젝트 전역 설정
        |-- router
        |-- providers
        |-- layouts
        
  |-- pages/            # Routing 페이지 정의
        |-- page1
              |-- ui    # 화면을 구성하는 컴포넌트
        |-- page2
        |--  ...
        
  |-- entites/          # 프로젝트에서 사용되는 엔티티 집합
        |-- page1
              |-- lib    # page1 에서 사용하는 라이브러리 ( utils, hooks ... )
              |-- model  # page1 에서 사용하는 데이터 모델
              |--  ...
  
  |-- shared/            # 프로젝트 전역에서 사용하는 자원
        |-- api           
        |-- assets       
              |-- fonts       
        |-- ui           
        |-- constants           
        |-- lib           
        |-- model           
        |-- store     
        |--  ...      
        

```

├─ 