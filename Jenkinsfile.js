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
        sh "docker build ./app/ -t ${DOCKER_DEV}/${DOCKER_APP}:${DOCKER_TAG}"
      }
    }
    stage("Push to DockerHub") {
      steps {
        withCredentials([string(credentialsId: 'docker', variable: 'dockerPassword')]) {
          sh "docker login -u ${DOCKER_DEV} -p ${dockerPassword}"
          sh "docker push ${DOCKER_DEV}/${DOCKER_APP}:${DOCKER_TAG}"
        }
      }
    }
    stage("Remove previos container") {
      steps {
        try {
          //def dockerRm = "docker rm -f ${DOCKER_APP}"
          def dockerRm = "docker-compose down"
      		sshagent(['docker-dev']) {
      			sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.17.196 ${dockerRm}"
      		}
        } catch(error) {}
      }
    }
    stage("Deploy to dev server") {
      steps {
        def dockerRun = 'docker-compose up -d'
        sshagent(['docker-dev']) {
         sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.17.196 ${dockerRun}"
        }
      }
    }
}

def getDockerTag() {
  def tag = sh script: "git rev-parse HEAD", returnStdout: true
  return tag
}
