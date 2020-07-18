pipeline {
  agent any
  environment {
    DOCKER_TAG = getDockerTag()
    DOCKER_APP = 'nodeapp'
    DOCKER_DEV = 'romanv7'
  }
  stages {
    stage("Build Docker Image") {
      steps {
        sh "docker build -t ${DOCKER_DEV}/${DOCKER_APP}:${DOCKER_TAG} ./app/"
      }
    }
    stage("Push to DockerHub") {
      steps {
        withCredentials([string(credentialsId: "docker-hub", variable: "dockerHubPwd")]) {
          sh "docker login -u ${DOCKER_DEV} -p ${dockerHubPwd}"
        }
        sh "docker push ${DOCKER_DEV}/${DOCKER_APP}:${DOCKER_TAG}"
      }
    }
  }
}

def getDockerTag() {
  def tag = sh script: "git rev-parse HEAD", returnStdout: true
  return tag
}
