pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {

        stage('Build') {
            steps {
                dir('backend') {
                    sh '''
                    node -v
                    npm -v
                    npm install
                    '''
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
        sh '''
        export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin
        docker build -t task-manager .
        '''
        }
        }

        stage('Deploy') {
        steps {
        sh '''
        export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin
        docker run -d -p 3000:3000 task-manager || true
        '''
        }
      }
    }
}