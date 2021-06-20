pipeline {
  agent any

  environment {
    IMAGE_NAME = "plush-forest-web"
    SERVICE_NAME = "plush-forest-web"
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

  triggers {
    githubPush()
  }

  post {
    failure {
      updateGitlabCommitStatus name: 'build', state: 'failed'
      setBuildStatus("Build Failed", "FAILURE")
    }
    success {
      updateGitlabCommitStatus name: 'build', state: 'success'
      setBuildStatus("Build Compelte", "SUCCESS")
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

def setBuildStatus(String message, String state) {
  step([
    $class: "GitHubCommitStatusSetter",
    reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/PlushFamily/plush-forest-web"],
    contextSource: [$class: "ManuallyEnteredCommitContextSource", context: env.JOB_NAME],
    errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
    commitShaSource: [$class: "ManuallyEnteredShaSource", sha: env.GIT_COMMIT ],
    statusResultSource: [$class: "ConditionalStatusResultSource", results: [
      [$class: "AnyBuildResult", message: message, state: state]]
    ]
  ]);
}