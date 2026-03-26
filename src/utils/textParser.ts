// 一句话解析引擎 - 从自然语言提取岗位信息（增强版）

import type { JobInfo } from '@/types/assessment';
import { JOB_CATEGORIES } from '@/data/jobCategories';

// ============ 职级识别系统 ============
interface LevelInfo {
  level: 'entry' | 'junior' | 'mid' | 'senior' | 'expert';
  years: string; // 对应经验值
  weight: number;
  title: string; // 职级名称
}

const LEVEL_PATTERNS: { pattern: RegExp; info: LevelInfo }[] = [
  // 专家级
  { pattern: /(?:首席|总监|VP|副总裁|负责人|Head of|CTO|CEO|COO|CFO|CHRO|HRVP)/, 
    info: { level: 'expert', years: '10+', weight: 5, title: '负责人' } },
  // 资深级
  { pattern: /(?:资深|高级|Senior|Mgr|Manager|主管|经理|专家)/, 
    info: { level: 'senior', years: '5-10', weight: 4, title: '经理' } },
  // 中级
  { pattern: /(?:中级|Mid|工程师|专员|执行)/, 
    info: { level: 'mid', years: '3-5', weight: 3, title: '专员' } },
  // 初级
  { pattern: /(?:初级|Junior|助理|助理|实习生|Intern)/, 
    info: { level: 'junior', years: '1-3', weight: 2, title: '助理' } },
];

// ============ 经验年限识别（增强版）===========
const EXPERIENCE_PATTERNS = [
  { pattern: /(\d+)\s*年[以以上]*经验?/, extract: (m: RegExpMatchArray) => {
    const years = parseInt(m[1]);
    if (years >= 10) return { value: '10+', years };
    if (years >= 5) return { value: '5-10', years };
    if (years >= 3) return { value: '3-5', years };
    if (years >= 1) return { value: '1-3', years };
    return { value: '0-1', years };
  }},
  { pattern: /(\d+)\s*年/, extract: (m: RegExpMatchArray) => {
    const years = parseInt(m[1]);
    if (years >= 10) return { value: '10+', years };
    if (years >= 5) return { value: '5-10', years };
    if (years >= 3) return { value: '3-5', years };
    if (years >= 1) return { value: '1-3', years };
    return { value: '0-1', years };
  }},
  { pattern: /应届生|刚毕业|校招|实习/, extract: () => ({ value: '0-1', years: 0 }) },
  { pattern: /0-?2年|一两年|刚工作|新手/, extract: () => ({ value: '0-1', years: 1 }) },
  { pattern: /2-?5年|两三年|三四年/, extract: () => ({ value: '1-3', years: 3 }) },
  { pattern: /5-?10年|五六年|六七年|七八年/, extract: () => ({ value: '5-10', years: 7 }) },
  { pattern: /10年[以以上]*|十多年|十几年/, extract: () => ({ value: '10+', years: 12 }) },
];

// ============ 行业关键词（增强版）===========
const INDUSTRY_KEYWORDS: Record<string, { value: string; weight: number }> = {
  // 互联网/科技
  '互联网': { value: 'tech', weight: 2 },
  '科技': { value: 'tech', weight: 2 },
  'IT': { value: 'tech', weight: 2 },
  '软件': { value: 'tech', weight: 2 },
  'AI': { value: 'tech', weight: 3 },
  '人工智能': { value: 'tech', weight: 3 },
  '大模型': { value: 'tech', weight: 3 },
  '创业公司': { value: 'tech', weight: 2 },
  '初创': { value: 'tech', weight: 2 },
  '出海': { value: 'tech', weight: 2 },
  '跨境电商': { value: 'retail', weight: 2 },
  '电商': { value: 'retail', weight: 1 },
  
  // 金融
  '金融': { value: 'finance', weight: 2 },
  '银行': { value: 'finance', weight: 2 },
  '保险': { value: 'finance', weight: 2 },
  '证券': { value: 'finance', weight: 2 },
  '投资': { value: 'finance', weight: 2 },
  '基金': { value: 'finance', weight: 2 },
  
  // 教育
  '教育': { value: 'education', weight: 2 },
  '培训': { value: 'education', weight: 2 },
  '学校': { value: 'education', weight: 2 },
  '在线教育': { value: 'education', weight: 3 },
  
  // 医疗
  '医疗': { value: 'healthcare', weight: 2 },
  '医院': { value: 'healthcare', weight: 2 },
  '医药': { value: 'healthcare', weight: 2 },
  '健康': { value: 'healthcare', weight: 1 },
  
  // 媒体/内容
  '媒体': { value: 'media', weight: 2 },
  '广告': { value: 'media', weight: 2 },
  '传媒': { value: 'media', weight: 2 },
  '内容': { value: 'media', weight: 1 },
  '短视频': { value: 'media', weight: 2 },
  '直播': { value: 'media', weight: 2 },
  
  // 咨询/服务
  '咨询': { value: 'consulting', weight: 2 },
  '服务': { value: 'consulting', weight: 1 },
  '外包': { value: 'consulting', weight: 1 },
  
  // 制造
  '制造': { value: 'manufacturing', weight: 2 },
  '工厂': { value: 'manufacturing', weight: 2 },
  '生产': { value: 'manufacturing', weight: 2 },
  '工业': { value: 'manufacturing', weight: 2 },
  
  // 零售
  '零售': { value: 'retail', weight: 2 },
  '贸易': { value: 'retail', weight: 1 },
  '快消': { value: 'retail', weight: 2 },
  'FMCG': { value: 'retail', weight: 2 },
  
  // 政府/公共
  '政府': { value: 'government', weight: 2 },
  '公共': { value: 'government', weight: 1 },
  '事业单位': { value: 'government', weight: 2 },
  '国企': { value: 'government', weight: 2 },
};

// ============ 岗位识别（增强版）===========
interface JobMatch {
  jobId: string;
  jobName: string;
  category: string;
  industry: string;
  score: number;
  level?: string;
}

// 从所有岗位中智能匹配
function findBestJobMatch(text: string): JobMatch | null {
  const lowerText = text.toLowerCase();
  let bestMatch: JobMatch | null = null;
  let highestScore = 0;

  // 遍历所有岗位类别
  for (const category of JOB_CATEGORIES) {
    for (const subCategory of category.subCategories) {
      for (const job of subCategory.jobs) {
        let score = 0;
        const jobNameLower = job.name.toLowerCase();

        // 1. 直接包含岗位名称（最高权重）
        if (lowerText.includes(jobNameLower)) {
          score += 15;
        }

        // 2. 包含岗位关键词（精确匹配）
        for (const keyword of job.keywords || []) {
          const keywordLower = keyword.toLowerCase();
          // 完全匹配关键词
          if (lowerText.includes(keywordLower)) {
            score += 5;
          }
        }

        // 3. 智能模糊匹配：提取文本中的岗位核心词
        // 例如"HR负责人"应该匹配到"HRD/人力资源总监"
        const textWords = lowerText.split(/[\s,，.。]+/);
        for (const word of textWords) {
          if (word.length >= 2) {
            // 检查是否包含岗位名称的核心部分（但权重降低）
            if (jobNameLower.includes(word) || word.includes(jobNameLower.replace(/[\/\s]/g, ''))) {
              score += 1;
            }
          }
        }

        // 4. 包含默认职责关键词（权重降低）
        for (const resp of job.defaultResponsibilities) {
          if (lowerText.includes(resp.toLowerCase())) {
            score += 1;
          }
        }

        // 5. 行业匹配加分
        if (text.includes(category.name)) {
          score += 2;
        }

        // 6. 负向惩罚：如果包含明显不相关的关键词
        const negativeKeywords = ['app', 'mobile', '移动端', '小程序'];
        for (const neg of negativeKeywords) {
          if (lowerText.includes(neg) && !jobNameLower.includes(neg)) {
            score -= 3;
          }
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = {
            jobId: job.id,
            jobName: job.name,
            category: category.name,
            industry: job.industry,
            score: score,
          };
        }
      }
    }
  }

  // 提高最低分数阈值，减少误识别
  return highestScore >= 5 ? bestMatch : null;
}

// 提取职级并调整岗位名称
function extractLevelAndAdjustJob(text: string, baseJobName: string): { jobName: string; level: string; experience: string } {
  let detectedLevel: LevelInfo | null = null;
  let adjustedJobName = baseJobName;
  let experience = 'mid';

  // 检测职级关键词
  for (const { pattern, info } of LEVEL_PATTERNS) {
    if (pattern.test(text)) {
      if (!detectedLevel || info.weight > detectedLevel.weight) {
        detectedLevel = info;
      }
    }
  }

  // 根据职级调整岗位名称
  if (detectedLevel) {
    experience = detectedLevel.years;
    
    // 特殊处理：HR岗位
    if (baseJobName.includes('HR') || baseJobName.includes('人力资源')) {
      if (detectedLevel.level === 'expert') {
        adjustedJobName = 'HRD/人力资源总监';
      } else if (detectedLevel.level === 'senior') {
        adjustedJobName = 'HR经理/人力资源经理';
      } else if (detectedLevel.level === 'mid') {
        adjustedJobName = 'HR专员/人力资源专员';
      }
    }
    
    // 特殊处理：产品经理
    else if (baseJobName.includes('产品')) {
      if (detectedLevel.level === 'expert') {
        adjustedJobName = '产品总监/CPO';
      } else if (detectedLevel.level === 'senior') {
        adjustedJobName = '高级产品经理';
      } else if (detectedLevel.level === 'mid') {
        adjustedJobName = '产品经理';
      }
    }
    
    // 特殊处理：开发岗位
    else if (baseJobName.includes('开发') || baseJobName.includes('工程师')) {
      if (detectedLevel.level === 'expert') {
        adjustedJobName = baseJobName.replace(/开发|工程师/, '架构师');
      } else if (detectedLevel.level === 'senior') {
        adjustedJobName = '高级' + baseJobName;
      } else if (detectedLevel.level === 'mid') {
        adjustedJobName = baseJobName;
      }
    }
  }

  return { jobName: adjustedJobName, level: detectedLevel?.level || 'mid', experience };
}

// ============ 主解析函数 ============
/**
 * 解析一句话描述，提取岗位信息（增强版）
 */
export function parseJobDescription(text: string): Partial<JobInfo> {
  if (!text || text.trim().length === 0) {
    return {};
  }

  const result: Partial<JobInfo> = {};

  // 1. 智能岗位匹配
  const matchedJob = findBestJobMatch(text);
  
  if (matchedJob) {
    // 2. 提取职级并调整岗位名称
    const { jobName, level, experience } = extractLevelAndAdjustJob(text, matchedJob.jobName);
    
    result.jobTitle = jobName;
    result.industry = matchedJob.industry;
    result.experience = experience;
    
    // 根据职级调整默认职责和技能
    const jobData = getJobDataById(matchedJob.jobId);
    if (jobData) {
      // 高级别增加管理职责
      if (level === 'expert' || level === 'senior') {
        result.mainResponsibilities = [
          ...(jobData.defaultResponsibilities || []),
          '团队管理与建设',
          '战略规划与执行',
          '跨部门协调',
        ];
        result.skills = [
          ...(jobData.defaultSkills || []),
          '团队管理',
          '战略思维',
          '领导力',
        ];
      } else {
        result.mainResponsibilities = jobData.defaultResponsibilities;
        result.skills = jobData.defaultSkills;
      }
      result.tools = jobData.defaultTools;
    }
  }

  // 3. 提取经验年限（如果文本中有明确说明，覆盖职级推断）
  for (const exp of EXPERIENCE_PATTERNS) {
    const match = text.match(exp.pattern);
    if (match) {
      const extracted = exp.extract(match);
      result.experience = extracted.value;
      break;
    }
  }

  // 4. 提取行业（加权匹配）
  if (!result.industry) {
    let bestIndustry = { value: 'other', score: 0 };
    for (const [keyword, data] of Object.entries(INDUSTRY_KEYWORDS)) {
      if (text.includes(keyword)) {
        if (data.weight > bestIndustry.score) {
          bestIndustry = { value: data.value, score: data.weight };
        }
      }
    }
    result.industry = bestIndustry.value;
  }

  // 5. 提取具体职责描述（从原文中提取）
  const extractedResponsibilities = extractResponsibilitiesFromText(text);
  if (extractedResponsibilities.length > 0) {
    result.mainResponsibilities = extractedResponsibilities;
  }

  // 6. 提取技能和工具
  const extractedSkills = extractSkillsFromText(text);
  if (extractedSkills.length > 0) {
    result.skills = extractedSkills;
  }

  const extractedTools = extractToolsFromText(text);
  if (extractedTools.length > 0) {
    result.tools = extractedTools;
  }

  return result;
}

// 辅助函数：根据ID获取岗位数据
function getJobDataById(jobId: string) {
  for (const category of JOB_CATEGORIES) {
    for (const subCategory of category.subCategories) {
      const job = subCategory.jobs.find(j => j.id === jobId);
      if (job) return job;
    }
  }
  return null;
}

// 从文本中提取职责
function extractResponsibilitiesFromText(text: string): string[] {
  const responsibilities: string[] = [];
  
  // 匹配"做..."、"负责..."、"主要..."等模式
  const patterns = [
    /(?:做|负责|主要|工作内容是|日常)([^，。,]+)/g,
    /(?:包括|涉及|涵盖)([^，。,]+)/g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const resp = match[1].trim();
      if (resp.length > 2 && resp.length < 20) {
        responsibilities.push(resp);
      }
    }
  }
  
  return responsibilities.slice(0, 5);
}

// 从文本中提取技能
function extractSkillsFromText(text: string): string[] {
  const skills: string[] = [];
  const skillKeywords = [
    '管理', '沟通', '协调', '分析', '策划', '设计', '开发',
    'Python', 'Java', 'JavaScript', 'SQL', 'Excel', 'PPT',
    '数据分析', '用户研究', '需求分析', '项目管理',
  ];
  
  for (const skill of skillKeywords) {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  }
  
  return skills.slice(0, 5);
}

// 从文本中提取工具
function extractToolsFromText(text: string): string[] {
  const tools: string[] = [];
  const toolKeywords = [
    'ChatGPT', 'Claude', 'Copilot', 'AI',
    'Excel', 'PPT', 'Word', 'Office',
    'Python', 'Java', 'SQL',
    'Figma', 'Sketch', 'Photoshop',
    'Jira', 'Confluence', 'Git',
    '钉钉', '飞书', '企业微信',
  ];
  
  for (const tool of toolKeywords) {
    if (text.includes(tool)) {
      tools.push(tool);
    }
  }
  
  return tools.slice(0, 5);
}

// ============ 其他函数保持不变 ============

export function isParseComplete(parsed: Partial<JobInfo>): boolean {
  return !!(
    parsed.jobTitle &&
    parsed.industry &&
    parsed.experience &&
    parsed.mainResponsibilities &&
    parsed.mainResponsibilities.length > 0
  );
}

export function getMissingFields(parsed: Partial<JobInfo>): string[] {
  const missing: string[] = [];
  
  if (!parsed.jobTitle) missing.push('岗位名称');
  if (!parsed.industry) missing.push('行业');
  if (!parsed.experience) missing.push('经验年限');
  if (!parsed.mainResponsibilities || parsed.mainResponsibilities.length === 0) {
    missing.push('工作职责');
  }
  
  return missing;
}

export function generateParseFeedback(parsed: Partial<JobInfo>, _originalText: string): string {
  const missing = getMissingFields(parsed);
  
  if (missing.length === 0) {
    return `已识别：${parsed.jobTitle} · ${parsed.experience}年经验 · ${parsed.industry}行业`;
  }
  
  if (missing.length <= 2) {
    return `已识别${parsed.jobTitle || '岗位'}，建议补充：${missing.join('、')}`;
  }
  
  return '识别信息有限，建议补充：岗位名称、工作年限、主要职责等';
}

export function autoCompleteJobInfo(parsed: Partial<JobInfo>): JobInfo {
  const defaultInfo: JobInfo = {
    jobTitle: parsed.jobTitle || '未知岗位',
    industry: parsed.industry || 'other',
    experience: parsed.experience || 'mid',
    mainResponsibilities: parsed.mainResponsibilities || ['完成日常工作任务'],
    skills: parsed.skills || ['办公软件'],
    tools: parsed.tools || ['Office'],
    education: parsed.education || 'bachelor',
    salary: parsed.salary || '10-20',
  };

  return {
    ...defaultInfo,
    ...parsed,
  };
}
