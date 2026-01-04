AccountView Redesign Plan
Goal
Transform the current single-column "My Account" page into a responsive, high-end Split Layout matching the "Ambush" aesthetic.

Proposed Changes
1. Layout Structure
Current: Single column, centered, max-width 540px.
New:
Desktop: 2-Column Grid (grid-cols-2).
Left Column: Returning Customer (Login).
Right Column: Create an Account (Register).
Mobile: Stacked single column (unchanged behavior).
Container: max-w-[1200px] (wider/fuller).
2. Styling Details (Ambush Style)
Typography: Uppercase, tracked headers (tracking-[0.1em]).
Forms: Sharp borders (border border-black), consistent padding.
Buttons:
Login: Bordered or Black inverted.
Register: Solid Black.
3. Animations (Framer Motion)
Wrap the container in <motion.div> with staggerChildren.
Fade in inputs and buttons from the bottom (y: 20).
File Changes
components/AccountView.tsx
: Complete rewrite of the JSX structure.
Test Checklist
- Responsiveness: Stack on mobile, split on desktop.
- Visuals: "Ambush" styling consistency (fonts, borders, button contrast).
- Form UX: submit success/failure, error messaging, focus state.
- Accessibility: keyboard tab order, focus-visible ring.
- Motion: prefers-reduced-motion disables animations.

보강 사항
1. 요구사항/로직 유지
- 기존 로그인/회원가입 submit 핸들러, 검증, 에러 메시지 UI는 그대로 유지.
- 폼 필드 이름/네임스페이스 변경 금지(백엔드 연동 영향 방지).
2. 레이아웃/브레이크포인트
- md 이상: 2-Column Grid, sm 이하: stacked single column.
- Container 기준: max-w-[1200px] mx-auto px-4 md:px-10.
- Column gap 명시: gap-10 md:gap-16.
3. 스타일 매핑(클래스 예시)
- Headline: text-xs uppercase tracking-[0.1em] font-medium.
- Form fields: border border-black px-4 py-3 text-sm bg-white.
- Primary button (Register): bg-black text-white border border-black hover:bg-white hover:text-black.
- Secondary button (Login): bg-white text-black border border-black hover:bg-black hover:text-white.
- Disabled: opacity-50 cursor-not-allowed (버튼 공통).
4. 접근성/모션
- prefers-reduced-motion 고려: 모션 비활성화 시 정적 렌더.
- 포커스 링/키보드 탭 순서 확인.
5. 검증 항목 확장
- 로그인/회원가입 실패 케이스(에러 메시지 표시).
- 모바일/데스크탑 레이아웃 시각적 회귀 체크.
