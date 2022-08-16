#!groovy

node {
	project = "json_editor"
	organization = "talksoft"
	ecr_repository = "794222586771.dkr.ecr.us-east-1.amazonaws.com/json_editor"
	properties([[$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class : 'LogRotator', numToKeepStr : '15', artifactNumToKeepStr: '1']]])

	if (!isPRMergeBuild()) {
		cleanWs()
		def scmVars = checkout scm
		commit = scmVars.GIT_COMMIT
		env.GIT_COMMIT = scmVars.GIT_COMMIT
		env.GIT_AUTHOR_EMAIL = sh(returnStdout: true, script: "git log -1 --pretty=format:'%an'").trim()
		env.GIT_TAG_MESSAGE = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%s%n%n%b'").trim()

		checkout()
		dockerBuild()
		dockerPush()

		if (env.BRANCH_NAME == 'productionizing') {
		    aws("qa1")
        	aws("qa2")
		}
		
		if (env.BRANCH_NAME == 'master') {
 			manualPromotion()
			aws("prod")
		}
	}    
}

def checkout() {
    stage ('Checkout') {
    	context="continuous-integration/jenkins/"
    	checkout scm
    	setBuildStatus ("${context}", '🔵 Checking out completed', 'SUCCESS')
    }
}

def dockerBuild() {
	stage ('Docker Build') {
		context="continuous-integration/jenkins/dockerBuild"
		sh(returnStdout: true, script: "docker build . -t " + ecr_repository + ":" + commit)
		setBuildStatus ("${context}", 'Docker build succeeded', 'SUCCESS')
	}
}

def dockerPush() {
	stage ('Docker Push') {
		context="continuous-integration/jenkins/dockerPush"
		sh(returnStdout: true, script: "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 794222586771.dkr.ecr.us-east-1.amazonaws.com")
		sh(returnStdout: true, script: "docker push " + ecr_repository + ":" + commit)
		setBuildStatus ("${context}", 'Docker push succeeded', 'SUCCESS')
	}
}

def manualPromotion() {
	stage ('Manual Promotion') {
		context="continuous-integration/jenkins/manualPromotion"
	    // we need a first milestone step so that all jobs entering this stage are tracked an can be aborted if needed
	    milestone 1
	    // time out manual approval after ten minutes
	    timeout(time: 10, unit: 'MINUTES') {
	        input message: "Deploy to Prod?"
	    }
	    // this will kill any job which is still in the input step
	    milestone 2
    }
}

def aws(shard) {
	stage ('Microservices ' + shard + ' Deploy') {
		context="continuous-integration/jenkins/" + shard + "-deploy"
		sh '''
		docker tag '''+ecr_repository+''':'''+commit+''' '''+ecr_repository+''':'''+shard+'''
		docker push '''+ecr_repository+''':'''+shard+'''
		aws ecs update-service --cluster microservices --service '''+project+'''-'''+shard+''' --force-new-deployment  | tee
		'''
		setBuildStatus ("${context}", 'Deploy to ECS ' + shard + ' completed', 'SUCCESS')
	}
}

def prodAws() {
	stage ('Microservices Prod Deploy') {
		context="continuous-integration/jenkins/prod-deploy"
		sh '''
		docker tag '''+ecr_repository+''':'''+commit+''' '''+ecr_repository+''':prod
		docker push '''+ecr_repository+''':prod
		aws ecs update-service --cluster microservices --service '''+project+''' --force-new-deployment --profile prod | tee
		'''
		setBuildStatus ("${context}", 'Deploy to ECS prod completed', 'SUCCESS')
	}
}

def isPRMergeBuild() {
    return (env.BRANCH_NAME ==~ /^PR-\d+$/)
}

def setBuildStatus(context, message, state) {
	if (state != null && state != 'SUCCESS') {
		emailext (
			to: 'alerts@talksoftonline.com',
			subject: "Build failed in Jenkins: ${env.JOB_NAME}",
			body: """\
				${env.JOB_NAME} [${env.BUILD_NUMBER}]
				Commit: ${env.GIT_COMMIT}
          		Last Committer: ${env.GIT_AUTHOR_EMAIL}
          		Commit Message: ${env.GIT_TAG_MESSAGE}
          		Status: ${currentBuild.result}""".stripIndent(),
			recipientProviders: [[$class: 'CulpritsRecipientProvider']]
		)
	}
	emailext (
		to: '6ad6bf42.revspringinc.onmicrosoft.com@amer.teams.ms',
		subject: "${env.JOB_NAME} [${env.BUILD_NUMBER}]",
		body: """\
			${message}
			Commit: ${env.GIT_COMMIT}
			Last Committer: ${env.GIT_AUTHOR_EMAIL}
			Commit Message: ${env.GIT_TAG_MESSAGE}
			Status: ${state}""".stripIndent()
	)
}

def post() {
	if ((currentBuild.result == null || currentBuild.result == 'SUCCESS') && (currentBuild.previousBuild != null && currentBuild.previousBuild.result != 'SUCCESS')) {
		emailext (
			to: 'alerts@talksoftonline.com',
          	subject: "Jenkins build is back to normal: ${env.JOB_NAME}",
			body: """\
          		${env.JOB_NAME} [${env.BUILD_NUMBER}]
          		Commit: ${env.GIT_COMMIT}
          		Last Committer: ${env.GIT_AUTHOR_EMAIL}
          		Commit Message: ${env.GIT_TAG_MESSAGE}
          		Status: ${currentBuild.result}""".stripIndent()
        )
	}
}

