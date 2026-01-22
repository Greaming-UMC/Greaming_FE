작성해주신 `Chatting` 컴포넌트 코드를 기반으로, 사용 방법과 API 명세를 정리한 **README.md**입니다.

이 문서는 **Compound Component 패턴**을 사용하는 방법과, **대댓글 토글 로직**, **차단된 상태** 등을 어떻게 구현하는지에 초점을 맞췄습니다. 프로젝트의 `src/components/Chatting/README.md`로 저장하여 사용하세요.

---

# 💬 Chatting Component

댓글, 답글, 대댓글 기능을 구현하기 위한 Presentational UI 컴포넌트입니다.
**Compound Component 패턴**을 사용하여 유연한 레이아웃 구성이 가능하며, GDS(Greaming Design System) 토큰 스타일이 적용되어 있습니다.

## ✨ 주요 기능

* **Compound Pattern:** 필요한 요소(`Header`, `List`, `Item`, `Input` 등)만 조립하여 사용.
* **Nested Reply:** `isReply` 속성 하나로 대댓글 들여쓰기(Indentation) 스타일 자동 적용.
* **Toggle UI:** 답글 숨기기/보기(`ReplySeparator`) UI 제공.
* **Edge Cases:** 댓글이 없거나(`Empty`) 입력이 막힌 상태(`disabled`)에 대한 완벽한 UI 지원.
* **Auto-styling:** 긴 텍스트 줄바꿈, 아바타 처리, 스크롤 영역 등이 미리 스타일링됨.

## 📦 Import

```tsx
import { Chatting } from '@/components/Chatting';

```

## 🚀 사용 예시 (Usage Examples)

### 1. 기본 구조 (Basic)

가장 기본적인 댓글 목록과 입력창 구성입니다.

```tsx
<Chatting.Root>
  {/* 헤더 */}
  <Chatting.Header />

  {/* 스크롤 가능한 리스트 영역 */}
  <Chatting.List>
    <Chatting.Item 
      nickname="김개발" 
      content="안녕하세요! 댓글 컴포넌트입니다." 
      date="방금 전" 
      avatarSrc="/path/to/img.jpg"
      onLike={() => console.log('좋아요')}
      onReply={() => console.log('답글 달기')}
    />
    <Chatting.Item 
      nickname="박디자인" 
      content="긴 글 테스트입니다. 글자가 길어지면 자동으로 줄바꿈이 됩니다." 
      date="1분 전" 
    />
  </Chatting.List>

  {/* 하단 입력창 */}
  <Chatting.Input 
    value={text}
    onChange={(e) => setText(e.target.value)}
    onSubmit={handleSubmit}
    userAvatarSrc="/my-profile.jpg"
  />
</Chatting.Root>

```

### 2. 대댓글 및 토글 구현 (Advanced)

대댓글이 있는 경우 `ReplySeparator`와 `isReply` 속성을 사용하여 계층 구조를 표현합니다.

> **Note:** 토글 상태(열림/닫힘)는 사용하는 상위 컴포넌트에서 관리해야 합니다.

```tsx
const CommentSection = ({ comments }) => {
  // 각 댓글 ID별 열림 상태 관리 { 1: true, 2: false }
  const [openStates, setOpenStates] = useState({});

  const toggleReply = (id) => {
    setOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Chatting.Root>
      <Chatting.Header />
      <Chatting.List>
        {comments.map(comment => (
          <div key={comment.id} className="flex flex-col">
            {/* 부모 댓글 */}
            <Chatting.Item 
              nickname={comment.nickname} 
              content={comment.content} 
            />

            {/* 대댓글이 있을 경우 토글 버튼 표시 */}
            {comment.replies.length > 0 && (
              <Chatting.ReplySeparator 
                replyCount={comment.replies.length}
                isOpen={!!openStates[comment.id]}
                onClick={() => toggleReply(comment.id)}
              />
            )}

            {/* 열려있을 때만 대댓글 렌더링 */}
            {openStates[comment.id] && comment.replies.map(reply => (
              <Chatting.Item 
                key={reply.id}
                isReply // 👈 들여쓰기 적용
                nickname={reply.nickname} 
                content={reply.content} 
              />
            ))}
          </div>
        ))}
      </Chatting.List>
      <Chatting.Input />
    </Chatting.Root>
  );
};

```

### 3. 빈 상태 및 차단 상태 (Blocked/Empty)

댓글 작성이 불가능하거나 데이터가 없는 경우입니다.

```tsx
<Chatting.Root>
  <Chatting.Header />
  
  {/* 리스트 대신 안내 문구 표시 (화면 중앙 정렬됨) */}
  <Chatting.Empty message="댓글창이 막혀있어요" />

  {/* 입력창 비활성화 */}
  <Chatting.Input 
    disabled={true} 
    placeholder="댓글을 달 수 없습니다." 
  />
</Chatting.Root>

```

---

## 📖 API Documentation

### `<Chatting.Root>`

전체 레이아웃을 잡는 컨테이너입니다. `flex-col`, `w-full`, `h-full`이 적용되어 있습니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | 내부 컴포넌트들 |
| `className` | `string` | - | 추가 스타일 |

### `<Chatting.Header>`

상단 타이틀 영역입니다. 아이콘과 '댓글' 텍스트, 하단 구분선을 포함합니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | 추가 스타일 |

### `<Chatting.List>`

댓글 목록이 표시되는 영역입니다. `flex-1`과 `overflow-y-auto`가 적용되어 스크롤이 가능합니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | `Chatting.Item` 등의 목록 요소 |

### `<Chatting.Item>`

개별 댓글 아이템입니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `avatarSrc` | `string` | - | 사용자 프로필 이미지 URL |
| `nickname` | `string` | **Required** | 작성자 닉네임 |
| `content` | `string` | **Required** | 댓글 본문 내용 |
| `date` | `string` | - | 작성 시간 표기 (예: "방금 전") |
| `isLiked` | `boolean` | `false` | 좋아요 상태 (하트 아이콘 변경) |
| `isReply` | `boolean` | `false` | **True일 경우 왼쪽 들여쓰기(padding) 적용** |
| `onReply` | `() => void` | - | '답글 달기' 버튼 클릭 핸들러 |
| `onLike` | `() => void` | - | 좋아요 버튼 클릭 핸들러 |

### `<Chatting.ReplySeparator>`

대댓글 목록을 펼치거나 접을 때 사용하는 UI 요소입니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | **Required** | 현재 대댓글 목록이 펼쳐져 있는지 여부 |
| `replyCount` | `number` | - | 대댓글 개수 표시 |
| `onClick` | `() => void` | - | 토글 버튼 클릭 핸들러 |

### `<Chatting.Input>`

하단 고정형 댓글 입력창입니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `userAvatarSrc` | `string` | - | 현재 로그인한 유저의 프로필 이미지 |
| `value` | `string` | - | 입력창 값 |
| `onChange` | `func` | - | 입력 핸들러 |
| `onSubmit` | `func` | - | 전송 버튼 클릭 핸들러 |
| `disabled` | `boolean` | `false` | **True일 경우 입력 불가, 스타일 회색조 변경** |

### `<Chatting.Empty>`

댓글이 없거나 차단된 상태일 때 리스트 대신 보여주는 컴포넌트입니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | `string` | `'댓글이 없습니다.'` | 중앙에 표시할 안내 문구 |



<br />
<br />
<br />

```tsx

        <Chatting.Root>
          <Chatting.Header />
          <Chatting.List>
            {/* 🔄 데이터 반복 렌더링 */}
            {MOCK_DATA.map((comment) => {
              
              // 현재 이 댓글(comment.id)이 열려있는지 확인
              const isOpen = !!openReplyIds[comment.id];
              const hasReplies = comment.replies.length > 0;

              return (
                <div key={comment.id} className="flex flex-col">
                  {/* 1. 부모 댓글 */}
                  <Chatting.Item
                    avatarSrc={`https://i.pravatar.cc/150?u=${comment.id}`} // 더미 이미지
                    nickname={comment.nickname}
                    content={comment.content}
                    date={comment.date}
                  />

                  {/* 2. 대댓글 토글 버튼 (대댓글 있을 때만 표시) */}
                  {hasReplies && (
                    <Chatting.ReplySeparator
                      isOpen={isOpen} // 내 ID 상태만 바라봄
                      replyCount={comment.replies.length}
                      onClick={() => toggleReply(comment.id)} // 내 ID만 넘김
                    />
                  )}

                  {/* 3. 대댓글 목록 (열려있고 & 있을 때만) */}
                  {isOpen && hasReplies && (
                    <div className="flex flex-col">
                      {comment.replies.map((reply) => (
                        <Chatting.Item
                          key={reply.id}
                          isReply 
                          avatarSrc={`https://i.pravatar.cc/150?u=${reply.id}`}
                          nickname={reply.nickname}
                          content={reply.content}
                          date={reply.date}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </Chatting.List>

          <Chatting.Input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Chatting.Root>
```