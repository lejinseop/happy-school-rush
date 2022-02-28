## Rush monorepo 생성

1. npm install -g @microsoft/rush
2. mkdir new-monorepo & cd new-monorepo 
3. rush init

## 프로젝트 추가

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

## Rush monorepo dependencies 설치

```
rush update
```

rush update시 하는 일
1. common/config에 있는 설정이 업데이트 되었는지 확인
2. 프로젝트별 package.json 파일과 common의 lock 파일이 유효한지 확인
3. common의 lock파일이 다르면 패키지 매니저가 lock파일을 업데이트함
4. common/temp/node_modules에 필요한 의존성 설치
5. 각 프로젝트의 node_modules에 common/temp/node_modules의 symlink 생성

## 프로젝트에 dependency 추가

1. dependency 추가가 필요한 프로젝트 경로에서
2. rush add -p package-name@semver 사용
3. devDependencies인 경우 --dev 옵션 추가

node_modules에 제대로 install안되어있는 경우 root/common/temp/yarn-cache제거 및 rush update

## package.json의 scripts 실행

```
rushx [script name]

// 예시
// rushx start
// rushx dev
```
