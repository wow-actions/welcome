import * as core from '@actions/core'
import * as github from '@actions/github'
import { Util } from './util'

export namespace Core {
  export async function firstIssue() {
    const context = github.context
    const comment = core.getInput('FIRST_ISSUE')
    if (context.payload.issue && comment) {
      const token = core.getInput('GITHUB_TOKEN', { required: true })
      const octokit = github.getOctokit(token)
      const response = await octokit.issues.listForRepo({
        ...context.repo,
        state: 'all',
        creator: context.payload.issue.owner,
      })

      const issues = response.data.filter((data) => !data.pull_request)
      if (issues.length === 1) {
        await octokit.issues.createComment({
          ...context.repo,
          issue_number: context.payload.issue.number,
          body: Util.pickComment(comment, {
            author: context.payload.issue.owner,
          }),
        })
      }
    }
  }

  export async function firstPR() {
    const context = github.context
    const comment = core.getInput('FIRST_PR')
    if (context.payload.pull_request && comment) {
      const token = core.getInput('GITHUB_TOKEN', { required: true })
      const octokit = github.getOctokit(token)
      const response = await octokit.issues.listForRepo({
        ...context.repo,
        state: 'all',
        creator: context.payload.pull_request.owner,
      })

      const prs = response.data.filter((data) => data.pull_request)
      if (prs.length === 1) {
        await octokit.issues.createComment({
          ...context.repo,
          issue_number: context.payload.pull_request.number,
          body: Util.pickComment(comment, {
            author: context.payload.pull_request.owner,
          }),
        })
      }
    }
  }

  export async function firstPRMerged() {
    // const context = github.context
    // const comment = core.getInput('FIRST_PR_MERGED')
  }
}
