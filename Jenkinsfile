pipeline {
  agent any

  environment {
    IMAGE_NAME = "plant-tree-web"
    SERVICE_NAME = "plant-tree-web"
  }

  stages {

    stage('Install Dependencies') {
      agent {
        docker { image 'node:12-alpine' }
      }

      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      agent {
        docker { image 'node:12-alpine' }
      }

      steps {
        sh 'npm run build'
        stash includes: 'build/**/*', name: 'build'
        stash 'Dockerfile'
      }
    }

    stage('Build Image') {
      steps {
        unstash 'build'
        unstash 'Dockerfile'

        script {
          def version = "${env.GIT_BRANCH}-${env.BUILD_ID}"
          def image = docker.build(IMAGE_NAME);

          docker.withRegistry('https://hub.newbly.com', 'docker_registry') {
            image.push(version)

            if (isMasterBranch()) {
              image.push("latest")
            }
          }
        }
      }
    }

    stage('Deploy Container') {
      when {
        anyOf {
          branch 'master'
        }
      }

      steps {
        script {
          docker.withRegistry('https://hub.newbly.com', 'docker_registry') {
            def image = docker.image(IMAGE_NAME);

            image.pull();

            sh "docker-compose -f /home/docker-compose.yml up -d --no-deps --build ${SERVICE_NAME}"
          }
        }
      }
    }
  }

  options {
    gitLabConnection('GitLab')
  }

  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }

  post {
    failure {
      updateGitlabCommitStatus name: 'build', state: 'failed'
    }
    success {
      updateGitlabCommitStatus name: 'build', state: 'success'
    }
    always {
      cleanWs()
      deleteDir()
    }
  }
}

def isMasterBranch() {
  env.BRANCH_NAME == "master"
}
