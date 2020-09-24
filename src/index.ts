import * as core from '@actions/core'
import * as github from '@actions/github'
import { Util } from './util'

async function run(): Promise<void> {
  try {
    core.info(`action: ${JSON.stringify(github.context)}`)

    const context = github.context
    const event = context.eventName
    const action = context.payload.action
    const issue = context.payload.issue
    const pr = context.payload.pull_request

    if (
      ((event === 'issues' && issue != null) ||
        (event === 'pull_request' && pr != null)) &&
      action === 'opened'
    ) {
      const comment = core.getInput(issue != null ? 'FIRST_ISSUE' : 'FIRST_PR')
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
        }

        core.info(`count: ${list.length}`)

        await octokit.issues.createComment({
          ...context.repo,
          issue_number: entity.number,
          body: Util.pickComment(comment, { author }),
        })
      }
    }
  } catch (e) {
    core.error(e)
    core.setFailed(e)
  }
}

run()
