multibranchPipelineJob('plush-forest-web/plush-forest-web-pipeline') {
  displayName('plush-forest-web-pipeline')

  branchSources {
    github {
      id('plush-forest-web')
      scanCredentialsId('github')
      repoOwner('PlushFamily')
      repository('plush-forest-web')
    }
  }

  orphanedItemStrategy {
    discardOldItems {
      daysToKeep(1)
      numToKeep(0)
    }
  }
}
