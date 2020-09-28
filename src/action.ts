import * as core from '@actions/core'
import * as github from '@actions/github'
import { Reaction } from './reaction'
import { Util } from './util'

export namespace Action {
  export async function run(context = github.context) {
    try {
      const event = context.eventName
      const action = context.payload.action
      const issue = context.payload.issue
      const pr = context.payload.pull_request

      if (
        ((event === 'issues' && issue != null) ||
          (event === 'pull_request' && pr != null)) &&
        action === 'opened'
      ) {
        const comment =
          issue != null
            ? core.getInput('FIRST_ISSUE') ||
              core.getInput('FIRST_ISSUE_COMMENT')
            : core.getInput('FIRST_PR') || core.getInput('FIRST_PR_COMMENT')
        const reactions =
          issue != null
            ? core.getInput('FIRST_ISSUE_REACTIONS')
            : core.getInput('FIRST_PR_REACTIONS')

        if (comment) {
          const entity = (issue || pr)!
          const author = entity.user.login
          const octokit = Util.getOctokit()
          const response = await octokit.issues.listForRepo({
            ...context.repo,
            state: 'all',
            creator: author,
          })

          const list = response.data.filter((data) =>
            issue != null ? !data.pull_request : data.pull_request,
          )

          if (list.length === 1) {
            const { data } = await octokit.issues.createComment({
              ...context.repo,
              issue_number: entity.number,
              body: Util.pickComment(comment, { author }),
            })

            if (reactions) {
              await Reaction.add(octokit, data.id, reactions)
            }
          }
        }
      } else if (
        pr != null &&
        event === 'pull_request' &&
        action === 'closed'
      ) {
        const comment =
          core.getInput('FIRST_PR_MERGED') ||
          core.getInput('FIRST_PR_MERGED_COMMENT')
        const reactions = core.getInput('FIRST_PR_MERGED_REACTIONS')

        if (pr.merged && comment) {
          const author = pr.user.login
          const { owner, repo } = context.repo
          const octokit = Util.getOctokit()
          const res = await octokit.search.issuesAndPullRequests({
            q: `is:pr is:merged author:${author} repo:${owner}/${repo}`,
          })

          const merged = res.data.items.filter(
            (item) => item.number !== pr.number,
          )

          if (merged.length === 0) {
            const { data } = await octokit.issues.createComment({
              ...context.repo,
              issue_number: pr.number,
              body: Util.pickComment(comment, { author }),
            })

            if (reactions) {
              await Reaction.add(octokit, data.id, reactions)
            }
          }
        }
      }
    } catch (e) {
      core.error(e)
      core.setFailed(e.message)
    }
  }
}
