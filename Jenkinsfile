pipeline {
    agent any

    environment {
        DOCKER_CREDS = 'dockerhub-credentials-id'
        IMAGE_NAME   = 'daffamusyafa/frontend-app'
        IMAGE_TAG    = "${BUILD_NUMBER}"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('3. Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS}", 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        // Login otomatis menggunakan credential Jenkins
                        sh "echo '${DOCKER_PASS}' | docker login -u '${DOCKER_USER}' --password-stdin"
                        
                        // Push image ke Docker Hub
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('4. Deploy to Kubernetes') {
            steps {
                script {
                    // Update image deployment ke versi tag terbaru secara otomatis
                    sh "kubectl set image deployment/frontend-app frontend=${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    // Atau apply config k8s
                    sh "kubectl apply -f k8s/"
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline sukses! Aplikasi berhasil di-build, push ke Docker Hub, dan deploy ke K8s."
        }
        failure {
            echo "Pipeline gagal! Cek log Jenkins untuk detail errornya."
        }
    }
}