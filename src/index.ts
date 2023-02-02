import * as core from '@actions/core'
import * as github from '@actions/github'
import { addReactions } from './reaction'
import { getOctokit, getComment } from './util'

async function run(context = github.context) {
  core.debug(`event: ${context.eventName}`)
  core.debug(`action: ${context.payload.action}`)

  try {
    const event = context.eventName
    const { action } = context.payload
    const { issue } = context.payload
    const pr = context.payload.pull_request
    const isIssue = event === 'issues' && issue != null
    const isPR =
      (event === 'pull_request' || event === 'pull_request_target') &&
      pr != null

    if ((isIssue || isPR) && action === 'opened') {
      const comment =
        issue != null
          ? core.getInput('FIRST_ISSUE') || core.getInput('FIRST_ISSUE_COMMENT')
          : core.getInput('FIRST_PR') || core.getInput('FIRST_PR_COMMENT')
      const reactions =
        issue != null
          ? core.getInput('FIRST_ISSUE_REACTIONS')
          : core.getInput('FIRST_PR_REACTIONS')

      if (comment) {
        const entity = (issue || pr)!
        const author = entity.user.login
        const octokit = getOctokit()
        const response = await octokit.rest.issues.listForRepo({
          ...context.repo,
          state: 'all',
          creator: author,
        })

        const list = response.data.filter((data) =>
          issue != null ? !data.pull_request : data.pull_request,
        )

        if (list.length === 1) {
          const { data } = await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: entity.number,
            body: await getComment(octokit, comment, { author }),
          })

          if (reactions) {
            await addReactions(octokit, data.id, reactions)
          }
        }
      }
    } else if (isPR && action === 'closed' && pr != null) {
      const comment =
        core.getInput('FIRST_PR_MERGED') ||
        core.getInput('FIRST_PR_MERGED_COMMENT')
      const reactions = core.getInput('FIRST_PR_MERGED_REACTIONS')

      if (pr.merged && comment) {
        const author = pr.user.login
        const { owner, repo } = context.repo
        const octokit = getOctokit()
        const res = await octokit.rest.search.issuesAndPullRequests({
          q: `is:pr is:merged author:${author} repo:${owner}/${repo}`,
        })

        const merged = res.data.items.filter(
          (item) => item.number !== pr.number,
        )

        if (merged.length === 0) {
          const { data } = await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: pr.number,
            body: await getComment(octokit, comment, { author }),
          })

          if (reactions) {
            await addReactions(octokit, data.id, reactions)
          }
        }
      }
    }
  } catch (e) {
    core.error(e)
    core.setFailed(e.message)
  }
}

run()
