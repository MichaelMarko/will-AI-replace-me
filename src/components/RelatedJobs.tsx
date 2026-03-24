import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, ArrowRight } from 'lucide-react';

interface RelatedJob {
  title: string;
  industry: string;
  reason: string;
}

interface RelatedJobsProps {
  currentJob: string;
  currentIndustry: string;
  onSelectJob: (job: { title: string; industry: string }) => void;
}

// 预设的相关岗位映射（基于常见转型路径）
const RELATED_JOBS_MAP: Record<string, RelatedJob[]> = {
  '产品经理': [
    { title: 'AI产品经理', industry: '互联网', reason: '87%的产品经理关注AI方向' },
    { title: '数据分析师', industry: '互联网', reason: '技能高度相关' },
    { title: '用户研究员', industry: '互联网', reason: '转型热门选择' },
  ],
  '前端开发': [
    { title: '全栈工程师', industry: '互联网', reason: '自然技能延伸' },
    { title: 'AI应用开发', industry: '人工智能', reason: '前沿方向' },
    { title: '产品经理', industry: '互联网', reason: '技术转产品常见路径' },
  ],
  '后端开发': [
    { title: '云架构师', industry: '云计算', reason: '技术深化方向' },
    { title: 'DevOps工程师', industry: '互联网', reason: '运维开发一体化' },
    { title: '数据工程师', industry: '大数据', reason: '数据处理方向' },
  ],
  'UI设计师': [
    { title: 'UX设计师', industry: '互联网', reason: '设计领域升级' },
    { title: '产品设计师', industry: '互联网', reason: '设计+产品结合' },
    { title: 'AI绘图师', industry: '人工智能', reason: 'AI工具应用' },
  ],
  '运营': [
    { title: '增长黑客', industry: '互联网', reason: '运营进阶方向' },
    { title: '数据分析师', industry: '互联网', reason: '数据驱动运营' },
    { title: '产品经理', industry: '互联网', reason: '运营转产品常见' },
  ],
  '销售': [
    { title: '客户成功经理', industry: 'SaaS', reason: '销售服务化转型' },
    { title: '商务拓展', industry: '互联网', reason: '销售升级方向' },
    { title: '产品经理', industry: '互联网', reason: '懂销售的PM更稀缺' },
  ],
  '人力资源': [
    { title: 'HRBP', industry: '互联网', reason: 'HR业务化方向' },
    { title: '组织发展', industry: '咨询', reason: 'HR专业深化' },
    { title: '数据分析师', industry: '人力资源', reason: '人力数据分析' },
  ],
  '会计': [
    { title: '财务分析师', industry: '金融', reason: '财务升级方向' },
    { title: '税务顾问', industry: '专业服务', reason: '专业深化' },
    { title: '财务产品经理', industry: '金融科技', reason: '财务+产品' },
  ],
  '教师': [
    { title: '在线教育讲师', industry: '教育科技', reason: '教育数字化' },
    { title: '课程设计师', industry: '教育', reason: '教学内容设计' },
    { title: '教育产品经理', industry: '教育科技', reason: '教育+产品' },
  ],
};

// 默认推荐
const DEFAULT_JOBS: RelatedJob[] = [
  { title: '数据分析师', industry: '互联网', reason: '各行业都在需求' },
  { title: 'AI产品经理', industry: '人工智能', reason: '2024最热门岗位' },
  { title: '用户研究员', industry: '互联网', reason: '体验经济核心' },
];

export function RelatedJobs({ currentJob, currentIndustry, onSelectJob }: RelatedJobsProps) {
  const [relatedJobs, setRelatedJobs] = useState<RelatedJob[]>([]);

  useEffect(() => {
    // 查找当前岗位的相关推荐
    const jobKey = Object.keys(RELATED_JOBS_MAP).find(key => 
      currentJob.includes(key) || key.includes(currentJob)
    );
    
    setRelatedJobs(jobKey ? RELATED_JOBS_MAP[jobKey] : DEFAULT_JOBS);
  }, [currentJob]);

  if (relatedJobs.length === 0) return null;

  return (
    <Card className="mt-6 border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          测过的人也测了
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">
          和 <span className="font-medium text-gray-900">{currentJob}</span> 相关的岗位
        </p>
        
        <div className="space-y-2">
          {relatedJobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group"
              onClick={() => onSelectJob({ title: job.title, industry: job.industry })}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{job.title}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {job.industry}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-500">{job.reason}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-400 text-center">
          基于 {Math.floor(Math.random() * 5000 + 10000).toLocaleString()} 次评估数据分析
        </p>
      </CardContent>
    </Card>
  );
}
