import * as core from '@actions/core'
import * as github from '@actions/github'
import { Util } from './util'

export namespace FirstIssue {
  export async function run() {
    const context = github.context
    const firstIssueComment = core.getInput('FIRST_ISSUE')
    if (context.payload.issue && firstIssueComment) {
      const token = core.getInput('GITHUB_TOKEN', { required: true })
      const octokit = github.getOctokit(token)
      const response = await octokit.issues.listForRepo({
        ...context.repo,
        state: 'all',
        creator: context.payload.issue.owner,
      })

      const issues = response.data.filter((data) => !data.pull_request)
      core.info(`issue count: ${issues.length}`)
      await octokit.issues.createComment({
        ...context.repo,
        issue_number: context.payload.issue.number,
        body: Util.pickComment(firstIssueComment, {
          author: context.payload.issue.owner,
        }),
      })

      // if (issues.length === 1) {

      // }
    }
  }
}
