multibranchPipelineJob('plant-tree-web/plant-tree-web-pipeline') {
  displayName('plant-tree-web-pipeline')

  branchSources {
    git {
      id('plant-tree-web')
      credentialsId('GitLab')
      remote('git@git.ideom.net:newbly/plant-tree-web.git')
    }
  }

  orphanedItemStrategy {
    discardOldItems {
      daysToKeep(1)
      numToKeep(0)
    }
  }
}
