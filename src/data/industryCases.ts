// 行业实践案例库 - 用于生成详细的解读和建议

export interface IndustryCase {
  industry: string;
  title: string;
  description: string;
  examples: string[];
  trends: string[];
}

export interface RoleModel {
  name: string;
  title: string;
  company: string;
  avatar?: string;
  story: string;
  keyPoints: string[];
  learnable: string[];
  industry: string;
  roleType: string;
  level?: 'junior' | 'mid' | 'senior' | 'expert';
}

// 行业实践案例
export const INDUSTRY_CASES: Record<string, IndustryCase> = {
  tech: {
    industry: 'tech',
    title: '科技与互联网',
    description: '科技行业是AI应用最深入的领域，从代码生成到自动化测试，AI已成为开发者的标配工具。',
    examples: [
      'GitHub Copilot 已帮助超过100万开发者提升编码效率，平均减少30%的编码时间',
      'OpenAI 的 GPT-4 在多个编程竞赛中达到前10%水平',
      '国内大厂如字节、阿里已将AI编程助手普及到全员',
      '测试工程师使用AI自动生成测试用例，效率提升50%以上',
    ],
    trends: [
      '低代码/无代码平台快速发展，基础开发岗位需求下降',
      'AI原生应用开发成为新热点，提示词工程师需求激增',
      'DevOps与AI结合，实现更智能的运维自动化',
      '技术文档和技术支持岗位大量采用AI客服和文档生成',
    ],
  },
  finance: {
    industry: 'finance',
    title: '金融与保险',
    description: '金融行业利用AI进行风险评估、量化交易、智能客服等，但合规和风控要求限制了全面渗透。',
    examples: [
      '招商银行智能客服"小招"日均处理咨询量超过人工客服的3倍',
      '量化交易公司使用AI算法，交易决策速度提升至毫秒级',
      '保险理赔审核中，AI图像识别技术使车险定损效率提升70%',
      '蚂蚁集团的风控系统使用AI实时识别欺诈交易，准确率达99.9%',
    ],
    trends: [
      '智能投顾服务快速增长，传统理财顾问面临转型压力',
      '反欺诈和风控领域AI应用成熟，相关岗位技能要求提升',
      '合规报告生成自动化，金融分析师需转向更高阶分析',
      '区块链技术结合AI，催生新的金融科技岗位',
    ],
  },
  media: {
    industry: 'media',
    title: '传媒与内容',
    description: '内容创作是AI冲击最直接的领域，从文案写作到视频制作，AI工具已大规模普及。',
    examples: [
      '某头部自媒体使用AI辅助写作，日更文章从3篇提升到10篇',
      '抖音、快手等平台大量使用AI生成短视频脚本和配音',
      'Midjourney、Stable Diffusion 已改变设计行业工作流',
      '新闻机构使用AI生成财经快讯和体育赛事报道',
    ],
    trends: [
      '基础文案、编辑岗位需求锐减，内容策划和创意岗位价值凸显',
      'AI生成内容审核成为新兴岗位，需要人工+AI协同',
      '个性化内容推荐算法优化，数据分析师需求增加',
      '虚拟主播和AI数字人技术成熟，传统主播面临竞争',
    ],
  },
  consulting: {
    industry: 'consulting',
    title: '咨询与专业服务',
    description: '咨询行业利用AI进行数据分析和报告生成，但高价值的战略咨询仍依赖人类专家。',
    examples: [
      '麦肯锡使用AI工具快速分析行业报告，研究效率提升40%',
      '四大会计师事务所使用AI审计工具，基础审计工作自动化率达60%',
      '法律咨询公司使用AI合同审查，审查时间从数小时缩短到数分钟',
      '人力资源咨询公司使用AI进行简历筛选和人才匹配',
    ],
    trends: [
      '基础研究和数据分析工作被AI替代，咨询师需提升战略思维',
      '行业专家+AI工具成为新工作模式，效率大幅提升',
      '客户更关注AI无法提供的洞察和创意思维',
      '咨询报告生成自动化，咨询师转向客户关系和高阶分析',
    ],
  },
  education: {
    industry: 'education',
    title: '教育培训',
    description: '教育行业AI应用集中在个性化学习和内容生成，但师生互动和情感支持仍需人类教师。',
    examples: [
      '猿辅导、作业帮等使用AI批改作业，批改效率提升10倍',
      'AI口语陪练产品如流利说，已服务超过5000万用户',
      '高校使用AI生成教学大纲和测验题目',
      'Khan Academy 使用AI导师为学生提供个性化辅导',
    ],
    trends: [
      '标准化教学内容生成自动化，教师转向个性化辅导',
      'AI助教普及，教师可专注于高价值的师生互动',
      '终身学习需求增长，成人教育和职业培训市场扩大',
      '情感教育和软技能培养成为教师核心竞争力',
    ],
  },
  healthcare: {
    industry: 'healthcare',
    title: '医疗健康',
    description: '医疗行业AI应用以辅助诊断和影像分析为主，但诊疗决策和患者关怀仍需医生主导。',
    examples: [
      '阿里健康AI辅助肺结节检测，准确率达95%以上',
      '腾讯觅影已辅助诊断超过1000万例眼底病变',
      '智能导诊系统在医院普及，分流30%以上的基础咨询',
      'AI药物研发加速新药上市，研发周期从10年缩短到5年',
    ],
    trends: [
      '影像科医生工作模式改变，AI辅助诊断成为标配',
      '慢病管理和健康咨询AI化，护士和健康管理师角色转变',
      '精准医疗和个性化治疗方案需求增长',
      '医患沟通和人文关怀成为医疗工作者核心能力',
    ],
  },
  retail: {
    industry: 'retail',
    title: '零售与电商',
    description: '零售行业AI应用覆盖智能推荐、库存管理、客服等全链条，运营效率大幅提升。',
    examples: [
      '淘宝、京东使用AI推荐算法，个性化推荐贡献超过30%的销售额',
      '智能客服机器人处理超过80%的常见咨询',
      'AI预测库存需求，某大型零售商库存周转率提升25%',
      '无人便利店和智能货架技术逐步成熟',
    ],
    trends: [
      '基础客服和运营岗位被AI替代，客户体验管理岗位价值提升',
      '数据驱动的精细化运营成为核心竞争力',
      '线上线下融合加速，全渠道运营人才需求增长',
      '直播电商和社交电商兴起，内容运营能力重要',
    ],
  },
  manufacturing: {
    industry: 'manufacturing',
    title: '制造业',
    description: '制造业AI应用集中在质量检测、预测性维护和供应链优化，但核心工艺仍依赖人工经验。',
    examples: [
      '富士康使用AI视觉检测，缺陷检测准确率提升至99.5%',
      '某汽车厂使用AI预测设备故障，停机时间减少40%',
      '智能排产系统使生产效率提升15-20%',
      '工业机器人+AI视觉实现柔性生产线',
    ],
    trends: [
      '基础质检岗位被AI视觉替代，质检员转向复杂问题处理',
      '设备维护从被动维修转向预测性维护',
      '智能制造工程师成为热门岗位，需懂工艺+懂数据',
      '个性化定制生产需求增长，柔性制造能力重要',
    ],
  },
  government: {
    industry: 'government',
    title: '政府与公共事业',
    description: '政府领域AI应用相对保守，主要集中在政务服务智能化和数据分析。',
    examples: [
      '"一网通办"平台使用AI客服解答市民咨询',
      '智慧城市系统使用AI分析交通流量，优化信号灯配时',
      'AI辅助公文写作和文件归档，提升行政效率',
      '智能审批系统使企业开办时间从20天缩短到3天',
    ],
    trends: [
      '政务服务智能化，窗口岗位需求减少',
      '数据分析和政策研究岗位需求增加',
      '网络安全和AI伦理监管成为重要议题',
      '公共服务个性化和精准化需求增长',
    ],
  },
  other: {
    industry: 'other',
    title: '其他行业',
    description: '各行业都在探索AI应用，但渗透程度和应用场景差异较大。',
    examples: [
      '农业使用AI进行病虫害识别和产量预测',
      '物流行业使用AI优化配送路线，成本降低15%',
      '建筑行业使用AI进行设计优化和安全监测',
      '能源行业使用AI预测设备故障和优化能耗',
    ],
    trends: [
      '各行业都在寻找AI应用场景，跨界人才需求增长',
      '传统行业数字化转型加速，复合型人才稀缺',
      'AI+行业know-how成为核心竞争力',
      '中小企业AI应用门槛降低，SaaS化AI工具普及',
    ],
  },
};

// 标杆人物库 - 基于真实案例改编，按职级分层
export const ROLE_MODELS: RoleModel[] = [
  // ========== 基层员工（1-3年）- 同龄人可复制的转型 ==========
  {
    name: '辣条（George）',
    title: '独立开发者',
    company: '个人开发者/w2solo社区',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=george',
    story: '资深程序员转型独立开发，专注技术产品出海。他每天深扒一个海外AI产品，分析其成功要素并输出拆解报告。通过持续的内容输出和产品实践，在独立开发者圈子里建立了影响力，实现了稳定收入。',
    keyPoints: ['用内容输出建立个人品牌', '深度分析比浅尝辄止更有价值', '持续积累比一夜爆红更可靠'],
    learnable: ['每天研究一个成功案例', '养成输出习惯，建立专业影响力', '从分析他人到实践自己的产品'],
    industry: 'tech',
    roleType: 'technical',
    level: 'junior',
  },
  {
    name: 'Viking',
    title: '全栈工程师',
    company: '自由职业/上海',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viking',
    story: '上海全栈工程师，35岁被裁员后开启自由职业。他公开分享独立开发收入，开发「简单简历」等产品并尝试出海。他说：被裁不是终点，而是重新审视自己价值的起点。',
    keyPoints: ['透明分享收入，建立信任', '做解决真实痛点的产品', '自由职业需要自律和规划'],
    learnable: ['选择有市场需求的产品方向', '学会营销和推广自己的产品', '建立稳定的客户或收入来源'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: 'Guyskk',
    title: '独立开发者',
    company: '蚁阅开发者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guyskk',
    story: '独立开发RSS阅读器「蚁阅」，经历从产品构思到上线的全过程。他坚持非社交、无广告的产品理念，在小众市场里找到了自己的位置。他说：不一定要做大而全，小而美也能活得很好。',
    keyPoints: ['找到差异化定位', '坚持产品理念', '小众市场也有机会'],
    learnable: ['从自己的需求出发找产品方向', '坚持长期主义，不追求短期爆发', '在社区里找到早期用户'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  
  // ========== 骨干员工（3-5年）- 进阶路径 ==========
  {
    name: '老杰（oldj）',
    title: '独立开发者/前阿里',
    company: '自由职业',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=oldj',
    story: '前阿里员工，现独立开发者。开发SwitchHosts、妙笔等多款开源及独立产品，同时从事文学创作。他说：大厂经历给了我技术底气，独立开发让我找回创造的乐趣。',
    keyPoints: ['大厂经验是独立开发的底气', '开源是建立影响力的好方式', '技术+内容创作双轮驱动'],
    learnable: ['利用大厂积累的技术和品牌', '通过开源项目建立影响力', '探索技术之外的表达方式'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: '林婷',
    title: '自媒体创作者',
    company: '小红书/原外企白领',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linting',
    story: '35岁被外企裁员后，没有急于找下一份工作，而是开始在小红书分享自己的职场经验和转型思考。她说：35岁不是职场终点，而是重新认识自己价值的起点。',
    keyPoints: ['把转型经历变成内容资产', '35岁危机可以变成35岁机遇', '分享真实经历比包装人设更有价值'],
    learnable: ['记录转型过程中的思考', '在社交平台建立个人品牌', '把经验转化为可变现的内容'],
    industry: 'media',
    roleType: 'operations',
    level: 'mid',
  },
  {
    name: '刘斌',
    title: '馒头店老板/原字节程序员',
    company: '自主创业',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liubin',
    story: '33岁从字节跳动离职，没有继续找程序员工作，而是选择开馒头店。他说：写代码和做馒头都需要专注和耐心，我只是换了一种方式创造价值。',
    keyPoints: ['转型不一定是升级，也可以是转向', '技术思维可以迁移到任何行业', '找到适合自己的节奏比追逐高薪更重要'],
    learnable: ['把技术思维应用到实体创业', '降低预期，从小生意做起', '接受转型初期的收入落差'],
    industry: 'other',
    roleType: 'technical',
    level: 'mid',
  },
  
  // ========== 管理层（5年+）- 战略视角 ==========
  {
    name: '云舒',
    title: '产品经理',
    company: '即刻用户/AI探索者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yunshu',
    story: '即刻平台知名用户，用Cursor等AI工具处理数据解析和Demo验证。他说：AI不是替代产品经理，而是让产品经理能更快验证想法。以前需要工程师配合的Demo，现在我自己就能做出来。',
    keyPoints: ['AI让产品经理从「提需求」到「做Demo」', '快速验证比完美规划更重要', '懂技术的产品经理更有竞争力'],
    learnable: ['学会使用AI编程工具', '自己动手做原型验证', '保持对新工具的敏感度'],
    industry: 'tech',
    roleType: 'product',
    level: 'senior',
  },
  {
    name: '什么值得买设计团队',
    title: 'AI设计实践者',
    company: '什么值得买',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smzdm',
    story: '什么值得买设计团队使用Midjourney做频道设计，是国内较早大规模应用AI设计工具的电商团队。他们说：AI不会取代设计师，但会用AI的设计师会取代不会用的。',
    keyPoints: ['团队层面推动AI工具应用', 'AI负责初稿，人负责把关', '设计效率提升的同时保持品质'],
    learnable: ['在团队中推广AI工具使用', '建立AI产出的人工审核机制', '用AI释放设计师的创造力'],
    industry: 'retail',
    roleType: 'creative',
    level: 'senior',
  },
  
  // ========== HR 岗位案例 ==========
  {
    name: '李敏',
    title: 'HRBP',
    company: '某互联网公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=limin',
    story: '从传统HR转型HRBP，用AI工具处理简历筛选和面试初筛，把节省下来的时间投入到组织发展和人才盘点。她说：AI帮我做了70%的事务性工作，让我有时间做真正有价值的战略HR工作。',
    keyPoints: ['用AI处理事务性工作', '从事务型HR转向战略型HR', '懂业务才是HR的核心竞争力'],
    learnable: ['用AI做简历筛选和初步面试', '学习组织发展和人才盘点', '深入了解业务部门的实际需求'],
    industry: 'tech',
    roleType: 'hr',
    level: 'mid',
  },
  {
    name: '王芳',
    title: '招聘经理',
    company: '某科技公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang',
    story: '引入AI面试系统后，她没被淘汰反而升职了。她把AI筛选出的优质候选人做深度面试，同时用AI分析面试数据优化招聘流程。她说：AI是工具，最终做决策的还是人。',
    keyPoints: ['AI筛选+人工深度面试', '用数据优化招聘流程', '从执行者升级为流程设计者'],
    learnable: ['学会使用AI招聘工具', '用数据分析优化招聘效果', '提升面试评估的专业度'],
    industry: 'tech',
    roleType: 'hr',
    level: 'senior',
  },

  // ========== 销售岗位案例 ==========
  {
    name: '张伟',
    title: '销售总监',
    company: '某B2B公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei',
    story: '用AI分析客户数据、预测成交概率、生成跟进话术。他说：以前靠感觉，现在靠数据。AI告诉我这个客户最近在看竞品，我针对性地准备了方案，成交率涨了30%。',
    keyPoints: ['用AI做客户洞察', '从"广撒网"到"精准打击"', '销售也要懂数据分析'],
    learnable: ['用AI分析客户行为数据', '学习数据驱动的销售方法', '建立个人客户洞察模型'],
    industry: 'tech',
    roleType: 'sales',
    level: 'senior',
  },
  {
    name: '陈明',
    title: '客户经理',
    company: '某金融科技公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenming',
    story: '用AI生成个性化的客户沟通方案，针对不同客户类型准备不同的话术。他说：AI帮我节省了写方案的时间，让我有更多时间陪客户、建立关系。',
    keyPoints: ['AI生成个性化方案', '把时间花在客户关系上', '销售的核心是信任'],
    learnable: ['用AI快速生成客户方案', '提升客户沟通和关系维护能力', '学会用数据管理客户'],
    industry: 'finance',
    roleType: 'sales',
    level: 'mid',
  },

  // ========== 财务岗位案例 ==========
  {
    name: '赵雪',
    title: '财务经理',
    company: '某制造企业',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoxue',
    story: '50岁，干了25年财务。去年学会用AI做报表分析，现在每月给老板的经营分析报告，AI处理数据，她负责解读和提建议。她说：数字是AI算的，但决策是人做的。',
    keyPoints: ['经验+AI=不可替代', '从"做表"升级为"给建议"', '年龄不是障碍，心态才是'],
    learnable: ['用AI处理财务数据', '学习财务分析和商业洞察', '培养战略思维能力'],
    industry: 'manufacturing',
    roleType: 'finance',
    level: 'senior',
  },
  {
    name: '孙丽',
    title: '会计',
    company: '某电商公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunli',
    story: '用AI做凭证录入和报表生成，把节省的时间用来学习财务分析和税务筹划。她说：基础会计工作会被AI替代，但懂业务的财务分析师不会。',
    keyPoints: ['用AI处理重复性工作', '从记账转向分析', '懂业务才能提供价值'],
    learnable: ['用AI做凭证和报表', '学习财务分析和预算管理', '了解公司业务模式'],
    industry: 'retail',
    roleType: 'finance',
    level: 'junior',
  },

  // ========== 市场岗位案例 ==========
  {
    name: '周婷',
    title: '市场总监',
    company: '某新消费品牌',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhouting',
    story: '用AI做竞品分析、生成营销文案、优化投放策略。她说：以前写10条文案选1条，现在AI写100条我选最好的。效率提升了，但判断什么是「好」的能力更重要了。',
    keyPoints: ['AI负责数量，人负责质量', '培养审美和判断力', '从执行升级为策略'],
    learnable: ['用AI批量生成营销内容', '提升数据分析和策略能力', '建立品牌敏感度'],
    industry: 'retail',
    roleType: 'marketing',
    level: 'senior',
  },
  {
    name: '吴磊',
    title: '品牌经理',
    company: '某互联网公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wulei',
    story: '用AI监测品牌声量、分析用户反馈、生成传播方案。他说：AI帮我看到了以前看不到的数据，但品牌调性和创意方向还得人来做决策。',
    keyPoints: ['用AI监测和分析数据', '人负责品牌调性和创意', '数据+创意才能做好市场'],
    learnable: ['学会使用AI数据分析工具', '提升品牌策略能力', '保持对用户的敏感度'],
    industry: 'tech',
    roleType: 'marketing',
    level: 'mid',
  },

  // ========== 设计师岗位案例 ==========
  {
    name: '郑欣',
    title: 'UI设计师',
    company: '某金融科技公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhengxin',
    story: 'Midjourney刚出的时候焦虑到失眠，怕被淘汰。后来想通了：AI出图快但不懂业务，我的价值是理解用户需求、设计体验流程。现在她用AI做初稿，自己专注交互和视觉策略。',
    keyPoints: ['AI是工具，不是对手', '从"画图"升级为"设计体验"', '把AI产出转化为商业价值'],
    learnable: ['用AI快速出概念图', '深耕用户体验设计', '学习设计系统和组件化'],
    industry: 'finance',
    roleType: 'creative',
    level: 'mid',
  },
  {
    name: '林小雨',
    title: '视觉设计师',
    company: '某广告公司',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linxiaoyu',
    story: '用AI做海报初稿和素材生成，把节省的时间用来研究品牌策略和视觉趋势。她说：AI让我从「美工」变成了「设计师」，有时间思考而不是只执行。',
    keyPoints: ['AI做初稿，人做精修', '从执行升级为设计策略', '审美和判断力是核心竞争力'],
    learnable: ['用AI加速设计初稿', '提升品牌策略能力', '保持对设计趋势的敏感度'],
    industry: 'media',
    roleType: 'creative',
    level: 'junior',
  },

  // ========== 小宇宙播客真实案例 ==========
  {
    name: '婧言（Sassie）',
    title: '纹眉师/纹唇师',
    company: '自由职业/前互联网大厂财务',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jingyan',
    story: '5年美术生出身，前互联网大厂财务。因生病手术期间仍需处理工作消息，意识到打工的局限，裸辞转型。凭借美术功底降维打击纹眉行业，主打中高端客群，不到两年实现年入百万。她说：转型不是寻找100分天选职业，而是将55分的选择逐步培养为75分的事业。',
    keyPoints: ['用过往优势降维打击新行业', '从55分开始打磨，逐步培养为75分事业', '用价格档位筛选目标客户'],
    learnable: ['梳理过往被认可的经历，明确自身优势', '选择执行难度较低的选项进行尝试', '通过线下社群活动积极获客'],
    industry: 'other',
    roleType: 'creative',
    level: 'mid',
  },
  {
    name: '徐文浩',
    title: 'AI创业公司联合创始人',
    company: '某AI创业公司/前拼多多早期员工',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xuwenhao',
    story: '连续创业者，拼多多早期员工，曾担任MediaV算法和数据负责人。创办过海外客服聊天机器人公司BotHub.AI和社交电商平台Bukito（均未成功）。2023年再次下场创业，面向全球市场开发AI应用。他说：不要把自己当牛马，因为现在有机器牛马。真正值钱的只有客户的真实问题和你的渠道。',
    keyPoints: ['把AI视为免费劳动力，用老板心态调度AI', '核心价值转向定义问题、争取预算', '从被动响应转为主动捕猎线索'],
    learnable: ['每天与AI深度对话解决实际问题', '把能在电脑上完成的任务交给AI', '培养操作AI完成任务的核心竞争力'],
    industry: 'tech',
    roleType: 'technical',
    level: 'senior',
  },
  {
    name: '任鑫',
    title: '云九资本合伙人',
    company: '云九资本/连续创业者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=renxin',
    story: '连续创业者，曾创立"今夜酒店特价"App（后被京东并购），参与内部创业"京东到家"。2015年再次创业Get（对话式AI助理方向），2021年出售公司。2023年重回AI领域，投资和孵化面向全球市场的AI应用。他说：AI转型的关键是从"为用户的任务/目标赋能"的角度思考，而非简单地在现有产品上"添加AI功能"。',
    keyPoints: ['从用户任务角度思考，而非简单添加AI功能', 'AI应用三步法：拆解-重塑-颠覆', '做增量市场，解决人类不愿意做的问题'],
    learnable: ['拆解用户旅程找痛点', '用AI重新设计流程', '发挥AI超能力颠覆传统'],
    industry: 'tech',
    roleType: 'management',
    level: 'expert',
  },
  {
    name: '蝴蝶',
    title: '心理咨询师/播客主播',
    company: '《身体由我》主播',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hudie',
    story: '从0开始做小红书，万粉账号变现100万。她说：职业转型=直接站在新身份里，无法逃避的苦都是机缘。想做的不敢试、能做的不喜欢，是转型期的常见困境。关键是回溯个人成功经历，分析自己如何把事情做成，利用负面体验反向标记兴趣方向。',
    keyPoints: ['直接站在新身份里开始行动', '利用负面体验反向标记兴趣方向', '金钱是最强烈的正反馈'],
    learnable: ['通过三个自测问题判断转型成功率', '精准定位+清晰标签，避免泛化陷阱', '证书≠技能≠变现能力'],
    industry: 'education',
    roleType: 'educator',
    level: 'mid',
  },
  {
    name: '姜Hazel',
    title: '人生教练LifeCoach',
    company: '《身体由我》主播',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hazel',
    story: '千粉账号变现六位数。她说：职业转型不是寻找"100分天选职业"，而是将55分的选择逐步培养为75分的事业。避免成为情绪垃圾桶，明确边界，聚焦解决问题的能力而非情绪消耗。',
    keyPoints: ['55分开始，逐步打磨到75分', '明确边界，聚焦解决问题能力', '市场化验证比自我感动更重要'],
    learnable: ['从"想干什么→能干什么→怎么赚钱"三维度切入', '用阶段性成果验证方向', '建立清晰的个人标签'],
    industry: 'education',
    roleType: 'educator',
    level: 'mid',
  },

  // ========== 全球真实案例（硅谷+中国） ==========
  {
    name: 'Dmytro Krasun',
    title: '独立开发者',
    company: 'Screenshot One创始人/前程序员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dmytro',
    story: '两年多前辞去程序员工作，希望实现"自己做产品"的梦想。聚焦自身优势领域（后端开发、API构建），开发Screenshot One（自动化截图生成API工具）。通过Twitter、Reddit、Product Hunt等渠道冷启动，280个付费客户，月经常性收入约1.2万美元。他说：选择已有竞争但需求明确的细分市场，通过竞争对手间接验证市场潜力。',
    keyPoints: ['选择擅长的技术领域，避免盲目创新', '通过"10个陌生付费用户"验证需求真实性', '多渠道冷启动：社交平台+集成平台+技术教程'],
    learnable: ['选择有市场需求的产品方向', '通过价格筛选真实用户（从7美元提至17美元）', '用数据驱动优化（将月流失率从11%降至7%）'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: '阿小信',
    title: '独立开发者',
    company: '自由职业/前公司程序员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=axiaoxin',
    story: '2023年3月公司不续签劳动合同，被迫失业。经内心斗争后决定不找工作，直接全职做独立开发。前期同时推进多个项目像"没头苍蝇"，结果一事无成。2024年8月起调整策略：聚焦少数能带来稳定流量的核心网站，深挖SEO、功能迭代，日收入接近300美元（约合人民币2100元/日）。他说：自由职业的本质是"掌控自己的命运，同时承担所有不确定性"。',
    keyPoints: ['必须有存款作为安全垫，不要裸辞', '专注深挖，别贪多，选一个方向做透', '用生意思维对待自由职业'],
    learnable: ['接受短期无回报，种树型项目需要时间', '在广告基础上接入CPS推广、付费功能等，提升抗风险能力', '谨慎保护项目信息，避免代码泄露'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: '硅谷科技工作者群体',
    title: '创业者',
    company: 'Clarify Capital调研/1007人样本',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=siliconvalley',
    story: 'Clarify Capital调研显示：1007名疫情期间被裁员的科技工作者创办了自己的公司。40%在6-12个月内决定创业，近30%在6个月内做出决定。平均自投资金超过2万美元，70%以上通过亲友筹资。近50%在4-8个月内获得首批客户，近90%在1年内开始获客。创业后平均年收入比之前工作增加约1.3万美元。70%曾经历"创业后悔期"，但58%对工作安全感、工作生活平衡、心理健康感到更好。',
    keyPoints: ['利用原有行业人脉（84%的人利用了前公司人脉）', '职业成长是创业的首要动机', '快速决策能力是关键成功因素'],
    learnable: ['6-12个月是创业决策的关键窗口期', '平均需要2万美元启动资金', '选择合适的技术工具和制定营销策略是核心难题'],
    industry: 'tech',
    roleType: 'management',
    level: 'senior',
  },
  {
    name: '雪梨',
    title: '自由职业者/小红书博主',
    company: '淘宝店主/小红书30万粉',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xueli',
    story: '2017年毕业于上海外国语大学英语系，曾作为管培生加入LVMH市场部，做过柜姐卖奢侈品。2019年被裁员后，低成本创业在淘宝开饰品店。开始做小红书，半年涨粉15万，目前粉丝数已达30万。还曾担任IP商业教练，粉丝数累计达53万。她说：抓住每个平台的红利，善于复制成功经验。',
    keyPoints: ['抓住平台红利，善于复制成功经验', '低成本创业，从淘宝小店开始', '通过内容记录生活、分享成长经历引发共鸣'],
    learnable: ['注重选品，成功打造多款爆品', '在内容创作中保持真实和共鸣', '多平台布局，累计粉丝实现商业变现'],
    industry: 'retail',
    roleType: 'marketing',
    level: 'mid',
  },
  {
    name: '是静流',
    title: '产品经理',
    company: '某互联网公司/前大厂员工',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shijingliu',
    story: '2023年6月底与前司谈妥离职补偿，结束四年工作经历，期间负责3个从0到1的项目。GAP一年后重回职场。被裁员两周年时分享感悟：以运营自己为先，不再隐藏真实自我，接纳高敏感特质。30-35岁的人生课题是"学会更爱自己"，经历裁员、重返职场后，看到自己的韧性和内在力量成长。',
    keyPoints: ['以运营自己为先，把精力转向积累个人价值', '不再隐藏真实自我，主动展示真实性格', '接纳高敏感特质，视其为天赋'],
    learnable: ['GAP期实践个人想法，反而更清楚自己想要什么', '做自己相信的事，持续积极自救', '30-35岁是自我疗愈与自然成长的关键期'],
    industry: 'tech',
    roleType: 'product',
    level: 'mid',
  },
  {
    name: '大西（化名）',
    title: '包子铺创始人',
    company: '小清妈包子铺/前阿里HR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daxi',
    story: '原阿里P7（人才培养方向），32岁被优化前刚升职，经历业务线裁撤。写简历时感到"人生非常无趣"，意识到在大厂做中后台工作缺乏实际业务能力。与三位同样被优化的大厂P7（南果-交互设计师、小曾-产品经理、另一位运营）合伙开设"小清妈包子铺"。主打创新馅料包子（鸡翅、肥肠等），同时卖鸡尾酒、烧鸟，强调"不正经"。她说：人生如此有趣，为什么一定要做一个正经的事情？',
    keyPoints: ['大厂中后台工作的价值感依赖平台资源', '中年叛逆：跳出社会期待，做自己认可的事', '开实体店接触真实经营，弥补"飘着"的感觉'],
    learnable: ['用互联网产品思维做实体餐饮', '创造有温度的空间，提供情绪价值', '团餐是改善现金流的有效方式'],
    industry: 'other',
    roleType: 'hr',
    level: 'mid',
  },

  // ========== 2025年最新案例（自动更新 2026-03-23）==========
  {
    name: 'Jacky Liang',
    title: '独立开发者/AI创业者',
    company: 'Answer HQ创始人/前Pinecone AI工程师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jackyliang',
    story: '2024年9月，Jacky在加入硅谷AI独角兽公司Pinecone仅4个月后就被裁员。失业期间，他与朋友聊天发现小企业主每天被重复客户问题淹没，于是花3周业余时间造出一个"丑得可以"的MVP——AI客服工具Answer HQ。没有炫酷UI，但解决了真实痛点。靠口碑推荐，7个客户中5个来自推荐，累计营收超6000美元，MRR突破1000美元。后来他找到新工作，但副业继续运转。',
    keyPoints: ['解决真实痛点比UI酷炫更重要', '口碑推荐是最可靠的冷启动方式', '当日修复Bug建立客户信任'],
    learnable: ['用失业期间的焦虑时间换MVP验证机会', '先从身边朋友的真实痛点找方向', '保持克制，只做客户明确需要的功能'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: 'Kelly Daniel',
    title: 'AI提示词工程师（Prompt Director）',
    company: '某AI初创公司/前Meta战略合作',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kellydaniel',
    story: '曾在CNN、NBC做电视新闻，后加入Meta负责新闻和战略合作关系，最终被裁。她没有选择继续找传统媒体工作，而是主动研究了解AI提示词工程这个新兴领域。接受LinkedIn短期AI项目合同（职级较低）作为跳板，主动贡献提示词改进建议，同时自学Python编程。凭借新闻人对语言的精准感知+技术能力，成功转型为AI初创公司的"提示词总监"，专注开发LLM应用提示词技术。',
    keyPoints: ['新闻人的语言敏感度是提示词工程的核心资产', '接受短期合同积累AI实战经验', '自学Python打破跨界门槛'],
    learnable: ['把自己现有技能（写作、分析）迁移到AI领域', '通过评估和标注AI输出入门提示词工程', '每天用ChatGPT/Claude解决真实工作问题，积累经验'],
    industry: 'media',
    roleType: 'creative',
    level: 'mid',
  },
  {
    name: 'Hemant Virmani',
    title: '高级工程经理',
    company: '亚马逊/印裔科技高管',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hemantvirmani',
    story: '在亚马逊工作了11.5年的47岁高级工程经理，2025年10月被裁员。他没有把这次裁员视为终点，而是视为重新定向的机会。将每天时间各半分配给求职和AI学习，不只读理论，而是亲自动手开发AI个人项目。在LinkedIn分享被裁经历后，获得大量前同事支持和工作线索，验证了职业网络的真实价值。他说：无法控制被裁这件事，但可以控制自己的反应——这段时期是审视职业重点、提升技能的机会。',
    keyPoints: ['实操AI项目比只读理论更有价值', '公开分享被裁经历，激活职业网络', '年龄不是障碍，心态才是'],
    learnable: ['每天抽出一半时间学AI，一半时间找工作', '在LinkedIn上公开你的转型历程，引发共鸣', '专注有AI应用经验的高价值职位，而非广撒网'],
    industry: 'tech',
    roleType: 'management',
    level: 'senior',
  },
  {
    name: '田渊栋',
    title: 'AI初创公司联合创始人',
    company: '某神秘初创公司/前Meta FAIR研究总监',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tianyuandong',
    story: '在Meta工作超过10年的知名华人AI科学家，2025年10月Meta裁员600人时被波及，彼时他正在主导Llama 4救火工作。裁员通知让他悲愤，直言"真正该负责的人不是被裁的人"。沉淀后，他决定去一家新初创公司担任联合创始人，开始全新旅程。他在年终总结中写道：这个AI能力充沛的时代，便利与陷阱并存，"更重要的是弄清楚AI能做什么、不能做什么，以及我们真正想做什么。"',
    keyPoints: ['大厂十年积累是创业最深厚的底气', '被迫转型的时机，往往是最合适的时机', '真正了解AI局限性，才能创造真正的价值'],
    learnable: ['整理自己在大厂积累的独特技术认知，这是创业的核心资产', '让情绪自然流淌，不压抑愤怒，也不让愤怒误导决策', '关注AI的局限性，在边界地带找创业机会'],
    industry: 'tech',
    roleType: 'technical',
    level: 'expert',
  },

  // ========== 2026年3月新增案例 ==========
  {
    name: '李洪印',
    title: '独立开发者/AI创业者',
    company: '个人开发者/前互联网大厂',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lihongyin',
    story: '从互联网大厂被裁员后，抓住GPT-3.5发布带来的AI应用窗口期，果断切入工具类产品赛道。每天工作早8点至晚11点，高强度探索，接连推出三款出海产品：谷歌电子表格助手、多语言输入助手、长文写作工具。产品覆盖阿拉伯、新加坡、孟加拉等市场，收入实现十倍增长。推广方式从最初硬广转为社区互动、真诚回答用户问题，逐步积累信用和粉丝。',
    keyPoints: ['提前预判，为裁员做好准备', '抓住AI应用窗口期，快速切入', '从硬广转为社区运营，建立用户信任'],
    learnable: ['提前关注行业趋势，有备无患', '高强度探索期是必须的投入', '用真诚互动替代硬推广'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: '张明',
    title: '独立开发者/一人公司创始人',
    company: 'OPC/前大厂后端程序员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangming',
    story: '32岁，前某大厂后端程序员，工作6年后因职业倦怠离职。离职前受独立开发者年收入50万案例激发创业想法。妻子支持，家庭有储蓄保障。注册一人有限责任公司后，通过《精益创业》调整策略：从API文档生成工具起步，2周开发完成。首月注册用户2000+，付费用户10+，月收入1500元。一年后月活跃用户15000+，付费用户200+，月收入3万+，年收入30万+。现在每日工作4-6小时，实现时间自由。',
    keyPoints: ['有储蓄保障再离职，降低试错风险', '从小工具起步，快速验证MVP', '从一次性付费调整为订阅制'],
    learnable: ['先注册公司，合法合规运营', '在小众赛道做到差异化', '用户反馈驱动迭代'],
    industry: 'tech',
    roleType: 'technical',
    level: 'mid',
  },
  {
    name: '杨爸（Mars火星哥）',
    title: '职场博主/心理咨询师/职业塔罗师',
    company: '《整点亮话》主播/前蔚来HRBP',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marsfire',
    story: '30+被蔚来裁员，7年HRBP经验。经历裁员后快速调整心态，将专业经验转化为职场内容资产。转型为职场博主、播客主播、心理咨询师、职业塔罗师，聚焦职场心理、职业规划、个人成长领域。运营播客《整点亮话》，分享职场洞察、裁员心理、职业发展。结合"国家二级心理咨询师"资质，提供职业心理辅导。开展"30天陪跑"计划，帮助教培、文旅、本地生活等行业用户打造个人IP或实现职业转型。通过"柚米club"社群链接大厂人群，组织线下团建和行业交流。',
    keyPoints: ['裁员不一定是个人能力问题，避免自我否定', '将企业内部经验转化为对外服务', '两条腿走路：内容+咨询双轨模式'],
    learnable: ['技能知识是依靠，将经验转化为资产', '精准定位中年职场人痛点', '从"企业HR"到"个人IP"的思维转换'],
    industry: 'tech',
    roleType: 'hr',
    level: 'mid',
  },

  // ========== 2026年3月24日新增案例 ==========
  {
    name: '李然',
    title: 'AI视觉架构师/设计伦理顾问',
    company: '某设计工作室/原4A广告公司设计师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liran',
    story: '原4A广告公司创意骨干，始终坚信"人脑不可替代性"。2024年春招时，亲眼目睹应届生用AI工具30分钟生成10套品牌VI方案，甲方开始优先接受AI初稿。数据显示2025年Q1商业设计中AI方案采纳率已达62%。危机感促使他重新审视自身价值。转折点来自一次儿童公益项目——AI生成的警徽被儿童认为"太凶"，缺乏人性温度。他意识到：AI擅长"正确"，人类创造"真实"。于是聚焦适老化设计、儿童安全等需深度共情的领域，用AI生成基础方案，再注入情感细节。同时参与训练国风AI模型、制定《AI设计伦理白皮书》，从执行者转型为"人类创意守门人"。',
    keyPoints: ['AI采纳率超60%倒逼传统设计师重新定位', '在"算法裂缝"中植入人类情感是新核心价值', '从执行到架构：掌控AI而非被AI取代'],
    learnable: ['找到AI无法替代的情感/伦理场景作为差异化切入点', '用设计逻辑参与AI模型训练，建立新的话语权', '推动行业标准，从被动适应者变为规则制定者'],
    industry: 'creative',
    roleType: 'creative',
    level: 'mid',
  },
  {
    name: 'Donald King',
    title: 'AI营销机构创始人',
    company: 'AMDK创始人/前普华永道AI专家',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=donaldking',
    story: '25岁，德州大学奥斯汀分校金融专业毕业，在普华永道AI Factory团队做产品经理兼数据科学家，每周工作60-80小时，主导开发自动化智能体，在公司内部组织AI知识分享会（超200人参与）。2024年10月，他带领团队在3000人参与的OpenAI黑客松中夺冠，两小时后却收到裁员通知。他深刻意识到：自己开发的智能体虽然只有5岁儿童推理水平，却能替代重复性工作的初级岗位——包括他自己。被裁后他在TikTok分享经历，"手持解雇通知书"视频两周内获数百万播放量。他用离职补偿金创办AI营销机构AMDK，帮助传统行业CEO做TikTok个人品牌和AI转型，后扩展至十亿美元级企业客户，形成稳定的定制化智能体开发业务。',
    keyPoints: ['为500强开发裁员工具，最终裁到自己——绝境反而是最真实的转型故事', 'TikTok记录被裁经历意外走红，流量成为创业起点', '用离职补偿金快速创业，将危机转化为杠杆'],
    learnable: ['公开分享失业经历，真实故事比营销内容更有吸引力', '把大公司积累的AI能力直接服务中小企业，降低客单难度', '从工具使用者变为AI咨询提供方，溢价更高'],
    industry: 'tech',
    roleType: 'product',
    level: 'junior',
  },
  {
    name: '羽森',
    title: 'AI营销创业者/羽翼智能联合创始人',
    company: '羽翼智能/原传统营销专家',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yusen',
    story: '传统内容营销领域的资深专家，曾撰写累计10亿流量爆款文案，操盘多个3.5亿GMV大型项目，帮助100+个IP实现1.1亿粉丝增长。当AI写作能力开始超越其多年积累，他经历了巨大冲击——曾以为自己不可取代，却发现AI的文笔和创意已经超越了他。选择拥抱而非抗拒后，他重新拆解内容生产全流程，找出AI在选题、脚本、投放、运营各环节的差异化能力，从"自己写"进化为"让AI写+人来架构"。开发AI起号系统平台，聚焦"从0到1打造IP"全链路解决方案，实现1人完成5人起号量，2024年3月启动至今IP项目100%起号成功率，创立羽翼智能。',
    keyPoints: ['拥有10亿流量经验的专家，仍被AI冲击——高手也需要转型', '从"亲自写"到"架构内容生产系统"，价值层次提升', 'AI赋能下1人效能等于5人团队，释放规模化能力'],
    learnable: ['拆解自己的专业技能流程，找出AI可接管的环节', '保留人的架构能力和品味判断，让AI执行', '用自身转型经历开发标准化产品服务，从个人到平台'],
    industry: 'marketing',
    roleType: 'marketing',
    level: 'senior',
  },
  {
    name: '林晨',
    title: '独立开发者/AI产品创业者',
    company: '个人工作室/前大厂产品经理',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linchen',
    story: '33岁，文科出身，自学产品经理，做了5年，画了上千个原型图，写了几十万字需求文档。大厂裁员浪潮中失去工作，面临年龄焦虑和技术门槛双重压力。不懂代码的他，选择用AI编程工具硬刚。利用Cursor、Claude等AI工具辅助开发，产品经理的需求拆解能力成为最大优势——他能清晰定义"要做什么"，AI负责"怎么实现"。30天内完成首个产品MVP并上线，依托5年产品经验精准把握用户痛点，产品验证速度远超纯技术背景的独立开发者。3个月后月收入达4万，实现"不懂代码也能造产品"的转型。',
    keyPoints: ['产品经理的需求拆解能力是AI编程时代的最强辅助', '30天从零到上线，AI工具大幅压缩了原来需要团队的工作', '文科+产品+AI，打破了"转型必须懂代码"的刻板印象'],
    learnable: ['用Cursor/Windsurf等AI编程工具，产品经理也能独立开发', '把自己积累的用户洞察转化为产品需求，这是AI做不到的', '先用AI构建MVP，快速验证想法，而非等到技术完备再动手'],
    industry: 'tech',
    roleType: 'product',
    level: 'mid',
  },

  // ========== 2026年3月25日新增案例 ==========
  {
    name: '刘世奇',
    title: 'AI赋能外贸创业者',
    company: '泉州蒂万坦斯贸易有限公司创始人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liushiqi',
    story: '1997年生，内蒙古人，大学毕业后只身南下福建泉州创业。2021年第一年单枪匹马拿下500万外贸销售额，展现了精准的商业嗅觉。2023年开始引入AI辅助选品、设计、谈判、客服全流程，业绩翻倍至2000万。2024年决定"All in AI"：他用AI大模型分析海外电商爆款，提取设计元素，3小时生成108款拖鞋草图，从中挑出"丑拖鞋"这一蓝海品类——上千元一双、毛利率92%。从概念到可生产方案不超过一周。结果：公司年营业额从2000万跃升至4000万，6人小团队人均效能超500万，订单转化率30%，投产比提升2.4倍。',
    keyPoints: ['中小企业可以用AI站在巨人的肩膀上，边际成本几乎为零', 'AI选品+设计大幅压缩了从创意到生产的时间窗口', '将AI贯穿全业务流程而非局部试用，才能实现规模化'],
    learnable: ['用AI分析竞争对手设计元素，找到差异化产品方向', '先用AI生成大量设计草图，再人工筛选最优方案', '将AI用于客服、谈判等沟通环节，解放人力专注决策'],
    industry: 'retail',
    roleType: 'sales',
    level: 'mid',
  },
  {
    name: '陈云飞',
    title: 'AI独立开发者',
    company: '个人工作室/前互联网大厂用户运营管理层',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenyunfei',
    story: '曾在某互联网大厂担任用户研究与运营管理层，2022年底第一次接触AI工具就预感"工作方式将被改写"。当时公司大多数人还没意识到AI的潜力，他意识到在大厂内向AI方向转型难度极大——"大厂里，我像冗长生产链上的一颗螺丝钉，想独立做一个完整的产品，需要运营、设计、编程等多个角色配合。"2023年3月果断离职，全身心投入AI探索。初期只能用ChatGPT开发简单插件，历经一年积累。2024年8月借助性能更强的AI编程工具，突破技术瓶颈，开发出具备内购功能的爆款APP。如今通过"内容平台激励+产品内购+商业合作"实现多元收入，在社交平台分享AI开发经验，甚至激励16岁高中生跟随并获得国际奖项。',
    keyPoints: ['用户研究与运营10年经验是产品定位的最大优势，转型不等于经验清零', '大厂"螺丝钉"的局限反而成为转型动力', 'AI工具将编程专业门槛降低，使非技术背景者也能开发完整产品'],
    learnable: ['先通过主业使用AI提升效率，再以副业方式积累转型经验，降低风险', '传统运营的用户洞察能力在AI时代更有价值，而非弱点', '持续输出AI应用经验内容，可同步建立影响力和额外收入'],
    industry: 'tech',
    roleType: 'operations',
    level: 'mid',
  },
  {
    name: '郭郭',
    title: '零代码AI应用创业者',
    company: '个人工作室/前直播话术操盘手',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guoguo2026',
    story: '31岁，职业经历从杂志社记者到新媒体运营，再到直播行业话术操盘手。2024年被求婚后，与老公从北京迁居成都，决定"不被工作定义人生"。转型初期做小红书女性成长博主，2300粉丝变现困难。转折点是发现了市场缺口：用户真正需要的是"低门槛打卡"而非复杂规划工具。她零代码基础，用AI助手"灵光"的闪应用功能，通过口述需求生成应用框架，自称成了"AI翻译官"——把模糊需求转化成产品经理语言。第一版打卡应用耗时一周，定价9.9元挂在小红书店铺。根据用户反馈迭代第二版，加入心愿清单、激励海报功能，定价提至12元。1个多月累计卖出850单，收入近9000元。下一步计划开发日记类应用，捕捉小红书"写日记"趋势。',
    keyPoints: ['媒体运营人对内容和用户的感知是AI应用选题的最强底层能力', '零代码+AI，彻底打破了"不懂编程就不能做产品"的壁垒', '千粉账号先做产品验证，比追求粉丝量更快实现变现'],
    learnable: ['用"AI翻译官"思维把需求表达清楚，是零代码开发的核心能力', '先打磨最小可行产品（MVP），一周内上线验证，再根据真实用户反馈迭代', '将账号和产品协同运营，内容引流+产品变现，比纯内容博主更稳健'],
    industry: 'media',
    roleType: 'operations',
    level: 'junior',
  },
  {
    name: 'Lee Givens（老李）',
    title: 'AI产品经理',
    company: 'Woven by Toyota/前微软Meta苹果产品经理',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leegivens',
    story: '美国资深科技从业者，43岁才加入微软担任产品经理，此后辗转微软、Meta（AR眼镜产品营销经理）、Unity（全球产品负责人）、苹果（工程项目经理合同工），15年内被裁4次。57岁再次失业后，投递数百份简历几乎无回音——传统人脉和猎头渠道彻底失效，年龄成为显著劣势。他没有抱怨，而是系统学习PyTorch、MAX等AI框架，将技术知识转化为产品管理能力，放弃大厂执念，主动转向AI相关中小型科技公司。最终加入丰田子公司Woven by Toyota，担任AI产品经理，年薪六位数（美元），高于在Meta和苹果时期的收入，还争取到在西雅图工作的权利，兼顾家庭。他的故事证明：年龄不是障碍，主动学AI才是保住饭碗的关键。',
    keyPoints: ['传统人脉在AI裁员浪潮中失效，技能升级才是实质出路', '放下大厂执念，把AI技能与传统经验结合，瞄准传统企业AI转型岗位', '15年被裁4次：每次都不是终点，心态和快速行动力才是护城河'],
    learnable: ['系统学习AI框架（PyTorch等）+产品管理背景，是稀缺的复合型能力', '打开思路，传统车企/制造业的AI转型岗位竞争远低于科技大厂', '主动求职目标型策略：与其广撒网，不如锁定AI相关具体岗位精准突破'],
    industry: 'tech',
    roleType: 'product',
    level: 'senior',
  },

  // ========== 2026年3月26日新增案例 ==========
  {
    name: 'Zack Shapiro',
    title: 'AI律所创始合伙人',
    company: 'Rains LLP/前Davis Polk & Wardwell律师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zackshapiro',
    story: '耶鲁法学院毕业，曾在国际顶尖律所Davis Polk & Wardwell执业。他没有加入大型律所的AI项目，而是直接创立了只有两名全职员工的Rains LLP（位于曼哈顿）。这家"两人律所"正在处理传统上需要数十乃至百人团队才能完成的复杂并购与风险投资交易。标志性事件：某次收购案交割前夜，对方突然发函要求大幅修改条款。Shapiro将所有文件上传Claude并输入"从我方视角评估这些变更"，两小时内发现对方致命漏洞（免责条款与陈述冲突），当晚发出精准反提案，交易顺利交割。他不使用法律专用AI，而是用通用Claude搭配自建的执业10年经验指令集——将个人判断力编码为持久技能系统。他在X上发布的文章《2026年我是如何使用AI执业》浏览量突破700万。',
    keyPoints: ['通用AI+个性化指令集，比专用法律AI更能编码律师的判断力', '律师核心价值从"智力输出"转向"判断决策"，需构建AI协作指令体系', '两人律所靠AI承接百人团队业务量，彻底颠覆规模经济逻辑'],
    learnable: ['把多年执业经验编码为AI指令集，使AI按你的思维方式工作', '学会用Claude的三种模式：对话/协作/开发，覆盖法律工作全场景', '计费模式创新：除按时计费外，用AI成本优势提供订阅制服务'],
    industry: 'legal',
    roleType: 'creative',
    level: 'expert',
  },
  {
    name: '贺倩明',
    title: 'AI法律科技创业者',
    company: '得理科技创始人/前资深律师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hequanming',
    story: '拥有14年律师执业经验，在法律行业已站稳脚跟。2018年的一次硅谷考察成为职业转折点——他发现国际律所已将AI大量应用于降本增效，而国内还是一片空白。他敏锐判断这是破局机会，决定从"律师"转型为"法律AI创业者"。回国后联合顶级法律团队，与中科院深圳先进院共同建立国内首个法律AI实验室，从海量案卷中标注数据、训练法律理解能力。ChatGPT出现后，他快速调整方向——3个月内推出法律专用小模型，将系统从"拖拉机时代"升级至"奔驰时代"。目前，得理科技推出专业版（律师法律研究）、企业版（合同合规）、个人版（法律常识）三套产品，形成"AI+律师"闭环服务生态，兼顾商业价值与普惠法律服务。',
    keyPoints: ['前沿市场考察是最好的战略传感器，比等待趋势到来早5年布局', '跨界合作破解"法律懂AI，AI不懂法律"的双重壁垒', 'AI不取代律师，而是使律师做更有价值、有温度的工作'],
    learnable: ['通过行业考察发现本土化机会，在国内空白市场抢先布局', '建立"法律专家+AI专家"的跨界团队，弥补单一专业局限', '分层产品矩阵：专业版获收益、个人版积用户、企业版做护城河'],
    industry: 'legal',
    roleType: 'management',
    level: 'expert',
  },
  {
    name: '赖芳芳',
    title: '法税AI律师/创业导师',
    company: 'LegalMVP法税名师/资深律师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=laifangfang',
    story: '执业20年，曾长期深陷股权业务的"价格战红海"。转折点来自2018年一个税务案例：客户因合同未区分"房产租赁"与"设备租赁"，多缴百万税款。他意识到"不懂税的律师是在给客户埋雷"，决定转型。为此他花光全部积蓄——累计80万元学费，奔赴全国系统学习税法，主攻"涉税刑事业务"中占犯罪85%的虚开发票领域，用5年时间从竞争激烈的红海中找到"鱼多的池塘"。AI浪潮来临后，他没有防守，而是主动出击：为近200家常法客户配备基于自身知识库训练的"专属AI律师助理"，实现7×24小时在线服务，从价格战中脱身。部分客户还邀请他为企业定制AI智能体，开辟第二收入曲线。目前年创收超400万，成为"法税AI"领域的标志性人物，并将转型经验通过课程对外传授。',
    keyPoints: ['80万学费是投资，不是消费——专业壁垒是最高的护城河', '用AI做7×24小时服务升维，彻底跳出低价竞争的恶性循环', '从"服务律师"到"培训律师"，开辟第二职业曲线'],
    learnable: ['找到行业中"鱼最多的池塘"——选择高频刚需而非宽泛领域', '把积累的专业知识训练成AI智能体，将个人经验变成可复制的产品', '律师不只能卖时间，还能卖解决方案、知识体系和智能工具'],
    industry: 'legal',
    roleType: 'sales',
    level: 'senior',
  },
  {
    name: '李晓敏',
    title: 'AI教学创新带头人',
    company: '某本科院校会计系/会计教师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lixiaomin',
    story: '三十多岁的会计系教师，在某中部省份本科院校任教，日常工作是讲课和指导学生论文。2023年备课时偶然接触ChatGPT，发现AI能瞬间处理复杂财务报表和并购会计案例，瞬间意识到"如果它能帮我节省时间，我就能把精力投入更深层教学创新"。她没有排斥，而是系统行动：先学Python基础编程，再上手Excel的AI插件和Tableau数据可视化工具，花3个月掌握提示词工程技巧——能让AI输出高质量会计教学材料。真正转折在系内教学改革，她主动提出将AI工具融入会计实操课，与校企合作更新教学案例。经过AI辅助教学的学生，财务分析能力测评分数平均提升18%，就业反馈也更好。她从一位"循规蹈矩的讲课老师"成为院系AI教学改革的推动者，2025年受邀在区域高校联盟做专题分享。',
    keyPoints: ['教师的核心价值不是知识搬运，而是培养学生的分析和判断能力', 'AI节省讲解时间，让教师得以聚焦更高价值的教学设计', '从被动跟随到主动推动：先成为所在领域的AI先行者，再影响同伴'],
    learnable: ['从自己熟悉的专业场景入手——先在本行业找到AI的具体用法', '边学边用：用Prompt工程技巧定制专属AI教学助手，效果胜过通用工具', '将AI应用实践变成可对外分享的案例，积累个人影响力和职业话语权'],
    industry: 'education',
    roleType: 'educator',
    level: 'mid',
  },

  // ========== 跨界转型案例 ==========
  {
    name: '阿杰',
    title: 'AI训练师',
    company: '某AI公司/原淘宝客服',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ajie',
    story: '原本是淘宝客服，每天回复几百条咨询。后来公司引入AI客服，他被调去训练AI——把常见问题整理成问答对、优化AI回复。2年后跳槽到AI公司，工资翻了3倍。',
    keyPoints: ['转型不一定要换行，可以升级', '业务经验是训练AI的宝贵资产', '从"被AI替代"到"训练AI"'],
    learnable: ['积累业务场景知识', '学习AI训练和数据标注', '把一线经验转化为AI能力'],
    industry: 'retail',
    roleType: 'operations',
    level: 'mid',
  },
  {
    name: '陈老师',
    title: '在线教育讲师',
    company: '某知识付费平台/原线下教师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    story: '原本是线下英语老师，疫情后转线上。现在用AI备课、批改作业、生成练习题，一个人能带500个学生。她说：以前教50个就累趴，现在教500个还有时间做课程研发。',
    keyPoints: ['AI让好老师能教更多学生', '从"教书"升级为"设计学习体验"', '用AI放大个人影响力'],
    learnable: ['用AI辅助备课和批改', '设计个性化学习路径', '建立个人教学品牌'],
    industry: 'education',
    roleType: 'educator',
    level: 'mid',
  },
];

// 根据行业和岗位类型获取标杆人物
export function getRoleModels(industry: string, roleType: string, limit: number = 2): RoleModel[] {
  // 优先按岗位类型匹配（用户最关心的是同岗位的标杆）
  let matches = ROLE_MODELS.filter(rm => rm.roleType === roleType);
  
  // 如果岗位类型匹配不足，补充同行业的案例
  if (matches.length < limit) {
    const industryMatches = ROLE_MODELS.filter(rm => 
      rm.industry === industry && !matches.includes(rm)
    );
    matches = [...matches, ...industryMatches];
  }
  
  // 如果还不够，补充其他案例
  if (matches.length < limit) {
    const otherMatches = ROLE_MODELS.filter(rm => 
      !matches.includes(rm)
    );
    matches = [...matches, ...otherMatches];
  }
  
  return matches.slice(0, limit);
}

// 根据行业获取实践案例
export function getIndustryCase(industry: string): IndustryCase {
  return INDUSTRY_CASES[industry] || INDUSTRY_CASES['other'];
}

// 岗位类型映射
export const ROLE_TYPE_MAP: Record<string, string> = {
  '软件工程师': 'technical',
  '产品经理': 'product',
  '设计师': 'creative',
  '运营': 'operations',
  '销售': 'sales',
  '市场': 'marketing',
  '人力资源': 'hr',
  '财务': 'finance',
  '法务': 'legal',
  '咨询': 'consulting',
  '教师': 'educator',
  '医生': 'healthcare',
  '编辑': 'creative',
  '文案': 'creative',
  '数据分析师': 'technical',
  '项目经理': 'management',
};

// 识别岗位类型
export function detectRoleType(jobTitle: string): string {
  const lowerTitle = jobTitle.toLowerCase();
  for (const [keyword, type] of Object.entries(ROLE_TYPE_MAP)) {
    if (lowerTitle.includes(keyword.toLowerCase())) {
      return type;
    }
  }
  return 'general';
}
