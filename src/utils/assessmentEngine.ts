// 岗位危险度评估引擎 - 基于Anthropic研究框架（增强版）

import type {
  JobInfo,
  TheoreticalExposure,
  ActualPenetration,
  ComparisonResult,
  DevelopmentAdvice,
  AssessmentResult,
  ExposureFactor,
  PenetrationFactor,
} from '@/types/assessment';
import { getOccupationByTitle, getSimilarOccupations } from '@/data/occupations';
import { INDUSTRIES, EXPERIENCE_LEVELS } from '@/types/assessment';
import { 
  getIndustryCase, 
  getRoleModels, 
  detectRoleType,
  type RoleModel,
} from '@/data/industryCases';

// 任务关键词映射到暴露度评分
const TASK_EXPOSURE_MAP: Record<string, number> = {
  // 高暴露度任务 (β = 1)
  '编程': 100, '代码': 100, '开发': 95, '调试': 95, '测试': 85,
  '写作': 90, '撰写': 90, '文案': 88, '编辑': 85, '翻译': 90,
  '数据分析': 80, '数据处理': 85, '报表': 75, '统计': 78,
  '客服': 88, '咨询': 75, '解答': 80, '回复': 85,
  '录入': 85, '整理': 70, '归档': 65, '核对': 60,
  '研究': 72, '调研': 68, '分析': 75, '评估': 70,
  '设计': 65, '制图': 60, '排版': 75, '美化': 55,
  '计算': 80, '核算': 75, '审计': 70, '预算': 65,
  
  // 中等暴露度任务 (β = 0.5)
  '策划': 60, '规划': 55, '计划': 50, '组织': 45,
  '协调': 40, '沟通': 35, '谈判': 45, '演示': 50,
  '培训': 55, '指导': 50, '教学': 45, '辅导': 40,
  '销售': 50, '推广': 55, '营销': 60, '运营': 55,
  '管理': 40, '监督': 35, '领导': 30, '决策': 25,
  '招聘': 65, '面试': 50, '考核': 55, '绩效': 50,
  '维护': 45, '维修': 35, '保养': 30, '安装': 35,
  
  // 低暴露度任务 (β = 0)
  '护理': 25, '治疗': 20, '手术': 15, '诊断': 30,
  '烹饪': 20, '制作': 25, '加工': 30, '生产': 35,
  '驾驶': 25, '操作': 30, '控制': 35, '监控': 40,
  '清洁': 15, '保洁': 10,
  '建造': 30, '施工': 35, '装修': 25,
  '艺术创作': 25, '表演': 20, '演奏': 15, '绘画': 25,
  '心理咨询': 30, '干预': 25,
  '社交': 20, '陪伴': 15, '照顾': 20, '看护': 18,
};

// 技能关键词映射
const SKILL_EXPOSURE_MAP: Record<string, number> = {
  // 高暴露技能
  '编程': 100, 'Python': 95, 'JavaScript': 95, 'Java': 90, 'C++': 85,
  '写作': 90, '文案': 88, '编辑': 85, '翻译': 90, 'SEO': 80,
  '数据分析': 85, 'Excel': 75, 'SQL': 80, '统计': 78, '建模': 82,
  '设计软件': 70, 'PS': 75, 'AI': 72, 'CAD': 65, '视频剪辑': 68,
  '打字': 85, '速录': 88, '办公软件': 75, 'PPT': 70,
  
  // 中等暴露技能
  '项目管理': 55, '团队协作': 45, '沟通': 40, '演讲': 50,
  '销售': 55, '谈判': 50, '客户管理': 45, '市场营销': 60,
  '财务': 65, '会计': 70, '审计': 68, '投资': 55,
  '人力资源': 60, '招聘': 65, '培训': 55, '绩效考核': 50,
  '法律咨询': 65, '合同': 60, '合规': 55, '知识产权': 58,
  
  // 低暴露技能
  '护理': 25, '医疗': 20, '临床': 22, '手术': 15,
  '烹饪': 20, '厨艺': 18, '烘焙': 22, '调酒': 15,
  '机械维修': 30, '电工': 28, '焊接': 25, '木工': 22,
  '驾驶': 25, '操作机械': 30, '设备维护': 35,
  '艺术创作': 25, '音乐': 20, '绘画': 25, '舞蹈': 18,
  '心理咨询': 30, '社会工作': 25, '幼儿教育': 28,
  '运动': 20, '健身': 22, '体育': 18, '教练': 25,
};

// 工具关键词映射
const TOOL_EXPOSURE_MAP: Record<string, number> = {
  // AI相关工具 (高暴露)
  'ChatGPT': 95, 'Claude': 95, 'Copilot': 90, 'Midjourney': 88,
  'AI写作': 92, 'AI绘画': 85, 'AI编程': 95, 'AI助手': 88,
  
  // 办公软件 (中高暴露)
  'Office': 75, 'Word': 78, 'Excel': 75, 'PowerPoint': 70,
  'Google Docs': 80, 'Notion': 75, '飞书': 72, '钉钉': 68,
  
  // 开发工具 (高暴露)
  'VS Code': 90, 'GitHub': 85, 'Git': 80, 'Docker': 75,
  'Jupyter': 82, 'Tableau': 78, 'Power BI': 76,
  
  // 设计工具 (中等暴露)
  'Photoshop': 72, 'Illustrator': 70, 'Figma': 68, 'Sketch': 65,
  'Premiere': 70, 'After Effects': 68, 'Canva': 75,
  
  // 专业软件 (中等暴露)
  'SAP': 60, 'Salesforce': 65, 'Jira': 70, 'Confluence': 72,
  'Slack': 68, 'Teams': 65, 'Zoom': 60,
  
  // 实体工具 (低暴露)
  '机械设备': 30, '实验仪器': 35, '医疗器材': 20, '烹饪设备': 25,
  '电工工具': 28, '测量仪器': 32, '施工设备': 35,
};

/**
 * 计算理论暴露度 (Theoretical Exposure)
 * 基于Anthropic研究的β值框架
 */
export function calculateTheoreticalExposure(jobInfo: JobInfo): TheoreticalExposure {
  const factors: ExposureFactor[] = [];
  
  // 1. 职责暴露度 (权重: 40%)
  let responsibilityScore = 0;
  if (jobInfo.mainResponsibilities.length > 0) {
    const scores = jobInfo.mainResponsibilities.map((task) => {
      let maxScore = 30; // 基础分
      for (const [keyword, score] of Object.entries(TASK_EXPOSURE_MAP)) {
        if (task.includes(keyword)) {
          maxScore = Math.max(maxScore, score);
        }
      }
      return maxScore;
    });
    responsibilityScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  factors.push({
    name: '职责暴露度',
    weight: 0.4,
    score: Math.round(responsibilityScore),
    description: '基于工作职责中可被AI加速的任务比例',
  });
  
  // 2. 技能暴露度 (权重: 30%)
  let skillScore = 0;
  if (jobInfo.skills.length > 0) {
    const scores = jobInfo.skills.map((skill) => {
      let maxScore = 25;
      for (const [keyword, score] of Object.entries(SKILL_EXPOSURE_MAP)) {
        if (skill.includes(keyword)) {
          maxScore = Math.max(maxScore, score);
        }
      }
      return maxScore;
    });
    skillScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  factors.push({
    name: '技能暴露度',
    weight: 0.3,
    score: Math.round(skillScore),
    description: '基于所需技能被AI替代的可能性',
  });
  
  // 3. 工具暴露度 (权重: 15%)
  let toolScore = 0;
  if (jobInfo.tools.length > 0) {
    const scores = jobInfo.tools.map((tool) => {
      let maxScore = 30;
      for (const [keyword, score] of Object.entries(TOOL_EXPOSURE_MAP)) {
        if (tool.includes(keyword)) {
          maxScore = Math.max(maxScore, score);
        }
      }
      return maxScore;
    });
    toolScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  factors.push({
    name: '工具暴露度',
    weight: 0.15,
    score: Math.round(toolScore),
    description: '基于使用工具与AI的整合程度',
  });
  
  // 4. 行业调整 (权重: 10%)
  const industry = INDUSTRIES.find((i) => i.value === jobInfo.industry);
  const industryMultiplier = industry?.riskMultiplier || 1.0;
  const industryScore = Math.min(100, Math.round(50 * industryMultiplier));
  factors.push({
    name: '行业调整',
    weight: 0.1,
    score: industryScore,
    description: `基于${industry?.label || '行业'}的AI渗透趋势调整`,
  });
  
  // 5. 经验调整 (权重: 5%)
  const experience = EXPERIENCE_LEVELS.find((e) => e.value === jobInfo.experience);
  const experienceMultiplier = experience?.riskMultiplier || 1.0;
  const experienceScore = Math.min(100, Math.round(50 * experienceMultiplier));
  factors.push({
    name: '经验调整',
    weight: 0.05,
    score: experienceScore,
    description: `${experience?.label || '经验水平'}的风险系数调整`,
  });
  
  // 计算加权总分
  const totalScore = Math.round(
    factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0)
  );
  
  // 确定等级
  let level: TheoreticalExposure['level'];
  if (totalScore >= 80) level = 'very-high';
  else if (totalScore >= 60) level = 'high';
  else if (totalScore >= 40) level = 'medium';
  else level = 'low';
  
  // 生成解释
  const explanation = generateExposureExplanation(totalScore, level, factors, jobInfo);
  
  return {
    score: totalScore,
    level,
    factors,
    explanation,
  };
}

/**
 * 计算实际渗透率 (Actual Penetration)
 * 基于Anthropic Economic Index数据
 */
export function calculateActualPenetration(
  jobInfo: JobInfo,
  theoreticalScore: number
): ActualPenetration {
  const factors: PenetrationFactor[] = [];
  
  // 查找匹配的职业数据
  const matchedOccupation = getOccupationByTitle(jobInfo.jobTitle);
  const similarOccupations = getSimilarOccupations(jobInfo.jobTitle, 3);
  
  // 1. 职业基准渗透率 (权重: 50%)
  let basePenetration = 30; // 默认基准
  if (matchedOccupation) {
    basePenetration = matchedOccupation.actualPenetration;
  } else if (similarOccupations.length > 0) {
    basePenetration = Math.round(
      similarOccupations.reduce((sum, occ) => sum + occ.actualPenetration, 0) / similarOccupations.length
    );
  }
  factors.push({
    name: '职业基准',
    weight: 0.5,
    score: basePenetration,
    description: matchedOccupation 
      ? `基于${matchedOccupation.title}的实际观测数据`
      : '基于相似职业的平均渗透率',
  });
  
  // 2. 理论-实际差距 (权重: 25%)
  // 根据Anthropic研究，实际渗透率通常比理论暴露度低30-60%
  const gapFactor = 0.6; // 平均差距系数
  const gapAdjustedScore = Math.round(theoreticalScore * gapFactor);
  factors.push({
    name: '理论-实际差距',
    weight: 0.25,
    score: gapAdjustedScore,
    description: '基于AI技术从理论能力到实际应用的转化延迟',
  });
  
  // 3. 行业采用率 (权重: 15%)
  const industryAdoptionRates: Record<string, number> = {
    'tech': 55, 'finance': 45, 'media': 50, 'consulting': 40,
    'retail': 35, 'education': 25, 'healthcare': 20, 'manufacturing': 30,
    'government': 15, 'other': 30,
  };
  const industryRate = industryAdoptionRates[jobInfo.industry] || 30;
  factors.push({
    name: '行业采用率',
    weight: 0.15,
    score: industryRate,
    description: '该行业整体AI工具采用水平',
  });
  
  // 4. 公司规模调整 (权重: 10%)
  // 假设大公司采用率更高
  const companySizeScore = 40; // 中等规模公司基准
  factors.push({
    name: '企业规模',
    weight: 0.1,
    score: companySizeScore,
    description: '基于企业规模对AI工具采购能力的影响',
  });
  
  // 计算加权总分
  const totalScore = Math.round(
    factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0)
  );
  
  // 确定等级
  let level: ActualPenetration['level'];
  if (totalScore >= 60) level = 'very-high';
  else if (totalScore >= 40) level = 'high';
  else if (totalScore >= 20) level = 'medium';
  else level = 'low';
  
  // 生成解释
  const explanation = generatePenetrationExplanation(totalScore, level, factors, jobInfo);
  
  return {
    score: totalScore,
    level,
    factors,
    explanation,
  };
}

/**
 * 对比分析理论暴露度和实际渗透率
 */
export function compareExposureAndPenetration(
  theoretical: TheoreticalExposure,
  actual: ActualPenetration
): ComparisonResult {
  const gap = theoretical.score - actual.score;
  
  // 确定差距等级
  let gapLevel: ComparisonResult['gapLevel'];
  if (gap >= 50) gapLevel = 'very-large';
  else if (gap >= 30) gapLevel = 'large';
  else if (gap >= 15) gapLevel = 'medium';
  else gapLevel = 'small';
  
  // 确定风险等级
  let riskLevel: ComparisonResult['riskLevel'];
  if (theoretical.score >= 80 && gap >= 30) {
    riskLevel = 'high-risk';
  } else if (theoretical.score >= 60 || gap >= 40) {
    riskLevel = 'risky';
  } else if (theoretical.score >= 40 || gap >= 20) {
    riskLevel = 'caution';
  } else {
    riskLevel = 'safe';
  }
  
  // 生成结论
  const conclusion = generateComparisonConclusion(theoretical, actual, gap, riskLevel);
  
  // 生成洞察
  const insights = generateInsights(theoretical, actual, gap);
  
  return {
    gap,
    gapLevel,
    riskLevel,
    conclusion,
    insights,
  };
}

/**
 * 生成发展建议
 */
export function generateDevelopmentAdvice(
  jobInfo: JobInfo,
  comparison: ComparisonResult,
  _theoretical: TheoreticalExposure
): DevelopmentAdvice[] {
  const advice: DevelopmentAdvice[] = [];
  const industryCase = getIndustryCase(jobInfo.industry);
  
  // 根据风险等级生成建议
  if (comparison.riskLevel === 'high-risk' || comparison.riskLevel === 'risky') {
    // 立即行动建议
    advice.push({
      category: 'immediate',
      priority: 'high',
      title: '掌握AI协作技能',
      description: `在${industryCase.title}，AI工具已成为标配。建议立即学习如何将AI作为生产力工具融入日常工作，避免被会使用AI的同行淘汰。`,
      actions: [
        '学习使用ChatGPT、Claude等AI助手提升工作效率',
        `了解${industryCase.title}领域的AI工具和应用案例`,
        '参加AI工具使用培训或在线课程',
      ],
    });
    
    advice.push({
      category: 'immediate',
      priority: 'high',
      title: '强化人际互动能力',
      description: 'AI难以替代的是复杂的人际沟通和情感交流能力。在AI时代，软技能的价值反而在提升。',
      actions: [
        '提升跨部门协作和项目管理能力',
        '培养客户关系管理和商务谈判技巧',
        '加强团队领导和人员管理能力',
      ],
    });
  }
  
  if (comparison.gap >= 30) {
    // 短期建议
    advice.push({
      category: 'short-term',
      priority: 'medium',
      title: '关注行业转型趋势',
      description: `理论暴露度与实际渗透率差距较大，说明转型窗口期仍在。${industryCase.trends[0]}`,
      actions: [
        '订阅行业AI应用趋势报告',
        '参加行业峰会了解最新技术动态',
        '建立跨行业人脉网络',
      ],
    });
    
    advice.push({
      category: 'short-term',
      priority: 'medium',
      title: '技能多元化发展',
      description: '在核心技能基础上，拓展互补性技能组合，构建T型能力结构。',
      actions: [
        '学习与当前技能相关的上下游技能',
        '培养跨领域知识和T型能力结构',
        '获得行业认证提升专业壁垒',
      ],
    });
  }
  
  // 长期建议 (所有人适用)
  advice.push({
    category: 'long-term',
    priority: 'medium',
    title: '构建个人品牌',
    description: '在AI时代，个人品牌和独特价值主张变得更加重要。成为某个细分领域的专家。',
    actions: [
      '在专业领域建立思想领导力',
      '通过内容创作分享专业见解',
      '参与开源项目或行业社区建设',
    ],
  });
  
  advice.push({
    category: 'long-term',
    priority: 'low',
    title: '持续学习与适应',
    description: '技术变革加速，终身学习成为必备能力。保持对新技术的好奇心和学习热情。',
    actions: [
      '制定个人学习计划和知识更新机制',
      '关注新兴技术和工具的发展',
      '保持对行业变化的敏感度和适应能力',
    ],
  });
  
  // 低风险岗位的特殊建议
  if (comparison.riskLevel === 'safe') {
    advice.push({
      category: 'short-term',
      priority: 'low',
      title: '适度关注AI发展',
      description: '您的岗位目前风险较低，但仍建议保持对技术发展的关注，探索如何利用AI提升工作效率。',
      actions: [
        '了解AI在您领域的辅助应用',
        '探索如何利用AI提升工作效率',
        '关注行业政策和技术规范变化',
      ],
    });
  }
  
  return advice.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const categoryOrder = { immediate: 0, 'short-term': 1, 'long-term': 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return categoryOrder[a.category] - categoryOrder[b.category];
  });
}

/**
 * 获取标杆人物建议
 */
export function getRoleModelAdvice(jobInfo: JobInfo): { roleModels: RoleModel[]; advice: DevelopmentAdvice } {
  const roleType = detectRoleType(jobInfo.jobTitle);
  const roleModels = getRoleModels(jobInfo.industry, roleType, 2);
  
  const advice: DevelopmentAdvice = {
    category: 'long-term',
    priority: 'medium',
    title: '学习标杆人物经验',
    description: '找到业内的标杆人物，学习他们如何在AI时代转型和成长。',
    actions: roleModels.map(rm => `学习${rm.name}：${rm.keyPoints[0]}`),
  };
  
  return { roleModels, advice };
}

/**
 * 执行完整评估
 */
export function performAssessment(jobInfo: JobInfo): AssessmentResult {
  const theoreticalExposure = calculateTheoreticalExposure(jobInfo);
  const actualPenetration = calculateActualPenetration(jobInfo, theoreticalExposure.score);
  const comparison = compareExposureAndPenetration(theoreticalExposure, actualPenetration);
  const advice = generateDevelopmentAdvice(jobInfo, comparison, theoreticalExposure);
  const { roleModels } = getRoleModelAdvice(jobInfo);
  const industryCase = getIndustryCase(jobInfo.industry);
  
  return {
    jobInfo,
    theoreticalExposure,
    actualPenetration,
    comparison,
    advice,
    roleModels,
    industryCase,
    timestamp: new Date().toISOString(),
  };
}

// 辅助函数：生成暴露度解释
function generateExposureExplanation(
  score: number,
  level: TheoreticalExposure['level'],
  factors: ExposureFactor[],
  jobInfo: JobInfo
): string {
  const levelText = {
    'very-high': '极高',
    'high': '高',
    'medium': '中等',
    'low': '低',
  };
  
  const topFactor = factors.sort((a, b) => b.score - a.score)[0];
  const industryCase = getIndustryCase(jobInfo.industry);
  
  let explanation = `您的岗位理论暴露度为${score}%，属于${levelText[level]}风险等级。`;
  explanation += `主要影响因素是${topFactor.name}（${topFactor.score}%），`;
  
  // 根据分数段添加具体解读
  if (score >= 80) {
    explanation += `这意味着您的工作内容在技术上高度可被AI加速或替代。`;
    explanation += `在${industryCase.title}，${industryCase.examples[0]}。`;
    explanation += `建议立即采取行动，学习AI工具的使用，避免被技术浪潮淘汰。`;
  } else if (score >= 60) {
    explanation += `这意味着您的部分工作内容可被AI加速。`;
    explanation += `在${industryCase.title}，${industryCase.examples[1] || industryCase.examples[0]}。`;
    explanation += `建议关注AI发展趋势，主动学习如何将AI融入工作流。`;
  } else if (score >= 40) {
    explanation += `这意味着AI对您的工作有一定影响，但替代风险可控。`;
    explanation += `${industryCase.title}的趋势是：${industryCase.trends[0]}。`;
    explanation += `建议适度关注AI发展，探索如何利用AI提升效率。`;
  } else {
    explanation += `这意味着您的工作内容相对安全，AI更多是辅助工具。`;
    explanation += `在${industryCase.title}，${industryCase.examples[2] || industryCase.examples[0]}。`;
    explanation += `建议保持对技术的关注，但无需过度担忧。`;
  }
  
  return explanation;
}

// 辅助函数：生成渗透率解释
function generatePenetrationExplanation(
  score: number,
  level: ActualPenetration['level'],
  _factors: PenetrationFactor[],
  jobInfo: JobInfo
): string {
  const levelText = {
    'very-high': '很高',
    'high': '较高',
    'medium': '中等',
    'low': '较低',
  };
  
  const industryCase = getIndustryCase(jobInfo.industry);
  
  let explanation = `当前AI在您所在岗位的实际渗透率为${score}%，处于${levelText[level]}水平。`;
  
  // 根据分数段添加具体解读
  if (score >= 60) {
    explanation += `这说明AI技术已从理论走向实践，成为日常工作的标配工具。`;
    explanation += `在${industryCase.title}，${industryCase.examples[0]}。`;
    explanation += `如果您还不会使用AI工具，已经落后于同行${score}%的水平。`;
  } else if (score >= 40) {
    explanation += `这说明AI应用正在快速普及，但尚未成为行业标准。`;
    explanation += `${industryCase.title}正在经历：${industryCase.trends[1] || industryCase.trends[0]}。`;
    explanation += `现在学习AI工具，正是抢占先机的好时机。`;
  } else if (score >= 20) {
    explanation += `这说明AI应用仍处于早期阶段，但增长趋势明显。`;
    explanation += `${industryCase.title}的特点是：${industryCase.trends[2] || industryCase.trends[0]}。`;
    explanation += `您有充足的时间进行准备和学习。`;
  } else {
    explanation += `这说明AI在该岗位的应用还非常有限，处于探索阶段。`;
    explanation += `${industryCase.title}的现状是：${industryCase.trends[0]}。`;
    explanation += `建议保持关注，但不必急于行动。`;
  }
  
  return explanation;
}

// 辅助函数：生成对比结论
function generateComparisonConclusion(
  theoretical: TheoreticalExposure,
  actual: ActualPenetration,
  gap: number,
  riskLevel: ComparisonResult['riskLevel']
): string {
  const riskText = {
    'safe': '安全',
    'caution': '需要关注',
    'risky': '存在风险',
    'high-risk': '高风险',
  };
  
  let conclusion = `综合评估结果：您的岗位处于${riskText[riskLevel]}状态。`;
  
  if (gap >= 30) {
    conclusion += `理论暴露度（${theoretical.score}%）与实际渗透率（${actual.score}%）存在${gap}%的显著差距，`;
    conclusion += `说明AI技术虽然具备替代潜力，但实际应用仍处于早期阶段。`;
    conclusion += `您有${gap > 40 ? '2-3年' : '1-2年'}的窗口期进行技能升级和转型准备。`;
    conclusion += `建议利用这段时间，主动学习AI工具，建立竞争壁垒。`;
  } else if (gap >= 15) {
    conclusion += `理论暴露度与实际渗透率差距适中（${gap}%），AI应用正在逐步渗透。`;
    conclusion += `这意味着技术替代正在发生，但速度可控。`;
    conclusion += `建议保持关注，适时调整技能组合。`;
  } else {
    conclusion += `理论暴露度与实际渗透率基本匹配（差距${gap}%），AI应用已进入稳定期。`;
    conclusion += `这意味着技术替代已经发生或正在快速发生。`;
    conclusion += `建议立即采取行动，适应新的工作模式。`;
  }
  
  return conclusion;
}

// 辅助函数：生成洞察
function generateInsights(
  theoretical: TheoreticalExposure,
  actual: ActualPenetration,
  gap: number
): string[] {
  const insights: string[] = [];
  
  if (theoretical.score >= 80) {
    insights.push('您的岗位属于AI高影响区域，技术替代风险较高，需要立即行动');
  } else if (theoretical.score >= 60) {
    insights.push('您的岗位部分任务可被AI加速，建议主动拥抱变化');
  } else {
    insights.push('您的岗位相对安全，AI更多是辅助工具而非替代者');
  }
  
  if (gap >= 40) {
    insights.push('较大的理论-实际差距意味着转型窗口期仍在，建议积极准备');
  } else if (gap <= 15) {
    insights.push('理论与实际差距较小，说明AI应用已进入成熟期');
  }
  
  if (actual.score >= 50) {
    insights.push('当前AI渗透率较高，掌握AI工具已成为必备技能');
  }
  
  const highRiskFactors = theoretical.factors.filter(f => f.score >= 70);
  if (highRiskFactors.length > 0) {
    insights.push(`重点关注：${highRiskFactors.map(f => f.name).join('、')}是主要风险点`);
  }
  
  return insights;
}
