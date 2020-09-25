> GitHub action to give a welcome comment on first issue or PR 💖

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
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: bubkoo/welcome@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FIRST_ISSUE: >
            👋 @${author}
            
             Thanks for opening your first issue here! Be sure to follow the issue template!


          FIRST_PR: >
            👋 @${author}
            
            Thanks for opening this pull request! Please check out our contributing guidelines.


          FIRST_PR_MERGED: >
            🎉 @${author}
            
            Congrats on merging your first pull request! We here at behaviorbot are proud of you!
```

Config for first issues:

```yml
name: Welcome
on:
  issues:
    types: [opened]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: bubkoo/welcome@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FIRST_ISSUE: >
            👋 @${author}
            
             Thanks for opening your first issue here! Be sure to follow the issue template!
```

Config for first PRs:

```yml
name: Welcome
on:
  pull_request:
    types: [opened]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: bubkoo/welcome@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FIRST_PR: >
            👋 @${author}
            
            Thanks for opening this pull request! Please check out our contributing guidelines.
```

## License

MIT
