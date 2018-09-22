pipeline{
    agent any		
    stages {		
        stage('Build Project') {		
            steps {		
                echo 'Start Application'		
            }		
        }		
        stage('Done!') {		
            steps {		
                echo 'Done :)'		
            }		
        }		
    }		
} 