<h1 align="center">Welcome</h1>


<p align="center">
  <a href="/wow-actions/welcome/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/wow-actions/welcome?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/wow-actions/welcome/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/welcome" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=Marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>
  <a href="https://github.com/wow-actions/welcome/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/wow-actions/welcome/Release/master?logo=github&style=flat-square" ></a>
  <a href="https://lgtm.com/projects/g/wow-actions/welcome/context:javascript" rel="nofollow"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/wow-actions/welcome.svg?logo=lgtm&style=flat-square" ></a>
</p>


<p align="center"><strong>Welcome new users by creating a comment in the first time issue/PR</string></p>

![first-issue](https://github.com/wow-actions/welcome/blob/master/screenshots/first-issue.jpg?raw=true)

## Usage

Create a `.github/workflows/welcome.yml` file in the repository you want to install this action, then add the following to it:

```yml
name: Welcome
on:
  pull_request:
    types: [opened, closed]
  issues:
    types: [opened]
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/welcome@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FIRST_ISSUE: |
            👋 @{{ author }}
             Thanks for opening your first issue here! Be sure to follow the issue template!

          FIRST_PR: |
            👋 @{{ author }}
            Thanks for opening this pull request! Please check out our contributing guidelines.

          FIRST_PR_MERGED: |
            🎉 @{{ author }}
            Congrats on merging your first pull request! We here at behaviorbot are proud of you!
```

### Inputs

Various inputs are defined to let you configure the action:

> Note: [Workflow command and parameter names are not case-sensitive](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#about-workflow-commands).

| Name | Description | Default |
| --- | --- | --- |
| `GITHUB_TOKEN` | The GitHub token for authentication | N/A |
| `FIRST_ISSUE` <br> or <br> `FIRST_ISSUE_COMMENT` | Comment to be posted to on first time issues |  |
| `FIRST_ISSUE_REACTIONS` | Reactions to be add to comment on first time issues |  |
| `FIRST_PR` <br> or <br> `FIRST_PR_COMMENT` | Comment to be posted to on PRs from first time contributors in your repository |  |
| `FIRST_PR_REACTIONS` | Reactions to be add to comment on PRs from first time contributors in your repository |  |
| `FIRST_PR_MERGED` <br> or <br> `FIRST_PR_MERGED_COMMENT` | Comment to be posted to on pull requests merged by a first time user |  |
| `FIRST_PR_MERGED_REACTIONS` | Reactions to be add to comment on pull requests merged by a first time user |  |

Available reactions:

| content    | emoji |
| ---------- | ----- |
| `+1`       | 👍    |
| `-1`       | 👎    |
| `laugh`    | 😄    |
| `confused` | 😕    |
| `heart`    | ❤️    |
| `hooray`   | 🎉    |
| `rocket`   | 🚀    |
| `eyes`     | 👀    |

### Other examples

#### Config for First Issue

```yml
name: Welcome
on:
  issues:
    types: [opened]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/welcome@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FIRST_ISSUE_REACTIONS: '+1, hooray, rocket, heart'
          FIRST_ISSUE_COMMENT: |
            👋 @{{ author }}
             Thanks for opening your first issue here! Be sure to follow the issue template!
```

#### Config for First PR

```yml
name: Welcome
on:
  pull_request:
    types: [opened]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/welcome@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FIRST_PR_REACTIONS: '+1, hooray, rocket, heart'
          FIRST_PR_COMMENT: |
            👋 @{{ author }}
            Thanks for opening this pull request! Please check out our contributing guidelines.
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
