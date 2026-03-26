import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { parseJobDescription, generateParseFeedback, autoCompleteJobInfo } from '@/utils/textParser';
import type { JobInfo } from '@/types/assessment';

interface SimpleInputProps {
  onSubmit: (jobInfo: JobInfo, method: 'voice' | 'text') => void;
  onAdvancedMode: () => void;
  initialJobInfo?: JobInfo | null;
}

// 示例文案
const EXAMPLES = [
  '我是做AI出海产品的产品经理，做了3年，主要是做情感陪伴类的App，平时写需求文档、做用户调研、跟开发对接',
  '我是Java后端开发，5年经验，做电商系统的订单和支付模块，用Spring Boot和MySQL',
  '我在互联网公司做用户运营，2年经验，主要负责用户增长和活动策划，用Excel和神策数据分析',
  '我是B端UI设计师，4年经验，做SaaS产品的界面设计，用Figma和Sketch',
];

export function SimpleInput({ onSubmit, onAdvancedMode, initialJobInfo }: SimpleInputProps) {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setParsedInfo] = useState<Partial<JobInfo> | null>(null);
  const [feedback, setFeedback] = useState('');
  const [speechError, setSpeechError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 检测是否在安全上下文中（支持语音）
  const isSecureContext = typeof window !== 'undefined' && (
    window.isSecureContext || 
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );

  // 恢复之前输入的岗位信息
  useEffect(() => {
    if (initialJobInfo) {
      const parts: string[] = [];
      if (initialJobInfo.jobTitle && initialJobInfo.jobTitle !== '未知岗位') {
        parts.push(`我是${initialJobInfo.jobTitle}`);
      }
      if (initialJobInfo.experience) {
        parts.push(`${initialJobInfo.experience}年经验`);
      }
      if (initialJobInfo.mainResponsibilities?.length) {
        parts.push(`主要做${initialJobInfo.mainResponsibilities.join('、')}`);
      }
      if (initialJobInfo.skills?.length) {
        parts.push(`擅长${initialJobInfo.skills.join('、')}`);
      }
      if (parts.length) {
        setInputText(parts.join('，'));
      }
    }
  }, [initialJobInfo]);
  
  // 检测浏览器支持
  const isSpeechSupported = typeof window !== 'undefined' && 
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // 初始化语音识别
  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        console.log('浏览器不支持语音识别');
        return;
      }

      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false; // 改为false，避免自动停止问题
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInputText((prev) => {
            const newText = prev ? prev + finalTranscript : finalTranscript;
            return newText;
          });
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('语音识别错误:', event.error, event.message);
        // 不显示alert，静默处理常见错误
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          console.log('语音识别出错，请重试');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    };

    initSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // 忽略停止时的错误
        }
      }
    };
  }, []);

  // 实时解析输入
  useEffect(() => {
    if (inputText.length > 5) {
      const parsed = parseJobDescription(inputText);
      setParsedInfo(parsed);
      setFeedback(generateParseFeedback(parsed, inputText));
    } else {
      setParsedInfo(null);
      setFeedback('');
    }
  }, [inputText]);

  const toggleListening = async () => {
    // 检查浏览器支持
    if (!isSpeechSupported) {
      setSpeechError('您的浏览器不支持语音识别，请使用Chrome或Edge浏览器');
      return;
    }

    // 检查安全上下文
    if (!isSecureContext) {
      setSpeechError('语音功能需要在HTTPS或localhost环境下使用');
      return;
    }

    if (!recognitionRef.current) {
      setSpeechError('语音识别初始化失败，请刷新页面重试');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('停止录音失败', e);
      }
      setIsListening(false);
      setSpeechError('');
    } else {
      try {
        // 请求麦克风权限
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // 清空之前的识别结果，重新开始
        recognitionRef.current.abort?.();
        
        // 短暂延迟后启动，避免冲突
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
            setIsListening(true);
            setSpeechError('');
          } catch (e) {
            console.error('启动语音识别失败:', e);
            setSpeechError('启动语音失败，请手动输入');
          }
        }, 100);
      } catch (err) {
        console.error('麦克风权限被拒绝:', err);
        setSpeechError('需要麦克风权限，请在浏览器中打开并允许访问麦克风');
      }
    }
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    // 模拟处理延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const parsed = parseJobDescription(inputText);
    const completeInfo = autoCompleteJobInfo(parsed);
    
    // 判断输入方式：如果最后输入来自语音，标记为voice
    const method: 'voice' | 'text' = isListening ? 'voice' : 'text';
    onSubmit(completeInfo, method);
    setIsProcessing(false);
  };

  const applyExample = (example: string) => {
    setInputText(example);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const canSubmit = inputText.trim().length > 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">基于 Anthropic Economic Index 研究</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">AI 会替代你的工作吗？</h1>
          <p className="text-lg text-gray-600">说一句话，测测你的岗位危险度</p>
        </div>

        {/* 主输入区 */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-6 space-y-6">
            {/* 输入框 */}
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="描述你的工作，比如：我是做AI出海产品的产品经理，做了3年，主要是做情感陪伴类的App..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[160px] text-base resize-none pr-12"
              />
              {/* 语音按钮 */}
              <button
                onClick={toggleListening}
                disabled={!isSpeechSupported}
                className={`absolute right-3 bottom-3 p-2 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : !isSpeechSupported
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={
                  !isSpeechSupported 
                    ? '当前环境不支持语音，请在Chrome/Edge浏览器中打开'
                    : isListening 
                    ? '点击停止录音' 
                    : '点击开始语音输入'
                }
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>

            {/* 语音提示 */}
            {isListening && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                正在录音，请说话...
              </div>
            )}

            {/* 语音错误提示 */}
            {speechError && (
              <div className="flex items-start gap-2 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                <span className="text-lg">⚠️</span>
                <div>
                  <p>{speechError}</p>
                  {!isSpeechSupported && (
                    <p className="text-xs text-orange-500 mt-1">
                      建议使用 Chrome 或 Edge 浏览器访问
                    </p>
                  )}
                  {speechError.includes('麦克风') && (
                    <p className="text-xs text-orange-500 mt-1">
                      点击地址栏 🔒 图标，允许麦克风权限
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 解析反馈 */}
            {feedback && !speechError && (
              <div className="flex items-start gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            {/* 提交按钮 */}
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isProcessing}
              className="w-full h-14 text-lg font-semibold"
              size="lg"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  分析中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  开始评估
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 示例 */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">💡 不知道怎么描述？参考这些例子：</p>
          <div className="space-y-2">
            {EXAMPLES.map((example, index) => (
              <button
                key={index}
                onClick={() => applyExample(example)}
                className="w-full text-left p-3 bg-white/70 hover:bg-white rounded-lg text-sm text-gray-600 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        {/* 高级模式入口 */}
        <div className="mt-8 text-center">
          <button
            onClick={onAdvancedMode}
            className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4"
          >
            高级模式：30秒快速选择 / 上传简历
          </button>
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center space-y-2 text-sm text-gray-500">
          <p>🔒 本地处理，数据不上传服务器，绝对保密</p>
          <p>数据来源：Anthropic Economic Index (2026)</p>
        </div>
      </div>
    </div>
  );
}
