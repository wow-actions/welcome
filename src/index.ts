import * as core from '@actions/core'
import { FirstIssue } from './first-issue'

async function run(): Promise<void> {
  try {
    FirstIssue.run()
  } catch (e) {
    core.error(e)
    core.setFailed(e)
  }
}

run()
