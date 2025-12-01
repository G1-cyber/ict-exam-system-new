// 配置GitHub仓库信息
const GITHUB_CONFIG = {
    owner: '您的GitHub用户名', // 例如 'zhangsan'
    repo: 'ict-exam-system',   // 您的仓库名
    token: 'ghp_xxxxxxxxxxxx'  // 需要创建Personal Access Token
};

// 成绩提交到GitHub Issues
async function submitToGitHub(examData) {
    const issueData = {
        title: `考试成绩 - ${examData.userName} - ${examData.score}分`,
        body: `
## 考试信息
- **姓名**: ${examData.userName}
- **部门**: ${examData.userDepartment} 
- **工号**: ${examData.userEmployeeId}
- **分数**: ${examData.score}
- **考试时间**: ${examData.endTime.toLocaleString()}
- **设备信息**: ${navigator.userAgent}

## 原始数据
\`\`\`json
${JSON.stringify(examData, null, 2)}
\`\`\`
        `,
        labels: ['exam-score', 'auto-generated']
    };

    try {
        const response = await fetch('https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues', {
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(issueData)
        });
        
        if (response.ok) {
            console.log('成绩已保存到GitHub Issues');
            return true;
        }
    } catch (error) {
        console.error('提交失败:', error);
    }
    return false;
}
