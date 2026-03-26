import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Lightbulb,
  RefreshCw,
  Share2,
  Shield,
  TrendingDown,
  TrendingUp,
  Zap,
  Award,
  BookOpen,
  Target,
} from 'lucide-react';
import type { AssessmentResult } from '@/types/assessment';
import { INDUSTRIES, EXPERIENCE_LEVELS } from '@/types/assessment';
import { RelatedJobs } from '@/components/RelatedJobs';
import { trackAssessment } from '@/utils/analytics';

interface ResultPageProps {
  result: AssessmentResult;
  onReset: () => void;
  inputMethod?: 'voice' | 'text' | 'quick-select' | 'resume';
  onSelectRelatedJob?: (job: { title: string; industry: string }) => void;
}

// 二维码组件
function QRCode({ url }: { url: string }) {
  // 使用 QR Server API 生成二维码
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={qrUrl} alt="二维码" className="w-32 h-32" />
      <p className="text-xs text-gray-500">扫码即可测试</p>
    </div>
  );
}

export function ResultPage({ result, onReset, inputMethod = 'text', onSelectRelatedJob }: ResultPageProps) {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // 页面加载时发送分析数据
  useEffect(() => {
    trackAssessment(result, inputMethod);
  }, [result, inputMethod]);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high-risk': return 'bg-red-500';
      case 'risky': return 'bg-orange-500';
      case 'caution': return 'bg-yellow-500';
      case 'safe': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'high-risk': return '高风险';
      case 'risky': return '存在风险';
      case 'caution': return '需要关注';
      case 'safe': return '安全';
      default: return '未知';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'very-high': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'very-high': return '极高';
      case 'high': return '高';
      case 'medium': return '中等';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'low': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'immediate': return '立即行动';
      case 'short-term': return '短期规划';
      case 'long-term': return '长期发展';
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'immediate': return <Zap className="w-4 h-4" />;
      case 'short-term': return <Target className="w-4 h-4" />;
      case 'long-term': return <BookOpen className="w-4 h-4" />;
      default: return null;
    }
  };

  // 生成分享文案
  const generateShareText = () => {
    const riskText = getRiskLevelText(result.comparison.riskLevel);
    const jobTitle = result.jobInfo.jobTitle;
    const theoScore = result.theoreticalExposure.score;
    const actScore = result.actualPenetration.score;
    
    // 根据风险等级和具体分数生成有差异化的文案
    const templates = {
      '高风险': [
        `刚测了下，我的「${jobTitle}」被AI替代的可能性高达${theoScore}%… 这结果看得我后背发凉。你也来测测自己的岗位安不安全 👇`,
        `${theoScore}%… 这是我「${jobTitle}」岗位被AI替代的概率。测完直接沉默了。测测你的 👇`,
        `说实话没想到——我做「${jobTitle}」，AI替代风险居然这么高。各位同行赶紧测一下自己的 👇`,
      ],
      '存在风险': [
        `测了下我的「${jobTitle}」，AI能替代${theoScore}%的工作内容。说实话有点焦虑了… 你呢？测测看 👇`,
        `AI已经能干掉我${theoScore}%的活儿了——我是「${jobTitle}」。这速度比我预想的快多了，你测了吗？👇`,
        `做了个AI岗位风险测评，我的「${jobTitle}」评分不算低… 建议同行都来测一下，做到心里有数 👇`,
      ],
      '需要关注': [
        `测了下我的「${jobTitle}」，目前还行，但AI的进步速度真的不能小看。先测个底，心里有数 👇`,
        `作为「${jobTitle}」，我刚才测了个AI替代风险——暂时安全，但窗口期可能没想象中长。建议你也测一下 👇`,
        `做了个挺专业的AI岗位测评，我的「${jobTitle}」得了一个需要关注的分数。与其焦虑不如先了解 👇`,
      ],
      '安全': [
        `放心了！测了下我的「${jobTitle}」，AI暂时拿我没辙 😎 但我也不敢掉以轻心。你也来测测 👇`,
        `我的「${jobTitle}」目前AI替代风险很低，可以松口气。不过谁知道明年呢？先测个基准线放着 👇`,
        `测完反而安心了——做「${jobTitle}」，AI目前还真替代不了我。但朋友们建议都来测一下，了解趋势不吃亏 👇`,
      ],
    };
    
    const options = templates[riskText as keyof typeof templates] || templates['需要关注'];
    return options[Math.floor(Math.random() * options.length)];
  };

  // 复制分享文案
  const generateShareImage = async () => {
    setIsGeneratingImage(true);
    
    const shareText = generateShareText();
    
    try {
      await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
      alert('分享文案已复制！去朋友圈或微信群粘贴吧~\n\n💡 小技巧：配一张你的测评截图效果更好哦');
    } catch (err) {
      alert('复制失败，请手动复制');
    }
    
    setIsGeneratingImage(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 返回按钮 */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          重新评估
        </button>

        {/* 头部 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">岗位危险度评估报告</h1>
          <p className="text-gray-600">基于 Anthropic Economic Index 研究框架</p>
        </div>

        {/* 总体评估 */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{result.jobInfo.jobTitle}</CardTitle>
                <CardDescription className="mt-1">
                  {INDUSTRIES.find(i => i.value === result.jobInfo.industry)?.label} · 
                  {EXPERIENCE_LEVELS.find(e => e.value === result.jobInfo.experience)?.label}
                </CardDescription>
              </div>
              <Badge className={`${getRiskLevelColor(result.comparison.riskLevel)} text-white text-lg px-4 py-2`}>
                {getRiskLevelText(result.comparison.riskLevel)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{result.comparison.conclusion}</p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {result.comparison.insights.map((insight, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                  <Lightbulb className="w-4 h-4" />
                  {insight}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 双维度对比 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 被替代可能性 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <CardTitle>被AI替代的可能性</CardTitle>
              </div>
              <CardDescription>AI技术理论上能替代你工作的程度</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-gray-900">{result.theoreticalExposure.score}%</span>
                <Badge className={getLevelColor(result.theoreticalExposure.level)}>
                  {getLevelText(result.theoreticalExposure.level)}风险
                </Badge>
              </div>
              <Progress value={result.theoreticalExposure.score} className="h-3" />
              <p className="text-sm text-gray-600">{result.theoreticalExposure.explanation}</p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="factors">
                  <AccordionTrigger className="text-sm">查看影响因素</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {result.theoreticalExposure.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{factor.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={factor.score} className="w-20 h-2" />
                            <span className="text-gray-900 font-medium w-8">{factor.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* AI已渗透程度 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-500" />
                <CardTitle>AI已渗透的程度</CardTitle>
              </div>
              <CardDescription>现在的工作中AI已经被使用的程度</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-gray-900">{result.actualPenetration.score}%</span>
                <Badge className={getLevelColor(result.actualPenetration.level)}>
                  {getLevelText(result.actualPenetration.level)}
                </Badge>
              </div>
              <Progress value={result.actualPenetration.score} className="h-3" />
              <p className="text-sm text-gray-600">{result.actualPenetration.explanation}</p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="factors">
                  <AccordionTrigger className="text-sm">查看影响因素</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {result.actualPenetration.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{factor.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={factor.score} className="w-20 h-2" />
                            <span className="text-gray-900 font-medium w-8">{factor.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* 差距分析 */}
        <Card>
          <CardHeader>
            <CardTitle>你还有多久的准备时间？</CardTitle>
            <CardDescription>评估AI替代你的速度和你的准备窗口期</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{result.theoreticalExposure.score}%</div>
                <div className="text-sm text-gray-500">AI能替代的程度</div>
              </div>
              <div className="flex items-center">
                <ChevronRight className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{result.actualPenetration.score}%</div>
                <div className="text-sm text-gray-500">现在已经替代的程度</div>
              </div>
              <div className="flex items-center">
                <ChevronRight className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${result.comparison.gap >= 30 ? 'text-red-600' : 'text-gray-600'}`}>
                  {result.comparison.gap}%
                </div>
                <div className="text-sm text-gray-500">差距值</div>
              </div>
            </div>
            
            {result.comparison.gap >= 30 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">转型窗口期提示</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      您的岗位存在较大的理论-实际差距（{result.comparison.gap}%），
                      这意味着AI技术虽然具备替代潜力，但实际应用仍处于早期阶段。
                      您有{result.comparison.gap > 40 ? '2-3年' : '1-2年'}的窗口期进行技能升级和转型准备。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 行业案例 */}
        {result.industryCase && (
          <Card>
            <CardHeader>
              <CardTitle>行业实践案例</CardTitle>
              <CardDescription>{result.industryCase.title}的AI应用现状</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{result.industryCase.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">典型案例</h4>
                <ul className="space-y-2">
                  {result.industryCase.examples.slice(0, 3).map((example, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-blue-500 mt-1">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">发展趋势</h4>
                <ul className="space-y-2">
                  {result.industryCase.trends.slice(0, 2).map((trend, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 标杆人物 */}
        {result.roleModels && result.roleModels.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                <CardTitle>标杆人物学习</CardTitle>
              </div>
              <CardDescription>看看业内优秀人士如何在AI时代转型</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.roleModels.map((roleModel, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {roleModel.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{roleModel.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {roleModel.title}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{roleModel.company}</p>
                        <p className="text-sm text-gray-700 mb-3">{roleModel.story}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-gray-500">核心亮点：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {roleModel.keyPoints.map((point, i) => (
                                <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                                  {point}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-xs font-medium text-gray-500">可以学习：</span>
                            <ul className="mt-1 space-y-1">
                              {roleModel.learnable.map((item, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                  <Target className="w-3 h-3 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 发展建议 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <CardTitle>发展建议</CardTitle>
            </div>
            <CardDescription>基于评估结果的个性化职业发展建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.advice.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(item.priority)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          {getCategoryIcon(item.category)}
                          {getCategoryText(item.category)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <ul className="space-y-1">
                        {item.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-center gap-2 text-sm text-gray-700">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 相关岗位推荐 */}
        {onSelectRelatedJob && (
          <RelatedJobs
            currentJob={result.jobInfo.jobTitle}
            currentIndustry={result.jobInfo.industry}
            onSelectJob={onSelectRelatedJob}
          />
        )}

        {/* 分享卡片 */}
        <Card ref={shareCardRef} className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">AI 会替代我的工作吗？</h3>
                <p className="text-blue-100 mb-4">
                  我是「{result.jobInfo.jobTitle}」，被替代的可能性：{result.theoreticalExposure.score}%
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{result.theoreticalExposure.score}%</div>
                    <div className="text-sm text-blue-200">被替代可能性</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{result.actualPenetration.score}%</div>
                    <div className="text-sm text-blue-200">AI已渗透程度</div>
                  </div>
                </div>
                <p className="text-sm text-blue-100">
                  扫码测测你被替代的可能性 👇
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <QRCode url={window.location.href} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={generateShareImage}
            disabled={isGeneratingImage}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            {isGeneratingImage ? '生成中...' : '分享结果'}
          </Button>
          <Button 
            onClick={onReset}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            重新评估
          </Button>
        </div>

        {/* 页脚 */}
        <div className="text-center text-sm text-gray-500 pt-8">
          <p>数据来源：Anthropic Economic Index (2026)</p>
          <p className="mt-1">评估结果仅供参考，请结合实际情况做出职业决策</p>
        </div>
      </div>
    </div>
  );
}
