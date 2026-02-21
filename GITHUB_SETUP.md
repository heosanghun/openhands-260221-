# GitHub App 설정 가이드 (OpenHands)

이 가이드는 OpenHands를 GitHub과 연동하기 위한 GitHub App 생성 및 설정 방법을 설명합니다.

## 1. GitHub App 생성 단계

1. GitHub 계정에 로그인한 후 [Settings > Developer Settings > GitHub Apps](https://github.com/settings/apps)로 이동합니다.
2. **New GitHub App** 버튼을 클릭합니다.
3. 아래 항목들을 입력합니다.

### 기본 정보 (Basic Information)
- **GitHub App name**: `OpenHands-YourName` (중복되지 않는 고유한 이름)
- **Homepage URL**: `https://openhands-260221.pages.dev`

### 인증 및 권한 (Identifying and authorizing users)
- **Callback URL**: `https://openhands-260221.pages.dev/oauth/github/callback`
- **Expire user authorization tokens**: 체크 (권장)
- **Request user authorization (OAuth) during installation**: 체크

### 웹훅 (Webhook)
- **Active**: 체크
- **Webhook URL**: `https://openhands-260221.pages.dev/integration/github/events`
- **Webhook Secret**: 본인이 정한 안전한 비밀번호 (나중에 `.env`의 `GITHUB_APP_WEBHOOK_SECRET`으로 사용)

### 권한 (Permissions)
**Repository permissions:**
- **Contents**: Read & Write (코드 읽기 및 커밋 작성용)
- **Pull requests**: Read & Write (PR 생성 및 관리용)
- **Metadata**: Read-only (기본 설정)
- **Issues**: Read & Write (이슈 확인 및 답변용)

**Organization permissions** (필요한 경우):
- **Members**: Read-only

### 이벤트 구독 (Subscribe to events)
- **Push**
- **Pull request**
- **Issues**

### 설치 대상 (Where can this GitHub App be installed?)
- **Any account** (여러 저장소에서 사용하려는 경우) 또는 **Only on this account**

## 2. 앱 생성 후 확인 사항

앱을 생성한 후 다음 값들을 복사하여 OpenHands의 `.env` 파일에 설정해야 합니다.

1. **App ID**: 생성된 앱의 General 탭 상단에 있습니다. (`GITHUB_APP_ID`)
2. **Client ID**: General 탭의 Client ID 섹션에 있습니다. (`GITHUB_CLIENT_ID`)
3. **Client Secret**: "Generate a new client secret" 버튼을 눌러 생성합니다. (`GITHUB_CLIENT_SECRET`)
4. **Private Key**: 하단의 "Generate a private key" 버튼을 눌러 `.pem` 파일을 다운로드합니다. 파일의 내용을 모두 복사하여 설정합니다. (`GITHUB_APP_PRIVATE_KEY`)

## 3. 환경 변수 설정 (.env)

발급받은 값들을 다음과 같이 설정하세요:

```env
GITHUB_CLIENT_ID=여러분의_클라이언트_ID
GITHUB_CLIENT_SECRET=여러분의_클라이언트_시크릿
GITHUB_APP_ID=여러분의_APP_ID
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_APP_WEBHOOK_SECRET=여러분이_설정한_웹훅_시크릿
```

설정이 완료되면 저장소를 푸시하여 배포를 트리거하세요.
