# CFPASS 홈페이지 — IIS 배포본

빌드 산출물이 없는 **순수 정적 사이트**입니다. 이 저장소를 사이트 루트에
그대로 두면 동작합니다. npm·Node·.NET 런타임 의존이 없습니다.

- 소스/Netlify 배포본: <https://github.com/iYNz/cfpass-refine>
- Netlify 미리보기: <https://cfpass-refine.netlify.app/>

## 배포

```
IIS 사이트 루트/
├─ index.html          기본 문서
├─ web.config          MIME · 캐시 · 압축 · 보안 헤더
├─ robots.txt
├─ favicon.ico
└─ assets/             css · js · brand · poster · img · media
```

```powershell
git clone https://github.com/iYNz/cfpass-refine-iis.git C:\inetpub\cfpass
```

> 파일을 옮길 때는 `git clone` 또는 `robocopy /S` 를 쓰세요.
> 개발 환경에서 `assets/img` · `assets/media` 는 디렉터리 정션이라
> 탐색기 복사는 링크만 옮겨 깨집니다. clone 하면 실제 파일이 받아집니다.

## 서버 준비물

| 항목 | 값 |
|---|---|
| IIS | 10 이상 |
| 기능 | Static Content · Default Document · HTTP Errors |
| 앱 풀 | **관리 코드 없음** (.NET 불필요) |
| URL Rewrite | **불필요** (SPA 라우팅·클린 URL 미사용) |

### `.webm` MIME 등록이 핵심입니다

기본 IIS 는 `.webm` 을 모릅니다. 등록하지 않으면 **영상 24개가 전부 404** 로
떨어져 화면이 비어 보입니다. `web.config` 에 이미 들어 있으니 해당 파일이
사이트 루트에 함께 배포되었는지만 확인하면 됩니다.

`web.config` 에 `httpCompression` 은 넣지 않았습니다 — 서버 수준에서 잠긴
경우가 많아 덮어쓰면 `500.19` 가 납니다. 정적 압축은 서버 기본값에 맡깁니다.

## 캐시 정책

파일명에 해시가 없으므로 갱신이 늦으면 안 되는 것과 아닌 것을 나눴습니다.

| 대상 | Cache-Control |
|---|---|
| HTML | 무캐시 |
| `assets/css` · `assets/js` | 1시간 |
| `assets/media` · `img` · `poster` · `brand` | 1년 |

## 도메인 확정 후 채울 항목

현재 도메인 미정이라 **절대 URL 이 필요한 항목은 비워 뒀습니다.**
크롤러 대부분이 상대 경로를 읽지 못해 반쪽으로 넣는 것이 더 나쁩니다.

| 항목 | 위치 |
|---|---|
| `<link rel="canonical">` | `index.html` `<head>` |
| `og:url` · `og:image` | `index.html` `<head>` (주석으로 자리 표시) |
| `sitemap.xml` | 루트에 신규 생성 |
| `Sitemap:` 줄 | `robots.txt` (주석으로 자리 표시) |

`www` / non-`www` 중 어느 쪽을 정본으로 할지도 함께 정해 주세요.
나머지 한쪽은 301 로 넘기는 것을 권합니다.

## 참고

문의 폼은 백엔드 없이 **`mailto:` 로 메일 클라이언트를 여는 방식**입니다.
서버측 폼 처리(SMTP·엔드포인트)는 필요하지 않습니다.
