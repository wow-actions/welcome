import * as core from '@actions/core'
import * as github from '@actions/github'
import { Core } from './core'

async function run(): Promise<void> {
  try {
    core.info(`action: ${github.context.eventName}`)
    Core.firstIssue()
    Core.firstPR()
    Core.firstPRMerged()
  } catch (e) {
    core.error(e)
    core.setFailed(e)
  }
}

run()
