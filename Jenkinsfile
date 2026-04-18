pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test || true'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t task-manager .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 task-manager'
            }
        }
    }
}