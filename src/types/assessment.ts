// 岗位危险度测试 - 类型定义

// 用户输入的岗位信息
export interface JobInfo {
  jobTitle: string;
  industry: string;
  experience: string;
  mainResponsibilities: string[];
  skills: string[];
  tools: string[];
  education: string;
  salary: string;
}

// 理论暴露度评估结果 (β值)
export interface TheoreticalExposure {
  score: number; // 0-100
  level: 'low' | 'medium' | 'high' | 'very-high';
  factors: ExposureFactor[];
  explanation: string;
}

// 暴露度影响因素
export interface ExposureFactor {
  name: string;
  weight: number; // 0-1
  score: number; // 0-100
  description: string;
}

// 实际渗透率评估结果
export interface ActualPenetration {
  score: number; // 0-100
  level: 'low' | 'medium' | 'high' | 'very-high';
  factors: PenetrationFactor[];
  explanation: string;
}

// 渗透率影响因素
export interface PenetrationFactor {
  name: string;
  weight: number;
  score: number;
  description: string;
}

// 对比分析结果
export interface ComparisonResult {
  gap: number; // 理论暴露度 - 实际渗透率
  gapLevel: 'small' | 'medium' | 'large' | 'very-large';
  riskLevel: 'safe' | 'caution' | 'risky' | 'high-risk';
  conclusion: string;
  insights: string[];
}

// 发展建议
export interface DevelopmentAdvice {
  category: 'immediate' | 'short-term' | 'long-term';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actions: string[];
}

// 标杆人物
export interface RoleModel {
  name: string;
  title: string;
  company: string;
  story: string;
  keyPoints: string[];
  learnable: string[];
}

// 行业案例
export interface IndustryCase {
  industry: string;
  title: string;
  description: string;
  examples: string[];
  trends: string[];
}

// 完整评估结果
export interface AssessmentResult {
  jobInfo: JobInfo;
  theoreticalExposure: TheoreticalExposure;
  actualPenetration: ActualPenetration;
  comparison: ComparisonResult;
  advice: DevelopmentAdvice[];
  roleModels: RoleModel[];
  industryCase: IndustryCase;
  timestamp: string;
}

// 职业数据库条目
export interface OccupationData {
  title: string;
  category: string;
  theoreticalExposure: number;
  actualPenetration: number;
  tasks: string[];
  skills: string[];
  riskTrend: 'rising' | 'stable' | 'falling';
}

// 行业分类
export const INDUSTRIES = [
  { value: 'tech', label: '互联网/科技', riskMultiplier: 1.2 },
  { value: 'finance', label: '金融/银行', riskMultiplier: 1.1 },
  { value: 'education', label: '教育/培训', riskMultiplier: 0.9 },
  { value: 'healthcare', label: '医疗/健康', riskMultiplier: 0.7 },
  { value: 'manufacturing', label: '制造业', riskMultiplier: 0.8 },
  { value: 'retail', label: '零售/电商', riskMultiplier: 1.0 },
  { value: 'media', label: '媒体/广告', riskMultiplier: 1.3 },
  { value: 'consulting', label: '咨询/服务', riskMultiplier: 1.1 },
  { value: 'government', label: '政府/公共', riskMultiplier: 0.6 },
  { value: 'other', label: '其他', riskMultiplier: 1.0 },
] as const;

// 经验水平
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: '应届生/0-2年', riskMultiplier: 1.3 },
  { value: 'junior', label: '初级/2-5年', riskMultiplier: 1.1 },
  { value: 'mid', label: '中级/5-10年', riskMultiplier: 0.9 },
  { value: 'senior', label: '高级/10年以上', riskMultiplier: 0.7 },
] as const;

// 教育水平
export const EDUCATION_LEVELS = [
  { value: 'high-school', label: '高中及以下' },
  { value: 'associate', label: '大专' },
  { value: 'bachelor', label: '本科' },
  { value: 'master', label: '硕士' },
  { value: 'phd', label: '博士' },
] as const;
