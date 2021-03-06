# Rush

## 기본 가이드

### Rush monorepo 생성

1. npm install -g @microsoft/rush
2. mkdir new-monorepo & cd new-monorepo
3. rush init

### 프로젝트 추가

1. mkdir packages
2. 프로젝트 생성(수동으로 만들어야함)
3. package-lock.json, yarn.lock등은 제거(common에 다 있음)
4. .gitignore,.gitattributes 등도 root에 있어서 제거
5. rush.json에 추가한 프로젝트 정보 입력
   ```
   "projects": [
     {
       "packageName": "new-project-name",
       "projectFolder": "packages/new-project-name"
     }
   ]
   ```

### cra같은걸로 프로젝트 추가

1. /packages 경로에서 프로젝트 생성
   ```
   npx create-react-app new-project --template typescript
   ```
2. package-lock.json, yarn.lock등 제거
3. .gitignore, .gitattributes 등 제거
4. rush.json에 추가한 프로젝트 정보 입력
   ```
   "projects": [
     {
       "packageName": "new-project-name",
       "projectFolder": "packages/new-project-name"
     }
   ]
   ```

### Rush monorepo dependencies 설치

```
rush update
```

rush update시 하는 일

1. common/config에 있는 설정이 업데이트 되었는지 확인
2. 프로젝트별 package.json 파일과 common의 lock 파일이 유효한지 확인
3. common의 lock파일이 다르면 패키지 매니저가 lock파일을 업데이트함
4. common/temp/node_modules에 필요한 의존성 설치
5. 각 프로젝트의 node_modules에 common/temp/node_modules의 symlink 생성

### 프로젝트에 dependency 추가(버그있음)

1. dependency 추가가 필요한 프로젝트 경로에서
2. rush add -p package-name@semver 사용
3. devDependencies인 경우 --dev 옵션 추가

node_modules에 제대로 install안되어있는 경우 `rush update --full --purge`

### package.json의 scripts 실행

```
rushx [script name]

// 예시
// rushx start
// rushx dev
```

### autoinstaller 추가

rush install(update)시 설정되는 환경과 별개로 dependency가 설치되고 동작하도록 하기 위해 사용

1. ~/root$ rush init-autoinstaller --name autoinstaller-name
2. ~/root$ cd common/autoinstallers/autoinstaller-name
3. yarn add dependruencies...
4. ~/autoinstaller-name$ rush update-autoinstaller --name autoinstaller-name

### rush command 추가

rush custom command를 추가
command/config/rush/command-line.json의 commands에 [guide](https://rushjs.io/pages/configs/command-line_json/)를 따라서 추가합니다.

```
{
  ...
  "commands": [
    {
      "name": "command-name",
      "commandKind": "bulk" | "global" | "phase",
      "summary": "summary",
    }
  ]
  ...
}
```

## git hooks 추가

husky같이 git hook 이벤트를 추가할 수 있음. ([guide](https://rushjs.io/pages/maintainer/git_hooks/))

## 특징

### Phantom dependencies 제거

Phantom dependencies는 package.json에 정의하지 않은 패키지를 프로젝트 내에서 import 해서 사용하는 경우.
Rush는 symbolic link를 이용하기때문에 Phantom dependencies를 파악하고 제거할 수 있음.

### git hooks 기능 기본 제공

husky같은걸 쓸 필요 없음.

## 이상한거

### yarn 사용시 rush add 로 의존성 추가하면 node_modules에 제대로 업데이트 X

pnpm은 된다함; 근데 패키지가 없는 경우가 있을 수 있어서 사용x..
rush update --full --purge를 해야하는데 이건 cache활용 안하고 모두 다시 install하는 기능..

https://github.com/microsoft/rushstack/issues/1748
