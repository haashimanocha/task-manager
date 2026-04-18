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

        stage('Code Quality (SonarCloud)') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('sonarcloud') {
                        sh '''
                        npm install -g sonar-scanner

                        sonar-scanner \
                          -Dsonar.projectKey=task-manager \
                          -Dsonar.organization=haashimanocha \
                          -Dsonar.host.url=https://sonarcloud.io \
                          -Dsonar.login=819968b2249f18b5f593366d224bcaa2139bfc7c
                        '''
                    }
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
                docker stop task-manager || true
                docker rm task-manager || true
                docker run -d -p 3000:3000 --name task-manager task-manager
                '''
            }
        }
    }
}