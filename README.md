# Welcome

Welcomes new users by creating a comment in the first time issue/PR

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

- `GITHUB_TOKEN`: Your GitHub token for authentication
- `FIRST_ISSUE` or `FIRST_ISSUE_COMMENT`: Comment to be posted to on first time issues.
- `FIRST_ISSUE_REACTIONS`: Reactions to be add to comment on first time issues.
- `FIRST_PR` or `FIRST_PR_COMMENT`: Comment to be posted to on PRs from first time contributors in your repository.
- `FIRST_PR_REACTIONS`: Reactions to be add to comment on PRs from first time contributors in your repository.
- `FIRST_PR_MERGED` or `FIRST_PR_MERGED_COMMENT`: Comment to be posted to on pull requests merged by a first time user.
- `FIRST_PR_MERGED_REACTIONS`: Reactions to be add to comment on pull requests merged by a first time user.

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
