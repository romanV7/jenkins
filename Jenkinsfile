pipeline {
  agent any
  environment {
    DOCKER_TAG = getDockerTag()
    DOCKER_APP = 'nodeapp'
    DOCKER_DEV = 'romanv7'
    ROOTPATH = 'root/app/'
  }
  stages {
    stage("Build Docker Image") {
      steps {
        sh "ls -la"
        sh "docker -v"
        sh "docker build ./app/ -t ${DOCKER_DEV}/${DOCKER_APP}:${DOCKER_TAG}"
      }
    }
    stage("Push to DockerHub") {
      steps {
        withCredentials([string(credentialsId: 'docker', variable: 'dockerPassword')]) {
          sh "docker login -u ${DOCKER_DEV} -p ${dockerPassword}"
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
