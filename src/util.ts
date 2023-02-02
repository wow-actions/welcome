import mustache from 'mustache'
import * as core from '@actions/core'
import * as github from '@actions/github'

export function getOctokit() {
  const token = core.getInput('GITHUB_TOKEN', { required: true })
  return github.getOctokit(token)
}

async function isStarredBy(
  octokit: ReturnType<typeof getOctokit>,
  user: string,
) {
  for (let page = 0; ; page++) {
    // eslint-disable-next-line no-await-in-loop
    const resp = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
      ...github.context.repo,
      page,
      per_page: 100,
    })
    if (resp.data.some((u) => u && u.login === user)) {
      return true
    }
    if (resp.data.length < 100) {
      break
    }
  }
  return false
}

export async function getComment(
  octokit: ReturnType<typeof getOctokit>,
  comment: string,
  args: { [key: string]: string },
) {
  let message = comment
  const author = args.author
  const starMessage = core.getInput('STAR_MESSAGE')
  if (author && starMessage) {
    const stared = await isStarredBy(octokit, author)
    if (!stared) {
      message += `\n\n ${starMessage}`
    }
  }
  return mustache.render(message, args)
}
