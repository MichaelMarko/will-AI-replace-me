// 职业数据库 - 基于Anthropic研究和O*NET数据

import type { OccupationData } from '@/types/assessment';

export const OCCUPATIONS: OccupationData[] = [
  // 高风险职业 (理论暴露度 > 80)
  {
    title: '计算机程序员',
    category: 'tech',
    theoreticalExposure: 94,
    actualPenetration: 75,
    tasks: ['编写代码', '调试程序', '代码审查', '技术文档编写', '系统测试'],
    skills: ['编程语言', '算法设计', '软件工程', '问题解决'],
    riskTrend: 'rising',
  },
  {
    title: '客户服务代表',
    category: 'service',
    theoreticalExposure: 88,
    actualPenetration: 73,
    tasks: ['客户咨询', '问题解答', '投诉处理', '订单处理', '信息记录'],
    skills: ['沟通技巧', '问题解决', '产品知识', '情绪管理'],
    riskTrend: 'rising',
  },
  {
    title: '数据录入员',
    category: 'admin',
    theoreticalExposure: 85,
    actualPenetration: 67,
    tasks: ['数据录入', '数据验证', '表格处理', '文档整理', '信息核对'],
    skills: ['打字速度', '数据准确性', '办公软件', '细心'],
    riskTrend: 'rising',
  },
  {
    title: '内容编辑',
    category: 'media',
    theoreticalExposure: 82,
    actualPenetration: 45,
    tasks: ['内容撰写', '文案编辑', '标题优化', '内容校对', '选题策划'],
    skills: ['写作能力', '编辑技巧', 'SEO知识', '创意思维'],
    riskTrend: 'rising',
  },
  {
    title: '翻译员',
    category: 'media',
    theoreticalExposure: 90,
    actualPenetration: 55,
    tasks: ['文本翻译', '口译', '本地化', '术语管理', '质量检查'],
    skills: ['双语能力', '文化理解', '专业知识', '翻译工具'],
    riskTrend: 'rising',
  },
  {
    title: '市场研究分析师',
    category: 'business',
    theoreticalExposure: 78,
    actualPenetration: 35,
    tasks: ['数据分析', '报告撰写', '趋势预测', '竞品分析', '调研设计'],
    skills: ['数据分析', '市场洞察', '报告写作', '统计知识'],
    riskTrend: 'stable',
  },
  {
    title: '财务分析师',
    category: 'finance',
    theoreticalExposure: 76,
    actualPenetration: 30,
    tasks: ['财务建模', '报表分析', '预算编制', '投资评估', '风险评估'],
    skills: ['财务知识', 'Excel', '数据分析', '商业洞察'],
    riskTrend: 'stable',
  },
  {
    title: '人力资源专员',
    category: 'hr',
    theoreticalExposure: 72,
    actualPenetration: 40,
    tasks: ['简历筛选', '面试安排', '员工培训', '薪酬管理', '绩效评估'],
    skills: ['沟通能力', '招聘技巧', '劳动法规', '组织管理'],
    riskTrend: 'stable',
  },
  {
    title: '平面设计师',
    category: 'creative',
    theoreticalExposure: 68,
    actualPenetration: 35,
    tasks: ['视觉设计', '品牌设计', '排版设计', '图像处理', '设计提案'],
    skills: ['设计软件', '美学素养', '创意思维', '色彩理论'],
    riskTrend: 'stable',
  },
  {
    title: '法律助理',
    category: 'legal',
    theoreticalExposure: 75,
    actualPenetration: 25,
    tasks: ['法律研究', '文件起草', '案例整理', '合同审查', '法庭准备'],
    skills: ['法律知识', '研究能力', '写作能力', '细节关注'],
    riskTrend: 'rising',
  },
  
  // 中等风险职业 (理论暴露度 50-80)
  {
    title: '销售代表',
    category: 'sales',
    theoreticalExposure: 65,
    actualPenetration: 25,
    tasks: ['客户开发', '产品演示', '商务谈判', '销售跟进', '客户关系维护'],
    skills: ['销售技巧', '沟通能力', '产品知识', '谈判技巧'],
    riskTrend: 'stable',
  },
  {
    title: '项目经理',
    category: 'management',
    theoreticalExposure: 58,
    actualPenetration: 20,
    tasks: ['项目规划', '团队协调', '进度跟踪', '风险管理', '资源分配'],
    skills: ['项目管理', '领导力', '沟通协调', '问题解决'],
    riskTrend: 'stable',
  },
  {
    title: '会计师',
    category: 'finance',
    theoreticalExposure: 72,
    actualPenetration: 28,
    tasks: ['账务处理', '报表编制', '税务申报', '审计配合', '财务分析'],
    skills: ['会计知识', '财务软件', '税法', '细节关注'],
    riskTrend: 'stable',
  },
  {
    title: '教师',
    category: 'education',
    theoreticalExposure: 45,
    actualPenetration: 15,
    tasks: ['课程设计', '课堂教学', '学生评估', '作业批改', '家长沟通'],
    skills: ['教学能力', '学科知识', '沟通技巧', '耐心'],
    riskTrend: 'stable',
  },
  {
    title: '护士',
    category: 'healthcare',
    theoreticalExposure: 35,
    actualPenetration: 10,
    tasks: ['病人护理', '药物管理', '健康监测', '医疗记录', '患者教育'],
    skills: ['护理技能', '医学知识', '同理心', '应急处理'],
    riskTrend: 'falling',
  },
  
  // 低风险职业 (理论暴露度 < 50)
  {
    title: '医生',
    category: 'healthcare',
    theoreticalExposure: 42,
    actualPenetration: 12,
    tasks: ['疾病诊断', '治疗方案', '手术操作', '患者咨询', '医学研究'],
    skills: ['医学知识', '诊断能力', '手术技能', '医患沟通'],
    riskTrend: 'falling',
  },
  {
    title: '厨师',
    category: 'service',
    theoreticalExposure: 25,
    actualPenetration: 5,
    tasks: ['菜品制作', '食材准备', '菜单设计', '厨房管理', '质量控制'],
    skills: ['烹饪技术', '味觉感知', '创造力', '体力'],
    riskTrend: 'falling',
  },
  {
    title: '电工',
    category: 'technical',
    theoreticalExposure: 30,
    actualPenetration: 8,
    tasks: ['电路安装', '设备维修', '故障排查', '安全检查', '线路规划'],
    skills: ['电气知识', '动手能力', '安全意识', '问题解决'],
    riskTrend: 'falling',
  },
  {
    title: '心理咨询师',
    category: 'healthcare',
    theoreticalExposure: 38,
    actualPenetration: 10,
    tasks: ['心理评估', '咨询会谈', '治疗方案', '危机干预', '案例记录'],
    skills: ['心理学', '倾听技巧', '同理心', '保密意识'],
    riskTrend: 'falling',
  },
  {
    title: '机械工程师',
    category: 'engineering',
    theoreticalExposure: 55,
    actualPenetration: 18,
    tasks: ['机械设计', '原型制作', '性能测试', '故障分析', '技术文档'],
    skills: ['机械原理', 'CAD软件', '材料知识', '创新思维'],
    riskTrend: 'stable',
  },
  {
    title: '建筑师',
    category: 'creative',
    theoreticalExposure: 48,
    actualPenetration: 22,
    tasks: ['建筑设计', '方案规划', '施工图纸', '项目管理', '客户沟通'],
    skills: ['设计能力', '建筑知识', '软件技能', '空间思维'],
    riskTrend: 'stable',
  },
  {
    title: '社会工作者',
    category: 'social',
    theoreticalExposure: 32,
    actualPenetration: 8,
    tasks: ['个案管理', '资源链接', '社区服务', '危机干预', '政策倡导'],
    skills: ['沟通技巧', '同理心', '资源知识', '问题解决'],
    riskTrend: 'falling',
  },
  {
    title: '科学家',
    category: 'research',
    theoreticalExposure: 52,
    actualPenetration: 20,
    tasks: ['实验设计', '数据收集', '论文撰写', '研究分析', '学术发表'],
    skills: ['研究能力', '专业知识', '批判思维', '创新'],
    riskTrend: 'stable',
  },
  {
    title: '高管',
    category: 'management',
    theoreticalExposure: 40,
    actualPenetration: 15,
    tasks: ['战略规划', '决策制定', '团队领导', '利益相关者管理', '组织变革'],
    skills: ['领导力', '战略思维', '决策能力', '沟通技巧'],
    riskTrend: 'stable',
  },
  {
    title: '艺术家',
    category: 'creative',
    theoreticalExposure: 35,
    actualPenetration: 12,
    tasks: ['艺术创作', '概念开发', '作品展示', '艺术指导', '创意表达'],
    skills: ['艺术技巧', '创意思维', '审美能力', '自我表达'],
    riskTrend: 'falling',
  },
];

// 获取职业数据
export function getOccupationByTitle(title: string): OccupationData | undefined {
  return OCCUPATIONS.find(
    (occ) => occ.title.toLowerCase() === title.toLowerCase()
  );
}

// 获取相似职业
export function getSimilarOccupations(title: string, limit: number = 3): OccupationData[] {
  const target = getOccupationByTitle(title);
  if (!target) return [];
  
  return OCCUPATIONS
    .filter((occ) => occ.title !== title)
    .sort((a, b) => {
      const scoreA = Math.abs(a.theoreticalExposure - target.theoreticalExposure);
      const scoreB = Math.abs(b.theoreticalExposure - target.theoreticalExposure);
      return scoreA - scoreB;
    })
    .slice(0, limit);
}

// 获取职业分类统计
export function getCategoryStats() {
  const stats: Record<string, { count: number; avgExposure: number; avgPenetration: number }> = {};
  
  OCCUPATIONS.forEach((occ) => {
    if (!stats[occ.category]) {
      stats[occ.category] = { count: 0, avgExposure: 0, avgPenetration: 0 };
    }
    stats[occ.category].count++;
    stats[occ.category].avgExposure += occ.theoreticalExposure;
    stats[occ.category].avgPenetration += occ.actualPenetration;
  });
  
  Object.keys(stats).forEach((cat) => {
    stats[cat].avgExposure = Math.round(stats[cat].avgExposure / stats[cat].count);
    stats[cat].avgPenetration = Math.round(stats[cat].avgPenetration / stats[cat].count);
  });
  
  return stats;
}
