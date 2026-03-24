// 数据分析服务 - Google Analytics + Supabase
import { createClient } from '@supabase/supabase-js';
import type { AssessmentResult } from '@/types/assessment';

// Google Analytics 4 配置
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // 需要替换为实际的GA ID

// Supabase 配置 - 使用匿名项目
// 注意：这是公开的项目，仅用于匿名统计
const SUPABASE_URL = 'https://your-project.supabase.co'; // 需要替换
const SUPABASE_ANON_KEY = 'your-anon-key'; // 需要替换

let supabase: ReturnType<typeof createClient> | null = null;

// 初始化 Supabase
export const initAnalytics = () => {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'https://your-project.supabase.co') {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  
  // 加载 Google Analytics
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    loadGoogleAnalytics();
  }
};

// 加载 GA4
const loadGoogleAnalytics = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true, // 匿名化IP
  });
};

// 发送页面浏览事件
export const trackPageView = (page: string) => {
  // GA4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: page,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

// 发送评估完成事件
export const trackAssessment = async (
  result: AssessmentResult,
  inputMethod: 'voice' | 'text' | 'quick-select' | 'resume'
) => {
  const {
    jobInfo,
    theoreticalExposure,
    actualPenetration,
    comparison,
  } = result;

  // GA4 事件
  if (window.gtag) {
    window.gtag('event', 'assessment_complete', {
      job_title: jobInfo.title,
      industry: jobInfo.industry,
      experience: jobInfo.experience,
      theoretical_score: theoreticalExposure.score,
      actual_score: actualPenetration.score,
      gap: comparison.gap,
      risk_level: comparison.riskLevel,
      input_method: inputMethod,
    });
  }

  // Supabase 匿名存储
  if (supabase) {
    try {
      await supabase.from('assessments').insert({
        job_title: jobInfo.title,
        industry: jobInfo.industry,
        experience: jobInfo.experience,
        theoretical_score: theoreticalExposure.score,
        actual_score: actualPenetration.score,
        gap: comparison.gap,
        risk_level: comparison.riskLevel,
        input_method: inputMethod,
        created_at: new Date().toISOString(),
        // 不存储任何个人身份信息
      });
    } catch (e) {
      console.log('数据存储失败（不影响使用）:', e);
    }
  }
};

// 获取热门岗位统计（用于"测过的人也测了"）
export const getPopularJobs = async (currentJob: string, limit: number = 3) => {
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('job_title, industry, count')
      .neq('job_title', currentJob)
      .order('count', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.log('获取统计数据失败:', e);
    return [];
  }
};

// 获取趋势数据
export const getTrends = async () => {
  if (!supabase) return null;
  
  try {
    // 获取最近7天的评估数量
    const { data: recentData } = await supabase
      .from('assessments')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
    
    // 获取高风险岗位TOP5
    const { data: highRiskJobs } = await supabase
      .from('assessments')
      .select('job_title, avg(theoretical_score)')
      .gte('theoretical_score', 70)
      .group('job_title')
      .order('avg', { ascending: false })
      .limit(5);
    
    return {
      recentCount: recentData?.length || 0,
      highRiskJobs: highRiskJobs || [],
    };
  } catch (e) {
    console.log('获取趋势失败:', e);
    return null;
  }
};

// 声明全局类型
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
