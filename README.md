# github-p2pb

## How to use
0. Enable Node.js
1. `npm install`
2. 環境変数の設定([env](##env)を参照)
3. `npm run copy`

## env
### GITHUB_TOKEN
Githubの
`setting> Developer setting >Personal access tokens`
から作成する個人用token。

権限は
- repo (repo Full control of private repositories)
- write:org
- read:org
- read:user
が必要。

### ISSUE_QUERY
コピーするissueを絞り込むクエリ。
ブラウザで操作する時と同じものが使用できる。

SAMPLE: `project:some-team/repo/1 is:open`

### ORGANIZATION
操作したいβ版projectが属するORGANIZATION名。
後述する`PROJECT_NEXT_ID`を見つけるために必要。

### PROJECT_NEXT_ID
issueをコピーしたい新しいprojectのid。
β版projectのidが指定できる。

前述した`ORGANIZATION`を設定していれば、
`npm run find-projectsNext`
で直近に作成したβ版projectの情報を10個まで取得できるので、そこからidを見つけることができる。