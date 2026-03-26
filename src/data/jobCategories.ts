// 岗位分级分类体系

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  jobs: JobItem[];
}

export interface JobItem {
  id: string;
  name: string;
  keywords: string[];
  defaultResponsibilities: string[];
  defaultSkills: string[];
  defaultTools: string[];
  industry: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: 'tech',
    name: '技术',
    icon: 'Code',
    subCategories: [
      {
        id: 'frontend',
        name: '前端开发',
        jobs: [
          {
            id: 'web-frontend',
            name: 'Web前端工程师',
            keywords: ['前端', 'Web', 'H5', '网页开发'],
            defaultResponsibilities: ['开发Web页面', '实现交互功能', '优化页面性能', '对接后端接口'],
            defaultSkills: ['HTML/CSS/JavaScript', 'React/Vue', '前端工程化', '响应式设计'],
            defaultTools: ['VS Code', 'Chrome DevTools', 'Webpack/Vite', 'Git'],
            industry: 'tech',
          },
          {
            id: 'mobile-frontend',
            name: '移动端开发',
            keywords: ['移动端', 'App开发', 'iOS', 'Android', 'React Native', 'Flutter'],
            defaultResponsibilities: ['开发移动App', '适配多机型', '优化App性能', '处理兼容性问题'],
            defaultSkills: ['iOS/Android开发', 'React Native/Flutter', '移动端UI适配', '性能优化'],
            defaultTools: ['Xcode', 'Android Studio', 'VS Code', 'Charles'],
            industry: 'tech',
          },
          {
            id: 'mini-program',
            name: '小程序开发',
            keywords: ['小程序', '微信小程序', '支付宝小程序'],
            defaultResponsibilities: ['开发小程序', '实现业务功能', '优化用户体验', '对接后台服务'],
            defaultSkills: ['微信小程序开发', 'Vue/React', 'JavaScript', '云开发'],
            defaultTools: ['微信开发者工具', 'VS Code', 'Git', 'Postman'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'backend',
        name: '后端开发',
        jobs: [
          {
            id: 'java-backend',
            name: 'Java后端工程师',
            keywords: ['Java', '后端', '服务端', 'Spring'],
            defaultResponsibilities: ['开发后端服务', '设计数据库', '编写API接口', '系统性能优化'],
            defaultSkills: ['Java', 'Spring Boot', 'MySQL/Redis', '微服务架构'],
            defaultTools: ['IntelliJ IDEA', 'Maven/Gradle', 'Git', 'Docker'],
            industry: 'tech',
          },
          {
            id: 'python-backend',
            name: 'Python后端工程师',
            keywords: ['Python', '后端', 'Django', 'Flask'],
            defaultResponsibilities: ['开发Python服务', '数据处理', 'API开发', '脚本编写'],
            defaultSkills: ['Python', 'Django/Flask', 'SQL', 'Linux'],
            defaultTools: ['PyCharm', 'Jupyter', 'Git', 'Docker'],
            industry: 'tech',
          },
          {
            id: 'go-backend',
            name: 'Go后端工程师',
            keywords: ['Go', 'Golang', '后端', '高并发'],
            defaultResponsibilities: ['开发高并发服务', '微服务开发', '性能优化', '系统架构设计'],
            defaultSkills: ['Go语言', '微服务', 'gRPC', 'Kubernetes'],
            defaultTools: ['GoLand', 'Docker', 'Kubernetes', 'Git'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'algorithm',
        name: '算法工程师',
        jobs: [
          {
            id: 'recommendation-algo',
            name: '推荐算法工程师',
            keywords: ['推荐算法', '推荐系统', '个性化推荐'],
            defaultResponsibilities: ['设计推荐算法', '优化推荐效果', 'A/B测试', '用户画像构建'],
            defaultSkills: ['机器学习', '推荐算法', 'Python', 'TensorFlow/PyTorch'],
            defaultTools: ['Jupyter', 'Python', 'Spark', 'Hive'],
            industry: 'tech',
          },
          {
            id: 'nlp-algo',
            name: 'NLP算法工程师',
            keywords: ['NLP', '自然语言处理', '文本挖掘', '大模型'],
            defaultResponsibilities: ['开发NLP模型', '文本分析', '对话系统', '大模型微调'],
            defaultSkills: ['NLP', '深度学习', 'Transformer', 'Python'],
            defaultTools: ['PyTorch', 'Hugging Face', 'Python', 'Jupyter'],
            industry: 'tech',
          },
          {
            id: 'cv-algo',
            name: '计算机视觉工程师',
            keywords: ['CV', '计算机视觉', '图像识别', 'OCR'],
            defaultResponsibilities: ['开发CV算法', '图像识别', '目标检测', '模型优化'],
            defaultSkills: ['计算机视觉', '深度学习', 'OpenCV', 'Python'],
            defaultTools: ['PyTorch', 'OpenCV', 'Python', 'CUDA'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'data',
        name: '数据工程师',
        jobs: [
          {
            id: 'data-engineer',
            name: '数据开发工程师',
            keywords: ['数据开发', 'ETL', '数据仓库', '大数据'],
            defaultResponsibilities: ['构建数据仓库', 'ETL开发', '数据 pipeline', '数据治理'],
            defaultSkills: ['SQL', 'Hadoop/Spark', '数据建模', 'Python'],
            defaultTools: ['Hive', 'Spark', 'Airflow', 'Git'],
            industry: 'tech',
          },
          {
            id: 'data-analyst',
            name: '数据分析师',
            keywords: ['数据分析', '商业分析', 'BI', '数据挖掘'],
            defaultResponsibilities: ['数据分析', '报表制作', '业务洞察', 'A/B测试分析'],
            defaultSkills: ['SQL', 'Excel', 'Python/R', '数据可视化'],
            defaultTools: ['Excel', 'Tableau', 'Python', 'SQL'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'qa',
        name: '测试/QA',
        jobs: [
          {
            id: 'manual-tester',
            name: '功能测试工程师',
            keywords: ['测试', '功能测试', 'QA', '黑盒测试'],
            defaultResponsibilities: ['编写测试用例', '执行功能测试', 'Bug跟踪', '测试报告'],
            defaultSkills: ['测试理论', '用例设计', 'Bug管理', '业务理解'],
            defaultTools: ['Jira', '禅道', 'Excel', 'Charles'],
            industry: 'tech',
          },
          {
            id: 'auto-tester',
            name: '自动化测试工程师',
            keywords: ['自动化测试', '测试开发', '接口测试'],
            defaultResponsibilities: ['开发自动化脚本', '接口测试', '性能测试', 'CI/CD集成'],
            defaultSkills: ['Python/Java', 'Selenium', '接口测试', '持续集成'],
            defaultTools: ['Selenium', 'Jenkins', 'Postman', 'Git'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'devops',
        name: 'DevOps/SRE',
        jobs: [
          {
            id: 'devops-engineer',
            name: 'DevOps工程师',
            keywords: ['DevOps', 'CI/CD', '运维开发', '平台工程', '容器化', 'Docker', 'Kubernetes'],
            defaultResponsibilities: ['搭建和维护CI/CD流水线', '容器化和编排管理', '自动化运维工具开发', '监控告警体系建设', '发布流程优化', '基础设施即代码'],
            defaultSkills: ['CI/CD工具', 'Docker/Kubernetes', 'Shell脚本', 'Python', '监控系统', 'Linux运维'],
            defaultTools: ['Jenkins/GitLab CI', 'Docker', 'Kubernetes', 'Ansible', 'Prometheus', 'Git'],
            industry: 'tech',
          },
          {
            id: 'sre-engineer',
            name: 'SRE工程师',
            keywords: ['SRE', '可靠性工程', '稳定性', '故障处理', '容量规划', '服务可靠性'],
            defaultResponsibilities: ['系统稳定性保障', '故障响应与复盘', 'SLO/SLA制定与监控', '容量规划与弹性扩缩', '变更管理', '性能调优'],
            defaultSkills: ['系统架构', '故障排查', '性能分析', '监控体系', 'Linux', '分布式系统'],
            defaultTools: ['Prometheus/Grafana', 'ELK Stack', 'PagerDuty', 'Kubernetes', 'Jaeger', 'Git'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'security',
        name: '安全工程师',
        jobs: [
          {
            id: 'security-engineer',
            name: '安全工程师',
            keywords: ['安全', '网络安全', '渗透测试', '漏洞', '信息安全', '安全开发'],
            defaultResponsibilities: ['安全漏洞扫描与修复', '渗透测试', '安全架构设计', '安全事件响应', '代码安全审计', '安全培训与意识提升'],
            defaultSkills: ['渗透测试', '漏洞分析', '网络安全', '安全开发', 'OWASP', '加密技术'],
            defaultTools: ['Burp Suite', 'Nessus', 'Metasploit', 'Wireshark', 'OWASP ZAP', 'Git'],
            industry: 'tech',
          },
          {
            id: 'data-security',
            name: '数据安全工程师',
            keywords: ['数据安全', '隐私保护', '合规', '数据治理', 'GDPR', '数据脱敏'],
            defaultResponsibilities: ['数据安全策略制定', '数据分类分级', '隐私合规审查', '数据脱敏与加密', '数据访问控制', '安全审计'],
            defaultSkills: ['数据安全', '隐私法规', '数据加密', '访问控制', '合规管理', '风险评估'],
            defaultTools: ['数据安全平台', 'DLP工具', 'SQL', 'Python', 'IAM系统', 'SIEM'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'dba',
        name: '数据库工程师',
        jobs: [
          {
            id: 'mysql-dba',
            name: 'MySQL DBA',
            keywords: ['DBA', '数据库', 'MySQL', '数据库管理员', '数据库运维', 'Oracle'],
            defaultResponsibilities: ['数据库安装部署与维护', '性能调优与索引优化', '数据备份与恢复', '高可用方案设计', '数据迁移', 'SQL优化'],
            defaultSkills: ['MySQL/Oracle', 'SQL优化', '高可用架构', '数据备份', '性能调优', 'Linux'],
            defaultTools: ['MySQL Workbench', 'Percona Toolkit', 'MHA/MGR', 'Prometheus', 'Shell', 'Git'],
            industry: 'tech',
          },
          {
            id: 'nosql-dba',
            name: 'NoSQL工程师',
            keywords: ['NoSQL', 'Redis', 'MongoDB', 'Elasticsearch', 'HBase', '分布式存储'],
            defaultResponsibilities: ['NoSQL数据库架构设计', 'Redis缓存方案设计', 'Elasticsearch搜索优化', '数据库性能调优', '容量规划', '故障处理'],
            defaultSkills: ['Redis', 'MongoDB', 'Elasticsearch', 'Cassandra', '分布式存储', '数据建模'],
            defaultTools: ['Redis Insight', 'MongoDB Compass', 'Kibana', 'Grafana', 'Python', 'Shell'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'architecture',
        name: '技术架构师',
        jobs: [
          {
            id: 'tech-architect',
            name: '技术架构师',
            keywords: ['架构师', '系统架构', '技术架构', '解决方案架构', '架构设计', '微服务'],
            defaultResponsibilities: ['系统架构设计与评审', '技术选型与决策', '核心代码设计', '技术规范制定', '跨团队技术协作', '解决技术难题'],
            defaultSkills: ['系统设计', '微服务架构', '分布式系统', '性能优化', '技术领导力', '多语言开发'],
            defaultTools: ['Draw.io', 'Confluence', 'Java/Go', 'Spring Cloud', 'Kubernetes', 'Git'],
            industry: 'tech',
          },
          {
            id: 'cloud-architect',
            name: '云架构师',
            keywords: ['云架构', '云计算', 'AWS', '阿里云', '腾讯云', '云原生', 'IaC'],
            defaultResponsibilities: ['云平台架构设计', '云迁移方案规划', '成本优化', '安全合规架构', '多云/混合云策略', '基础设施即代码'],
            defaultSkills: ['云计算平台', '云原生技术', 'Terraform', '网络架构', '安全设计', '成本管理'],
            defaultTools: ['AWS/阿里云/腾讯云', 'Terraform', 'Kubernetes', 'Ansible', 'Prometheus', 'Git'],
            industry: 'tech',
          },
        ],
      },
    ],
  },
  {
    id: 'product',
    name: '产品',
    icon: 'Lightbulb',
    subCategories: [
      {
        id: 'toc-product',
        name: 'ToC产品',
        jobs: [
          {
            id: 'tool-product',
            name: '工具类产品经理',
            keywords: ['工具产品', '效率工具', '工具类App'],
            defaultResponsibilities: ['需求分析', '产品设计', '用户研究', '数据分析'],
            defaultSkills: ['产品设计', '用户研究', '数据分析', 'Axure/Figma'],
            defaultTools: ['Figma', 'Axure', 'Jira', '神策数据'],
            industry: 'tech',
          },
          {
            id: 'social-product',
            name: '社交产品经理',
            keywords: ['社交产品', '社区产品', '内容社交'],
            defaultResponsibilities: ['社交功能设计', '用户增长', '社区运营', '内容策略'],
            defaultSkills: ['社交产品', '用户心理', '增长策略', '数据分析'],
            defaultTools: ['Figma', 'Jira', 'GrowingIO', '蝉大师'],
            industry: 'tech',
          },
          {
            id: 'ecommerce-product',
            name: '电商产品经理',
            keywords: ['电商产品', '交易产品', '电商平台'],
            defaultResponsibilities: ['交易流程设计', '商品管理', '订单系统', '营销活动'],
            defaultSkills: ['电商业务', '交易流程', '商品管理', '数据分析'],
            defaultTools: ['Axure', 'Jira', '神策', '生意参谋'],
            industry: 'retail',
          },
        ],
      },
      {
        id: 'tob-product',
        name: 'ToB产品',
        jobs: [
          {
            id: 'saas-product',
            name: 'SaaS产品经理',
            keywords: ['SaaS', '企业服务', 'B端产品'],
            defaultResponsibilities: ['SaaS产品设计', '客户需求分析', '产品规划', '项目管理'],
            defaultSkills: ['B端产品', 'SaaS业务', '客户成功', '项目管理'],
            defaultTools: ['Figma', 'Jira', 'Salesforce', 'HubSpot'],
            industry: 'tech',
          },
          {
            id: 'industry-product',
            name: '行业解决方案产品经理',
            keywords: ['行业解决方案', '垂直行业', '行业产品'],
            defaultResponsibilities: ['行业需求分析', '解决方案设计', '客户沟通', '产品落地'],
            defaultSkills: ['行业知识', '解决方案', '客户沟通', '业务流程'],
            defaultTools: ['Axure', 'Visio', 'PPT', 'Jira'],
            industry: 'consulting',
          },
        ],
      },
      {
        id: 'oversea-product',
        name: '出海产品',
        jobs: [
          {
            id: 'ai-oversea-product',
            name: 'AI出海产品经理',
            keywords: ['AI出海', 'AI应用', '情感陪伴', 'AI伴侣'],
            defaultResponsibilities: ['AI产品设计', '出海本地化', '用户增长', '竞品分析'],
            defaultSkills: ['AI产品', '出海业务', '增长策略', '跨文化沟通'],
            defaultTools: ['ChatGPT', 'Figma', 'App Annie', 'Google Analytics'],
            industry: 'tech',
          },
          {
            id: 'game-oversea-product',
            name: '游戏出海产品经理',
            keywords: ['游戏出海', '游戏产品', '海外发行'],
            defaultResponsibilities: ['游戏产品设计', '海外发行', '本地化', '运营策略'],
            defaultSkills: ['游戏产品', '海外发行', '数据分析', '用户运营'],
            defaultTools: ['Unity', 'Firebase', 'Adjust', 'Tableau'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'data-product',
        name: '数据产品',
        jobs: [
          {
            id: 'growth-product',
            name: '增长产品经理',
            keywords: ['增长产品', '用户增长', '增长黑客'],
            defaultResponsibilities: ['增长策略', 'A/B测试', '用户漏斗优化', '数据驱动'],
            defaultSkills: ['增长策略', '数据分析', 'A/B测试', '用户心理'],
            defaultTools: ['神策', 'GrowingIO', 'Optimizely', 'SQL'],
            industry: 'tech',
          },
          {
            id: 'strategy-product',
            name: '策略产品经理',
            keywords: ['策略产品', '算法策略', '推荐策略'],
            defaultResponsibilities: ['策略设计', '算法对接', '效果评估', '策略优化'],
            defaultSkills: ['策略设计', '算法理解', '数据分析', 'SQL'],
            defaultTools: ['Python', 'SQL', 'Jira', 'Tableau'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'ai-product',
        name: 'AI产品',
        jobs: [
          {
            id: 'ai-product-manager',
            name: 'AI产品经理',
            keywords: ['AI产品', '大模型产品', 'AIGC', 'AI应用', '人工智能产品', 'LLM'],
            defaultResponsibilities: ['AI产品需求分析与规划', '大模型能力评估与接入', 'AI功能设计与优化', '与算法团队深度协作', 'AI产品效果评估', '用户场景挖掘'],
            defaultSkills: ['AI/ML基础知识', '大模型应用', 'Prompt工程', '产品设计', '数据分析', '用户研究'],
            defaultTools: ['ChatGPT/Claude', 'Midjourney', 'Axure/Figma', 'SQL', 'Python', 'Jira'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'platform-product',
        name: '平台产品',
        jobs: [
          {
            id: 'platform-pm',
            name: '平台产品经理',
            keywords: ['平台产品', '中台产品', '基础平台', '开放平台', 'PaaS'],
            defaultResponsibilities: ['平台架构规划', '开放接口设计', '平台生态建设', '内部工具产品化', '平台稳定性和扩展性保障', '跨团队需求协调'],
            defaultSkills: ['系统设计', '平台架构', 'API设计', '技术理解', '跨团队协调', '数据分析'],
            defaultTools: ['Axure/Figma', 'Swagger', 'SQL', 'Jira/Confluence', 'Postman', 'Git'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'monetization-product',
        name: '商业化产品',
        jobs: [
          {
            id: 'monetization-pm',
            name: '商业化产品经理',
            keywords: ['商业化', '变现', '广告产品', '付费产品', '会员产品', '增值服务'],
            defaultResponsibilities: ['商业化产品规划', '广告/付费体系设计', '定价策略制定', '商业化效果分析', '用户付费转化优化', '与销售团队协作'],
            defaultSkills: ['商业模式设计', '广告系统', '数据分析', '定价策略', '用户心理', '产品设计'],
            defaultTools: ['Axure/Figma', 'SQL', 'Excel', 'Tableau/Power BI', 'Jira', 'A/B测试平台'],
            industry: 'tech',
          },
        ],
      },
    ],
  },
  {
    id: 'design',
    name: '设计',
    icon: 'Palette',
    subCategories: [
      {
        id: 'ui-design',
        name: 'UI设计',
        jobs: [
          {
            id: 'app-ui',
            name: 'App UI设计师',
            keywords: ['UI设计', 'App设计', '移动端UI'],
            defaultResponsibilities: ['App界面设计', '视觉规范', '切图标注', '设计走查'],
            defaultSkills: ['UI设计', '视觉设计', 'iOS/Android规范', '组件设计'],
            defaultTools: ['Figma', 'Sketch', 'Photoshop', 'Zeplin'],
            industry: 'tech',
          },
          {
            id: 'web-ui',
            name: 'Web UI设计师',
            keywords: ['网页设计', 'Web UI', 'H5设计'],
            defaultResponsibilities: ['网页设计', '响应式设计', '设计系统', '前端对接'],
            defaultSkills: ['Web设计', '响应式设计', 'CSS基础', '设计规范'],
            defaultTools: ['Figma', 'Sketch', 'Photoshop', '蓝湖'],
            industry: 'tech',
          },
          {
            id: 'b-ui',
            name: 'B端UI设计师',
            keywords: ['B端设计', '后台设计', 'SaaS设计'],
            defaultResponsibilities: ['B端界面设计', '表单设计', '数据可视化', '设计规范'],
            defaultSkills: ['B端设计', '组件设计', '数据可视化', '交互设计'],
            defaultTools: ['Figma', 'Ant Design', 'Tableau', 'Axure'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'ux-design',
        name: 'UX/交互设计',
        jobs: [
          {
            id: 'ux-designer',
            name: 'UX设计师',
            keywords: ['UX', '用户体验', '交互设计'],
            defaultResponsibilities: ['用户研究', '交互设计', '原型制作', '可用性测试'],
            defaultSkills: ['用户研究', '交互设计', '信息架构', '原型设计'],
            defaultTools: ['Figma', 'Axure', 'Sketch', 'Maze'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'visual-design',
        name: '视觉设计',
        jobs: [
          {
            id: 'brand-designer',
            name: '品牌设计师',
            keywords: ['品牌设计', 'VI设计', '视觉识别'],
            defaultResponsibilities: ['品牌视觉', 'VI设计', '营销物料', '品牌规范'],
            defaultSkills: ['品牌设计', '视觉传达', '排版设计', '色彩理论'],
            defaultTools: ['Illustrator', 'Photoshop', 'InDesign', 'C4D'],
            industry: 'media',
          },
          {
            id: 'ops-designer',
            name: '视觉/运营设计师',
            keywords: ['运营设计', '视觉设计', '海报设计', 'H5设计'],
            defaultResponsibilities: ['运营物料', '活动页面', '海报设计', '动效设计'],
            defaultSkills: ['视觉设计', '排版设计', '动效设计', '创意策划'],
            defaultTools: ['Photoshop', 'Illustrator', 'After Effects', 'C4D'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'game-art',
        name: '游戏美术',
        jobs: [
          {
            id: 'game-art-director',
            name: '美术总监/游戏美术总监',
            keywords: ['美术总监', '游戏美术总监', '美术负责人', '主美', '美术VP', '美术专家'],
            defaultResponsibilities: ['美术风格把控', '美术团队管理', '美术资源审核', '美术流程制定', '跨部门协作'],
            defaultSkills: ['美术风格把控', '团队管理', '游戏美术', '审美能力', '项目管理'],
            defaultTools: ['Photoshop', 'Blender', 'Unity', 'Unreal', 'Figma'],
            industry: 'media',
          },
          {
            id: 'game-concept-artist',
            name: '游戏原画师',
            keywords: ['原画', '游戏原画', '角色原画', '场景原画', '概念设计'],
            defaultResponsibilities: ['角色原画设计', '场景概念设计', '美术资源制作', '风格探索'],
            defaultSkills: ['绘画能力', '角色设计', '场景设计', '色彩理论', '构图能力'],
            defaultTools: ['Photoshop', 'SAI', 'Procreate', 'Blender', 'ZBrush'],
            industry: 'media',
          },
          {
            id: 'game-3d-artist',
            name: '游戏3D美术',
            keywords: ['3D美术', '游戏建模', '角色建模', '场景建模', '3D角色'],
            defaultResponsibilities: ['3D角色建模', '3D场景制作', '贴图绘制', '模型优化'],
            defaultSkills: ['3D建模', '贴图绘制', '角色建模', '场景建模', 'PBR流程'],
            defaultTools: ['Maya', 'Blender', 'ZBrush', 'Substance Painter', '3ds Max'],
            industry: 'media',
          },
          {
            id: 'game-ui-artist',
            name: '游戏UI设计师',
            keywords: ['游戏UI', '游戏界面', '游戏UI设计', '游戏图标'],
            defaultResponsibilities: ['游戏界面设计', '游戏图标设计', 'UI动效', '界面优化'],
            defaultSkills: ['UI设计', '游戏UI', '图标设计', '动效设计', '游戏审美'],
            defaultTools: ['Photoshop', 'Figma', 'Illustrator', 'After Effects', 'Unity'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'design-leadership',
        name: '设计管理',
        jobs: [
          {
            id: 'design-director',
            name: '设计总监',
            keywords: ['设计总监', '设计负责人', '设计VP', '设计专家', '首席设计师'],
            defaultResponsibilities: ['设计战略制定', '设计团队管理', '设计质量把控', '设计体系建设', '跨部门协作'],
            defaultSkills: ['设计管理', '战略思维', '团队建设', '设计体系', '业务理解'],
            defaultTools: ['Figma', 'Sketch', 'Notion', 'Jira', 'Miro'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'graphic-design',
        name: '平面设计',
        jobs: [
          {
            id: 'graphic-designer',
            name: '平面设计师',
            keywords: ['平面设计', '印刷设计', '排版', '字体设计', '品牌视觉', 'VI设计'],
            defaultResponsibilities: ['品牌视觉设计', '宣传物料设计', '排版与字体设计', '印刷品设计', '图标与插图创作', '设计规范制定'],
            defaultSkills: ['平面设计原理', '品牌设计', '排版设计', '色彩理论', '印刷工艺', '创意思维'],
            defaultTools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma', '创客贴', 'Canva'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'illustration',
        name: '插画设计',
        jobs: [
          {
            id: 'illustrator',
            name: '插画设计师',
            keywords: ['插画', '商业插画', '手绘', '数字插画', '概念设计', '角色设计'],
            defaultResponsibilities: ['商业插画创作', '品牌IP形象设计', '绘本/漫画创作', '场景概念设计', '角色设计', '风格规范制定'],
            defaultSkills: ['手绘技能', '数字绘画', '色彩运用', '构图设计', '风格探索', '创意思维'],
            defaultTools: ['Procreate', 'Adobe Illustrator', 'Photoshop', 'Clip Studio Paint', '手写板', 'iPad'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'motion-design',
        name: '动效设计',
        jobs: [
          {
            id: 'motion-designer',
            name: '动效设计师',
            keywords: ['动效', 'AE动效', 'UI动效', '动画设计', 'MG动画', '交互动效'],
            defaultResponsibilities: ['UI/UX动效设计', 'MG动画制作', '品牌动态视觉设计', '产品转场动效', '视频后期制作', '动效规范制定'],
            defaultSkills: ['动效设计', 'After Effects', '动画原理', '交互设计', '视频剪辑', '音画配合'],
            defaultTools: ['After Effects', 'Lottie', 'Principle', 'Figma', 'Cinema 4D', 'Premiere Pro'],
            industry: 'media',
          },
        ],
      },
    ],
  },
  {
    id: 'operation',
    name: '运营',
    icon: 'TrendingUp',
    subCategories: [
      {
        id: 'user-ops',
        name: '用户运营',
        jobs: [
          {
            id: 'growth-ops',
            name: '增长运营',
            keywords: ['增长运营', '用户增长', '拉新', '裂变'],
            defaultResponsibilities: ['增长策略', '拉新活动', '裂变玩法', '渠道投放'],
            defaultSkills: ['增长策略', '数据分析', '活动策划', '渠道运营'],
            defaultTools: ['神策', 'GrowingIO', 'Excel', '创客贴'],
            industry: 'tech',
          },
          {
            id: 'community-ops',
            name: '社区运营',
            keywords: ['社区运营', '社群运营', '内容社区'],
            defaultResponsibilities: ['社区运营', '用户活跃', '内容运营', 'KOL维护'],
            defaultSkills: ['社区运营', '用户心理', '内容策划', '数据分析'],
            defaultTools: ['企业微信', '问卷星', 'Excel', '神策'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'content-ops',
        name: '内容运营',
        jobs: [
          {
            id: 'shortvideo-ops',
            name: '短视频运营',
            keywords: ['短视频', '抖音运营', '视频号', '快手'],
            defaultResponsibilities: ['短视频策划', '账号运营', '数据分析', '热点追踪'],
            defaultSkills: ['短视频运营', '内容策划', '数据分析', '剪辑基础'],
            defaultTools: ['剪映', '抖音创作者平台', '新抖', '飞瓜'],
            industry: 'media',
          },
          {
            id: 'live-ops',
            name: '直播运营',
            keywords: ['直播运营', '主播运营', '直播间', '带货'],
            defaultResponsibilities: ['直播策划', '主播管理', '直播数据', '活动策划'],
            defaultSkills: ['直播运营', '主播培训', '数据分析', '活动策划'],
            defaultTools: ['抖音直播', '淘宝直播', '蝉妈妈', '飞瓜'],
            industry: 'retail',
          },
        ],
      },
      {
        id: 'product-ops',
        name: '产品运营',
        jobs: [
          {
            id: 'product-ops-manager',
            name: '产品运营',
            keywords: ['产品运营', '运营策略', '商业化运营'],
            defaultResponsibilities: ['运营策略', '数据分析', '用户反馈', '产品优化'],
            defaultSkills: ['数据分析', 'SQL', '产品思维', '用户洞察'],
            defaultTools: ['SQL', 'Excel', '神策', 'Jira'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'social-media-ops',
        name: '新媒体运营',
        jobs: [
          {
            id: 'social-media-manager',
            name: '新媒体运营',
            keywords: ['新媒体', '公众号', '微博运营', '小红书', '短视频', '抖音', '视频号'],
            defaultResponsibilities: ['新媒体账号运营', '内容策划与创作', '粉丝增长与互动', '数据监测与分析', '热点借势传播', '达人/KOL合作'],
            defaultSkills: ['新媒体运营', '内容创作', '数据分析', '选题策划', '图文排版', '短视频制作'],
            defaultTools: ['公众号后台', '小红书', '抖音创作者平台', '新榜', '蝉妈妈', 'Canva/稿定设计'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'content-specialist',
        name: '内容运营专员',
        jobs: [
          {
            id: 'content-editor',
            name: '内容运营专员',
            keywords: ['内容运营', '内容编辑', '文案策划', '内容创作', '选题策划', 'UGC运营'],
            defaultResponsibilities: ['内容策划与生产', '选题规划与管理', 'UGC内容审核与运营', '内容数据分析', '内容SEO优化', '外部创作者管理'],
            defaultSkills: ['内容策划', '文案写作', '数据分析', 'SEO', '用户洞察', '内容质量把控'],
            defaultTools: ['CMS系统', 'Excel', '百度统计/GA', '石墨文档', '创作者平台', 'SQL'],
            industry: 'media',
          },
        ],
      },
      {
        id: 'event-ops',
        name: '活动运营',
        jobs: [
          {
            id: 'event-manager',
            name: '活动运营',
            keywords: ['活动运营', '线上活动', '线下活动', '活动策划', '活动执行', '用户活跃'],
            defaultResponsibilities: ['活动方案策划与执行', '活动预算管理', '线上/线下活动执行', '活动数据追踪与复盘', '合作方沟通协调', '活动效果优化'],
            defaultSkills: ['活动策划', '项目管理', '数据分析', '资源整合', '用户运营', '沟通协作'],
            defaultTools: ['Excel', '活动行/腾讯会议', 'PowerPoint', '神策/GrowingIO', '企业微信', '创客贴'],
            industry: 'retail',
          },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    name: '市场/销售',
    icon: 'Megaphone',
    subCategories: [
      {
        id: 'marketing',
        name: '市场营销',
        jobs: [
          {
            id: 'brand-marketing',
            name: '品牌市场',
            keywords: ['品牌市场', '品牌营销', '品牌传播'],
            defaultResponsibilities: ['品牌策略', '品牌传播', '公关活动', '品牌合作'],
            defaultSkills: ['品牌策划', '文案写作', '活动策划', '媒体关系'],
            defaultTools: ['PPT', 'Excel', '公众号后台', '新榜'],
            industry: 'media',
          },
          {
            id: 'performance-marketing',
            name: '效果投放',
            keywords: ['效果投放', '广告投放', '信息流', 'SEM'],
            defaultResponsibilities: ['广告投放', '效果优化', '数据分析', '素材策划'],
            defaultSkills: ['投放优化', '数据分析', '素材策划', '成本控制'],
            defaultTools: ['巨量引擎', '腾讯广告', '百度推广', '神策'],
            industry: 'tech',
          },
        ],
      },
      {
        id: 'sales',
        name: '销售',
        jobs: [
          {
            id: 'sales-rep',
            name: '销售代表',
            keywords: ['销售代表', '销售', '业务员', '客户经理', '销售专员', '客户代表', '销售助理'],
            defaultResponsibilities: ['客户开发与维护', '产品销售与推广', '销售目标达成', '客户需求分析', '商务谈判', '销售合同签订'],
            defaultSkills: ['销售技巧', '客户沟通', '商务谈判', '市场洞察', '目标管理', '关系维护'],
            defaultTools: ['CRM系统', '企业微信', 'Excel', 'PPT', '钉钉', '电话'],
            industry: 'retail',
          },
          {
            id: 'sales-manager',
            name: '销售经理',
            keywords: ['销售经理', '区域经理', '销售主管', '区域主管', '城市经理', '业务主管', '销售组长'],
            defaultResponsibilities: ['制定销售计划与策略', '团队管理与激励', '销售目标分解与达成', '客户资源管理', '市场分析与开拓', '销售数据分析'],
            defaultSkills: ['团队管理', '销售策略', '数据分析', '商务谈判', '目标管理', '市场分析'],
            defaultTools: ['CRM系统', 'Excel', 'PPT', 'Salesforce', '企业微信', 'BI工具'],
            industry: 'retail',
          },
          {
            id: 'sales-director',
            name: '销售总监',
            keywords: ['销售总监', '区域销售总监', '销售负责人', '销售VP', '全国销售总监', '大区总监', '销售总经理'],
            defaultResponsibilities: ['制定全国/区域销售战略', '销售体系搭建与管理', '大客户关系维护', '销售团队建设', '销售预算管理', '跨部门协调'],
            defaultSkills: ['战略规划', '团队建设', '商务谈判', '行业洞察', '数据分析', '领导力'],
            defaultTools: ['CRM系统', 'ERP', 'BI工具', 'PPT', 'Excel', 'Salesforce'],
            industry: 'retail',
          },
          {
            id: 'key-account-manager',
            name: '大客户经理/KAM',
            keywords: ['大客户经理', 'KAM', 'KA经理', '大客户销售', '重点客户经理', '大客户总监'],
            defaultResponsibilities: ['大客户开发与维护', '大客户需求分析', '定制化解决方案', '大客户关系管理', '跨部门资源协调', '大客户项目推进'],
            defaultSkills: ['客户关系管理', '商务谈判', '解决方案设计', '项目管理', '行业洞察', '沟通能力'],
            defaultTools: ['CRM系统', 'Salesforce', 'PPT', 'Excel', '企业微信', '合同管理系统'],
            industry: 'consulting',
          },
          {
            id: 'bd',
            name: '商务拓展/BD',
            keywords: ['BD', '商务拓展', '商务合作', '渠道拓展'],
            defaultResponsibilities: ['商务拓展', '客户开发', '合作谈判', '关系维护'],
            defaultSkills: ['商务谈判', '客户开发', '关系维护', '行业洞察'],
            defaultTools: ['企业微信', 'CRM', 'PPT', 'Excel'],
            industry: 'consulting',
          },
          {
            id: 'csm',
            name: '客户成功/CSM',
            keywords: ['客户成功', 'CSM', '客户运营', '大客户'],
            defaultResponsibilities: ['客户成功', '客户维护', '续费增购', '问题解决'],
            defaultSkills: ['客户沟通', '项目管理', '问题解决', '产品理解'],
            defaultTools: ['Salesforce', 'HubSpot', '企业微信', 'Jira'],
            industry: 'consulting',
          },
        ],
      },
    ],
  },
  {
    id: 'hr',
    name: '人力资源',
    icon: 'Users',
    subCategories: [
      {
        id: 'recruitment',
        name: '招聘',
        jobs: [
          {
            id: 'recruiter',
            name: '招聘专员',
            keywords: ['招聘专员', '招聘助理', '招聘', '人才招聘', '简历筛选'],
            defaultResponsibilities: ['简历筛选', '面试安排', '人才搜寻', 'offer谈判'],
            defaultSkills: ['招聘技巧', '面试技巧', '人才评估', '沟通协调'],
            defaultTools: ['BOSS直聘', '智联招聘', '猎聘', 'Excel'],
            industry: 'consulting',
          },
          {
            id: 'headhunter',
            name: '猎头顾问',
            keywords: ['猎头', '高管招聘', '人才寻访'],
            defaultResponsibilities: ['人才寻访', '客户开发', '面试评估', '入职跟进'],
            defaultSkills: ['人才搜寻', '商务谈判', '行业洞察', '关系维护'],
            defaultTools: ['LinkedIn', '猎聘', 'BOSS直聘', 'CRM'],
            industry: 'consulting',
          },
        ],
      },
      {
        id: 'hrbp',
        name: 'HRBP',
        jobs: [
          {
            id: 'hrbp-role',
            name: 'HRBP',
            keywords: ['HRBP', '业务伙伴', '人力资源业务伙伴'],
            defaultResponsibilities: ['业务支持', '人才发展', '组织诊断', '文化建设'],
            defaultSkills: ['业务理解', '组织发展', '人才发展', '沟通协调'],
            defaultTools: ['Workday', '北森', '飞书', 'Excel'],
            industry: 'consulting',
          },
        ],
      },
      {
        id: 'hr-ops',
        name: '薪酬/培训/员工关系',
        jobs: [
          {
            id: 'compensation',
            name: '薪酬绩效专员',
            keywords: ['薪酬', '绩效', 'C&B', '薪资核算'],
            defaultResponsibilities: ['薪酬核算', '绩效管理', '社保公积金', '薪酬分析'],
            defaultSkills: ['薪酬设计', 'Excel', '劳动法', '数据分析'],
            defaultTools: ['Excel', 'SAP', 'Workday', '金蝶'],
            industry: 'consulting',
          },
          {
            id: 'training',
            name: '培训专员',
            keywords: ['培训', '人才发展', 'TD', '学习发展'],
            defaultResponsibilities: ['培训计划', '课程开发', '培训实施', '效果评估'],
            defaultSkills: ['培训设计', '课程开发', '演讲呈现', '项目管理'],
            defaultTools: ['PPT', '企业微信', '腾讯会议', '问卷星'],
            industry: 'education',
          },
          {
            id: 'er',
            name: '员工关系专员',
            keywords: ['员工关系', 'ER', '企业文化', '员工活动'],
            defaultResponsibilities: ['员工关系', '企业文化', '员工活动', '劳动纠纷'],
            defaultSkills: ['沟通协调', '劳动法', '活动策划', '问题解决'],
            defaultTools: ['企业微信', 'Excel', '飞书', '金蝶'],
            industry: 'consulting',
          },
        ],
      },
      {
        id: 'hr-leadership',
        name: 'HR管理岗',
        jobs: [
          {
            id: 'hrd',
            name: 'HRD/人力资源总监',
            keywords: ['HRD', '人力资源总监', 'HR负责人', '人力负责人', '人事总监', 'CHRO', 'HRVP', 'HR head', '人力资源 head'],
            defaultResponsibilities: ['人力资源战略规划', '组织发展与变革', '高管人才管理', '企业文化建设', 'HR团队管理'],
            defaultSkills: ['战略思维', '组织发展', '人才管理', '领导力', '业务理解', '变革管理'],
            defaultTools: ['Workday', 'SAP', '北森', '飞书', 'Power BI'],
            industry: 'consulting',
          },
          {
            id: 'hr-manager',
            name: 'HR经理/人力资源经理',
            keywords: ['HR经理', '人力资源经理', '人事经理', 'HR主管', '人力主管'],
            defaultResponsibilities: ['HR模块管理', '团队管理', '制度建设', '跨部门协作', '项目推进'],
            defaultSkills: ['团队管理', '制度建设', '项目管理', '沟通协调', '问题解决'],
            defaultTools: ['Excel', 'Workday', '北森', '飞书', '钉钉'],
            industry: 'consulting',
          },
        ],
      },
    ],
  },
  {
    id: 'finance',
    name: '财务/会计',
    icon: 'Calculator',
    subCategories: [
      {
        id: 'accounting',
        name: '会计',
        jobs: [
          {
            id: 'general-accountant',
            name: '总账会计',
            keywords: ['会计', '总账', '财务核算'],
            defaultResponsibilities: ['账务处理', '报表编制', '税务申报', '财务分析'],
            defaultSkills: ['会计准则', '税务知识', 'Excel', '财务软件'],
            defaultTools: ['金蝶', '用友', 'Excel', '税控系统'],
            industry: 'finance',
          },
          {
            id: 'ap-ar',
            name: '应收/应付会计',
            keywords: ['应收', '应付', 'AP', 'AR'],
            defaultResponsibilities: ['应收应付管理', '对账', '发票管理', '付款审核'],
            defaultSkills: ['会计基础', 'Excel', '对账技巧', '沟通协调'],
            defaultTools: ['金蝶', '用友', 'Excel', '网银系统'],
            industry: 'finance',
          },
        ],
      },
      {
        id: 'financial-analysis',
        name: '财务分析',
        jobs: [
          {
            id: 'fpanda',
            name: '财务分析/FP&A',
            keywords: ['财务分析', 'FP&A', '预算', '财务BP'],
            defaultResponsibilities: ['财务分析', '预算管理', '经营分析', '报表编制'],
            defaultSkills: ['财务分析', 'Excel', 'SQL', '商业洞察'],
            defaultTools: ['Excel', 'Power BI', 'Tableau', 'SAP'],
            industry: 'finance',
          },
        ],
      },
    ],
  },
  {
    id: 'others',
    name: '其他',
    icon: 'Briefcase',
    subCategories: [
      {
        id: 'education',
        name: '教育',
        jobs: [
          {
            id: 'teacher-k12',
            name: 'K12教师',
            keywords: ['教师', 'K12', '中小学老师'],
            defaultResponsibilities: ['课程教学', '作业批改', '学生管理', '家长沟通'],
            defaultSkills: ['学科知识', '教学能力', '学生心理', '沟通表达'],
            defaultTools: ['PPT', '钉钉', '企业微信', '在线教学平台'],
            industry: 'education',
          },
          {
            id: 'trainer',
            name: '企业培训师',
            keywords: ['培训师', '讲师', '企业内训'],
            defaultResponsibilities: ['课程讲授', '培训设计', '效果评估', '课程开发'],
            defaultSkills: ['演讲表达', '课程设计', '互动技巧', '业务理解'],
            defaultTools: ['PPT', '腾讯会议', 'Zoom', '问卷星'],
            industry: 'education',
          },
        ],
      },
      {
        id: 'healthcare',
        name: '医疗',
        jobs: [
          {
            id: 'doctor',
            name: '医生',
            keywords: ['医生', '医师', '临床医生'],
            defaultResponsibilities: ['疾病诊断', '治疗方案', '病历书写', '患者沟通'],
            defaultSkills: ['医学知识', '临床技能', '诊断能力', '医患沟通'],
            defaultTools: ['HIS系统', 'PACS系统', '电子病历', '医学文献'],
            industry: 'healthcare',
          },
          {
            id: 'nurse',
            name: '护士',
            keywords: ['护士', '护理', '护师'],
            defaultResponsibilities: ['护理操作', '病情观察', '医嘱执行', '患者护理'],
            defaultSkills: ['护理技能', '病情观察', '急救技能', '沟通技巧'],
            defaultTools: ['护理系统', '监护设备', '输液泵', '电子病历'],
            industry: 'healthcare',
          },
        ],
      },
      {
        id: 'legal',
        name: '法律',
        jobs: [
          {
            id: 'lawyer',
            name: '律师',
            keywords: ['律师', '法务', '法律顾问'],
            defaultResponsibilities: ['法律咨询', '合同审查', '诉讼代理', '法律研究'],
            defaultSkills: ['法律知识', '逻辑思维', '文书写作', '谈判技巧'],
            defaultTools: ['法律数据库', 'Alpha', 'Word', 'Excel'],
            industry: 'consulting',
          },
        ],
      },
      {
        id: 'consulting',
        name: '咨询',
        jobs: [
          {
            id: 'consultant',
            name: '管理咨询顾问',
            keywords: ['咨询顾问', '管理咨询', '战略咨询'],
            defaultResponsibilities: ['客户访谈', '方案设计', '报告撰写', '项目交付'],
            defaultSkills: ['分析能力', '逻辑思维', 'PPT制作', '沟通表达'],
            defaultTools: ['PPT', 'Excel', 'Word', 'SPSS'],
            industry: 'consulting',
          },
        ],
      },
    ],
  },
];

// 根据岗位ID获取岗位信息
export function getJobById(jobId: string): JobItem | undefined {
  for (const category of JOB_CATEGORIES) {
    for (const subCategory of category.subCategories) {
      const job = subCategory.jobs.find(j => j.id === jobId);
      if (job) return job;
    }
  }
  return undefined;
}

// 根据关键词匹配岗位
export function matchJobByKeywords(text: string): JobItem | undefined {
  const lowerText = text.toLowerCase();
  
  for (const category of JOB_CATEGORIES) {
    for (const subCategory of category.subCategories) {
      for (const job of subCategory.jobs) {
        // 检查岗位名称匹配
        if (lowerText.includes(job.name.toLowerCase())) {
          return job;
        }
        // 检查关键词匹配
        for (const keyword of job.keywords) {
          if (lowerText.includes(keyword.toLowerCase())) {
            return job;
          }
        }
      }
    }
  }
  
  return undefined;
}

// 经验年限选项
export const EXPERIENCE_OPTIONS = [
  { value: 'entry', label: '应届生 / 0-2年', multiplier: 1.3 },
  { value: 'junior', label: '2-5年', multiplier: 1.1 },
  { value: 'mid', label: '5-10年', multiplier: 0.9 },
  { value: 'senior', label: '10年以上', multiplier: 0.7 },
];

// 技能标签选项
export const SKILL_TAGS = [
  // 技术类
  '编程开发', '数据分析', '系统设计', '算法模型',
  // 产品类
  '需求分析', '用户研究', '产品设计', '项目管理',
  // 设计类
  'UI设计', '视觉设计', '交互设计', '品牌设计',
  // 运营类
  '内容运营', '用户增长', '活动策划', '社群运营',
  // 市场类
  '品牌营销', '广告投放', '商务拓展', '渠道管理',
  // 通用类
  '文档写作', '数据分析', '演讲汇报', '跨部门协作',
  '客户沟通', '团队管理', '问题解决', '创新思维',
];

// 工具标签选项
export const TOOL_TAGS = [
  // AI工具
  'ChatGPT', 'Claude', 'Copilot', 'Midjourney',
  // 办公工具
  'Office', 'Excel', 'PPT', '飞书', '钉钉',
  // 设计工具
  'Figma', 'Sketch', 'Photoshop', 'Axure',
  // 开发工具
  'VS Code', 'Git', 'Jira', 'Postman',
  // 数据工具
  'SQL', 'Python', 'Tableau', '神策数据',
];
