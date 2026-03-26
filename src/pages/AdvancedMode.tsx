import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  FileText, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
  Wrench
} from 'lucide-react';
import { JOB_CATEGORIES, EXPERIENCE_OPTIONS, SKILL_TAGS, TOOL_TAGS, getJobById } from '@/data/jobCategories';
import type { JobInfo } from '@/types/assessment';
import * as pdfjs from 'pdfjs-dist';

// 设置 PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface AdvancedModeProps {
  onSubmit: (jobInfo: JobInfo, method: 'quick-select' | 'resume') => void;
  onBack: () => void;
}

type Step = 'category' | 'subcategory' | 'job' | 'experience' | 'tags';

export function AdvancedMode({ onSubmit, onBack }: AdvancedModeProps) {
  // 快速选择状态
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // 简历上传状态
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [parsedResume, setParsedResume] = useState<Partial<JobInfo> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 获取当前选中的分类数据
  const currentCategory = selectedCategory 
    ? JOB_CATEGORIES.find(c => c.id === selectedCategory) 
    : null;
  const currentSubCategory = selectedCategory && selectedSubCategory
    ? currentCategory?.subCategories.find(s => s.id === selectedSubCategory)
    : null;

  // 处理文件上传
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      setUploadError('请上传 PDF 格式的简历');
      return;
    }

    // 检查文件大小（最大 5MB）
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('文件大小不能超过 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item: any) => item.str).join(' ') + ' ';
      }

      // 解析简历文本
      const parsed = parseResumeText(fullText);
      setParsedResume(parsed);
    } catch (error) {
      console.error('简历解析错误:', error);
      setUploadError('简历解析失败，请尝试手动填写');
    } finally {
      setIsUploading(false);
    }
  }, []);

  // 简单简历文本解析
  const parseResumeText = (text: string): Partial<JobInfo> => {
    const result: Partial<JobInfo> = {};
    
    // 提取岗位名称（常见的岗位关键词）
    const jobPatterns = [
      /(产品经理|工程师|设计师|运营|开发|测试|销售|市场|HR|财务|教师|医生)/,
      /(Java|Python|前端|后端|算法|UI|UX|数据分析)/,
    ];
    
    for (const pattern of jobPatterns) {
      const match = text.match(pattern);
      if (match) {
        result.jobTitle = match[0];
        break;
      }
    }

    // 提取经验年限
    const expMatch = text.match(/(\d+)\s*年/);
    if (expMatch) {
      const years = parseInt(expMatch[1]);
      if (years <= 2) result.experience = 'entry';
      else if (years <= 5) result.experience = 'junior';
      else if (years <= 10) result.experience = 'mid';
      else result.experience = 'senior';
    }

    // 提取技能关键词
    const skillKeywords = ['Python', 'Java', 'JavaScript', 'SQL', 'Excel', 'PPT', 'Figma', 'Sketch', 'Photoshop', '数据分析'];
    const skills: string[] = [];
    for (const skill of skillKeywords) {
      if (text.includes(skill)) {
        skills.push(skill);
      }
    }
    if (skills.length > 0) {
      result.skills = skills;
    }

    return result;
  };

  // 提交快速选择结果
  const submitQuickSelect = () => {
    if (!selectedJob) return;
    
    const job = getJobById(selectedJob);
    if (!job) return;

    const jobInfo: JobInfo = {
      jobTitle: job.name,
      industry: job.industry,
      experience: selectedExperience || 'mid',
      mainResponsibilities: job.defaultResponsibilities,
      skills: selectedSkills.length > 0 ? selectedSkills : job.defaultSkills,
      tools: selectedTools.length > 0 ? selectedTools : job.defaultTools,
      education: 'bachelor',
      salary: '15-25',
    };

    onSubmit(jobInfo, 'quick-select');
  };

  // 提交简历解析结果
  const submitResumeResult = () => {
    const jobInfo: JobInfo = {
      jobTitle: parsedResume?.jobTitle || '未知岗位',
      industry: parsedResume?.industry || 'other',
      experience: parsedResume?.experience || 'mid',
      mainResponsibilities: parsedResume?.mainResponsibilities || ['完成日常工作任务'],
      skills: parsedResume?.skills || ['办公软件'],
      tools: parsedResume?.tools || ['Office'],
      education: parsedResume?.education || 'bachelor',
      salary: parsedResume?.salary || '10-20',
    };
    onSubmit(jobInfo, 'resume');
  };

  // 渲染步骤指示器
  const renderStepIndicator = () => {
    const steps = [
      { key: 'category', label: '大类' },
      { key: 'subcategory', label: '细类' },
      { key: 'job', label: '岗位' },
      { key: 'experience', label: '经验' },
      { key: 'tags', label: '技能' },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === step);

    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((s, index) => (
          <div key={s.key} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStepIndex 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {index < currentStepIndex ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${
                index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  // 渲染快速选择内容
  const renderQuickSelectContent = () => {
    switch (step) {
      case 'category':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">选择你的职业大类</h3>
            <div className="grid grid-cols-2 gap-3">
              {JOB_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setStep('subcategory');
                  }}
                  className="p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'subcategory':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setStep('category')} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">选择细分领域</h3>
            </div>
            <div className="space-y-2">
              {currentCategory?.subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubCategory(sub.id);
                    setStep('job');
                  }}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="font-medium">{sub.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {sub.jobs.length} 个相关岗位
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'job':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setStep('subcategory')} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">选择具体岗位</h3>
            </div>
            <div className="space-y-2">
              {currentSubCategory?.jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job.id);
                    setStep('experience');
                  }}
                  className={`w-full p-4 border rounded-xl transition-all text-left ${
                    selectedJob === job.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">{job.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {job.keywords.slice(0, 3).join(' · ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setStep('job')} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">选择工作经验</h3>
            </div>
            <div className="space-y-2">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <button
                  key={exp.value}
                  onClick={() => {
                    setSelectedExperience(exp.value);
                    setStep('tags');
                  }}
                  className={`w-full p-4 border rounded-xl transition-all text-left ${
                    selectedExperience === exp.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">{exp.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <button onClick={() => setStep('experience')} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">选择你的技能标签（多选）</h3>
            </div>
            
            {/* 技能标签 */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                核心技能
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILL_TAGS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setSelectedSkills(prev => 
                      prev.includes(skill)
                        ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                      );
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* 工具标签 */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                <Wrench className="w-4 h-4" />
                常用工具
              </div>
              <div className="flex flex-wrap gap-2">
                {TOOL_TAGS.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => {
                      setSelectedTools(prev => 
                        prev.includes(tool)
                          ? prev.filter(t => t !== tool)
                          : [...prev, tool]
                      );
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      selectedTools.includes(tool)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* 提交按钮 */}
            <Button 
              onClick={submitQuickSelect}
              className="w-full"
              size="lg"
            >
              开始评估
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          返回一句话评估
        </button>

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="quick">⚡ 30秒快速选择</TabsTrigger>
            <TabsTrigger value="resume">📄 上传简历</TabsTrigger>
          </TabsList>

          {/* 快速选择 */}
          <TabsContent value="quick">
            <Card>
              <CardContent className="p-6">
                {renderStepIndicator()}
                {renderQuickSelectContent()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 简历上传 */}
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  上传简历（PDF格式）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 隐私提示 */}
                <div className="flex items-start gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">🔒 本地解析，绝对保密</p>
                    <p className="text-green-600 mt-1">
                      简历仅在您的浏览器中解析，不会上传到任何服务器。解析完成后立即删除，请放心使用。
                    </p>
                  </div>
                </div>

                {/* 上传区域 */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                      <p className="text-gray-600">正在解析简历...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="w-10 h-10 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-700">点击上传简历</p>
                        <p className="text-sm text-gray-500 mt-1">支持 PDF 格式，最大 5MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 错误提示 */}
                {uploadError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {uploadError}
                  </div>
                )}

                {/* 解析结果 */}
                {parsedResume && (
                  <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-blue-800 font-medium">
                      <FileText className="w-4 h-4" />
                      解析结果
                    </div>
                    <div className="space-y-2 text-sm">
                      {parsedResume.jobTitle && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">岗位：</span>
                          <span className="font-medium">{parsedResume.jobTitle}</span>
                        </div>
                      )}
                      {parsedResume.experience && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">经验：</span>
                          <span className="font-medium">
                            {EXPERIENCE_OPTIONS.find(e => e.value === parsedResume.experience)?.label}
                          </span>
                        </div>
                      )}
                      {parsedResume.skills && parsedResume.skills.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">技能：</span>
                          <span className="font-medium">{parsedResume.skills.join('、')}</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={submitResumeResult}
                      className="w-full mt-4"
                    >
                      使用解析结果开始评估
                    </Button>
                  </div>
                )}

                {/* 提示 */}
                <div className="text-sm text-gray-500 space-y-1">
                  <p>💡 提示：</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>请确保简历中包含岗位名称、工作年限等信息</li>
                    <li>解析结果可能不完整，评估时会有默认补全</li>
                    <li>如需更精准评估，建议使用"30秒快速选择"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
