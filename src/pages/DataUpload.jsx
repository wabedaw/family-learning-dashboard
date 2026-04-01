import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, MessageSquare, Camera, Pen, Calendar, ArrowLeft, CheckCircle, File, Loader2, AlertCircle, FileUp, Save, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useData, ACTION_MAP } from '../store/DataContext';
import { getLatestReport } from '../data';
import { extractTextFromFile } from '../services/pdfParser';
import { analyzeReport } from '../services/analyzeReport';
import AnalysisResult from '../components/AnalysisResult';
import Avatar from '../components/Avatar';

const uploadTypes = [
  { id: 'report', label: 'Term Report', labelZh: '学期报告 PDF', icon: FileText, color: 'teal', accepts: '.pdf,.txt' },
  { id: 'exam', label: 'Exam / Quiz', labelZh: '考试/测验成绩', icon: File, color: 'teal', accepts: '.pdf,.jpg,.png,.txt' },
  { id: 'newsletter', label: 'Weekly Newsletter', labelZh: '每周校报/通讯', icon: Newspaper, color: 'mustard', accepts: '.txt,.pdf,.eml' },
  { id: 'seesaw', label: 'Homework Record', labelZh: '作业记录', icon: Camera, color: 'coral', accepts: '.jpg,.png,.pdf,.txt' },
  { id: 'parent-note', label: 'Parent Note', labelZh: '家长观察记录', icon: Pen, color: 'wine', accepts: '.txt,.pdf' },
  { id: 'child-reflection', label: 'Weekly Reflection', labelZh: '每周孩子反思', icon: Calendar, color: 'navy', accepts: '.txt,.pdf' },
];

const colorMap = {
  teal: { bg: 'bg-teal-light', border: 'border-teal', text: 'text-teal-dark', hover: 'hover:border-teal-dark' },
  mustard: { bg: 'bg-mustard-light', border: 'border-mustard', text: 'text-mustard', hover: 'hover:border-mustard' },
  coral: { bg: 'bg-coral-light', border: 'border-coral', text: 'text-coral', hover: 'hover:border-coral' },
  wine: { bg: 'bg-wine-light', border: 'border-wine', text: 'text-wine', hover: 'hover:border-wine' },
  navy: { bg: 'bg-teal-light', border: 'border-navy', text: 'text-navy', hover: 'hover:border-navy' },
};

const STATUS = { IDLE: 'idle', EXTRACTING: 'extracting', ANALYZING: 'analyzing', COMPLETE: 'complete', SAVED: 'saved', ERROR: 'error' };

// ─── File Upload Zone ───────────────────────────────────────
function FileUploadZone({ selectedType, onFileSelected, status, lang }) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const handleDrop = useCallback((e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer?.files?.[0]; if (f) onFileSelected(f); }, [onFileSelected]);
  if (!selectedType) return null;
  const c = colorMap[selectedType.color] || colorMap.teal;
  const isProcessing = status === STATUS.EXTRACTING || status === STATUS.ANALYZING;

  return (
    <div className={`relative retro-card border-2 border-dashed p-8 text-center transition-all mb-6 ${dragOver ? `${c.border} ${c.bg}` : 'border-cream-dark'} ${isProcessing ? 'opacity-70 pointer-events-none' : 'cursor-pointer'}`}
      onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
      onClick={() => !isProcessing && fileInputRef.current?.click()}>
      <input ref={fileInputRef} type="file" accept={selectedType.accepts} className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileSelected(f); }} />
      {isProcessing ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-teal animate-spin" />
          <p className="text-sm font-semibold text-navy">
            {status === STATUS.EXTRACTING ? (lang === 'zh' ? '正在提取文本...' : 'Extracting text...') : (lang === 'zh' ? '正在用 AI 分析...' : 'Analyzing with Claude AI...')}
          </p>
          {status === STATUS.ANALYZING && <p className="text-[11px] text-brown-light">{lang === 'zh' ? '这可能需要 10-30 秒' : 'This may take 10-30 seconds'}</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-xl ${c.bg} flex items-center justify-center`}><FileUp className={`w-7 h-7 ${c.text}`} /></div>
          <p className="text-sm font-bold text-navy">{lang === 'zh' ? '拖放文件到这里，或点击选择' : 'Drop file here, or click to select'}</p>
          <p className="text-[11px] text-brown-light mt-1">{lang === 'zh' ? '支持格式' : 'Accepts'}: {selectedType.accepts}</p>
        </div>
      )}
    </div>
  );
}

// ─── Reflection Form ────────────────────────────────────────
function ReflectionForm({ lang, selectedChildId, children: childrenData, dispatch }) {
  const [answers, setAnswers] = useState({ win: '', struggle: '', improve: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveReflection = async () => {
    if (!selectedChildId || !answers.win.trim()) return;
    setSaving(true);
    const child = childrenData.find(c => c.id === selectedChildId);
    const text = `Weekly Reflection:\n1. Learning win: ${answers.win}\n2. Struggle: ${answers.struggle}\n3. Improvement plan: ${answers.improve}`;
    try {
      const latest = getLatestReport(child);
      const ctx = child ? { name: child.name, yearGroup: child.yearGroup, stage: child.stage, focusSubjects: child.focusSubjects, latestSubjects: latest?.subjects?.map(s => ({ name: s.name, attainment: s.attainment, effort: s.effort })) || [] } : null;
      const result = await analyzeReport(text, 'child-reflection', ctx);
      dispatch({ type: 'ADD_REFLECTION', payload: { childId: selectedChildId, data: { ...result, id: `upload-${Date.now()}`, source: 'upload', date: new Date().toISOString().split('T')[0] } } });
      setSaved(true);
      setAnswers({ win: '', struggle: '', improve: '' });
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  return (
    <div className="bg-gradient-to-br from-teal-light to-cream-light rounded-xl border-2 border-cream-dark p-5" style={{ borderRadius: '12px', boxShadow: '3px 3px 0 var(--color-cream-dark)' }}>
      <h3 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-1">{lang === 'zh' ? '每周孩子反思' : 'Weekly Child Reflection'}</h3>
      <p className="text-[11px] text-brown-light uppercase tracking-wider font-semibold mb-4">{lang === 'zh' ? '填写后自动分析并保存' : 'Auto-analyzed and saved after submission'}</p>
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-navy block mb-1">1. {lang === 'zh' ? '这周你有什么学习小成就？' : 'What was a small learning win this week?'}</label>
          <textarea value={answers.win} onChange={e => setAnswers({ ...answers, win: e.target.value })}
            className="w-full p-2 text-sm border-2 border-cream-dark rounded-lg bg-cream-light/70 focus:outline-none focus:ring-2 focus:ring-teal resize-none text-navy" rows={2} />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-navy block mb-1">2. {lang === 'zh' ? '哪个地方你觉得有点难？' : 'Where did you feel it was a bit hard?'}</label>
          <textarea value={answers.struggle} onChange={e => setAnswers({ ...answers, struggle: e.target.value })}
            className="w-full p-2 text-sm border-2 border-cream-dark rounded-lg bg-cream-light/70 focus:outline-none focus:ring-2 focus:ring-teal resize-none text-navy" rows={2} />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-navy block mb-1">3. {lang === 'zh' ? '你觉得可以做得更好的一个地方？' : "What's one thing you could do better?"}</label>
          <textarea value={answers.improve} onChange={e => setAnswers({ ...answers, improve: e.target.value })}
            className="w-full p-2 text-sm border-2 border-cream-dark rounded-lg bg-cream-light/70 focus:outline-none focus:ring-2 focus:ring-teal resize-none text-navy" rows={2} />
        </div>
      </div>
      <button onClick={handleSaveReflection} disabled={saving || !selectedChildId || !answers.win.trim()}
        className={`retro-btn mt-4 w-full py-2 text-sm flex items-center justify-center gap-2 ${saved ? 'bg-teal text-cream-light border-teal' : saving ? 'bg-cream-dark text-brown-light border-cream-dark' : 'bg-teal text-cream-light border-teal'}`}>
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" />{lang === 'zh' ? '分析中...' : 'Analyzing...'}</> :
         saved ? <><CheckCircle className="w-4 h-4" />{lang === 'zh' ? '已保存到个人数据' : 'Saved to profile!'}</> :
         <><Save className="w-4 h-4" />{lang === 'zh' ? '分析并保存' : 'Analyze & Save'}</>}
      </button>
      {!selectedChildId && <p className="text-[10px] text-coral mt-1 text-center">{lang === 'zh' ? '请先选择孩子' : 'Please select a child first'}</p>}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function DataUpload() {
  const { lang } = useLang();
  const { children, dispatch } = useData();

  const [selectedType, setSelectedType] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || '');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [currentFile, setCurrentFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const selectedChild = children.find(c => c.id === selectedChildId);

  // Build child context for Claude
  const buildChildContext = () => {
    if (!selectedChild) return null;
    const latest = getLatestReport(selectedChild);
    return {
      name: selectedChild.name,
      yearGroup: selectedChild.yearGroup,
      stage: selectedChild.stage,
      focusSubjects: selectedChild.focusSubjects,
      latestSubjects: latest?.subjects?.map(s => ({
        name: s.name, attainment: s.attainment, effort: s.effort || s.classwork
      })) || [],
    };
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setStatus(STATUS.IDLE);
    setCurrentFile(null);
    setExtractedText('');
    setAnalysisResult(null);
    setError(null);
  };

  const handleFileSelected = async (file) => {
    setCurrentFile(file);
    setError(null);
    setAnalysisResult(null);

    // Step 1: Extract text
    setStatus(STATUS.EXTRACTING);
    let text;
    try {
      text = await extractTextFromFile(file);
      setExtractedText(text);
    } catch (err) {
      setError(lang === 'zh' ? '文本提取失败' : 'Failed to extract text from file.');
      setStatus(STATUS.ERROR);
      return;
    }
    if (!text || text.trim().length < 20) {
      setError(lang === 'zh' ? '文件内容为空或无法读取' : 'File appears empty or unreadable.');
      setStatus(STATUS.ERROR);
      return;
    }

    // Step 2: Analyze with Claude
    setStatus(STATUS.ANALYZING);
    try {
      const result = await analyzeReport(text, selectedType.id, buildChildContext());
      setAnalysisResult(result);
      setStatus(STATUS.COMPLETE);
    } catch (err) {
      if (err.message === 'MISSING_API_KEY') {
        setError(lang === 'zh' ? '未设置 API Key。请在 .env 文件中设置 VITE_ANTHROPIC_API_KEY。' : 'API key not configured. Set VITE_ANTHROPIC_API_KEY in .env.');
      } else {
        setError(lang === 'zh' ? `分析失败: ${err.message}` : `Analysis failed: ${err.message}`);
      }
      setStatus(STATUS.ERROR);
    }
  };

  // Save analysis result to global store
  const handleSaveToProfile = () => {
    if (!analysisResult || !selectedChildId || !selectedType) return;

    const actionType = ACTION_MAP[selectedType.id];
    if (!actionType) return;

    const docData = {
      ...analysisResult,
      id: `upload-${Date.now()}`,
      source: 'upload',
      uploadDate: new Date().toISOString().split('T')[0],
      fileName: currentFile?.name || 'unknown',
    };

    dispatch({ type: actionType, payload: { childId: selectedChildId, data: docData } });

    setHistory(prev => [{
      id: Date.now(),
      fileName: currentFile?.name || '',
      type: selectedType.id,
      typeName: selectedType.label,
      timestamp: new Date().toLocaleString(),
      childName: selectedChild?.name || '',
      status: 'saved',
    }, ...prev]);

    setStatus(STATUS.SAVED);
  };

  const handleDismissResult = () => {
    setAnalysisResult(null);
    setStatus(STATUS.IDLE);
    setSelectedType(null);
    setCurrentFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-brown-light hover:text-brown"><ArrowLeft className="w-5 h-5" /></Link>
        <Upload className="w-5 h-5 text-teal" />
        <div>
          <h1 className="text-2xl font-black text-navy font-[family-name:var(--font-display)]">{lang === 'zh' ? '数据上传' : 'Upload Data'}</h1>
          <p className="text-[11px] text-brown-light font-semibold">{lang === 'zh' ? '上传学校报告与学习证据 · 自动分析并同步到个人数据' : 'Upload reports & evidence · Auto-analyzed & synced to profile'}</p>
        </div>
      </div>

      {/* Saved Confirmation */}
      {status === STATUS.SAVED && (
        <div className="retro-card border-2 border-teal p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-teal shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-teal-dark">{lang === 'zh' ? '已保存到个人数据！' : 'Saved to profile!'}</p>
            <p className="text-[11px] text-brown-light">{lang === 'zh' ? '数据已同步到仪表盘，可在AI分析页面查看。' : 'Data synced to dashboard. View in AI Analysis page.'}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/child/${selectedChildId}`} className="retro-btn px-3 py-1.5 bg-teal text-cream-light border-teal text-[11px]">
              {lang === 'zh' ? '查看仪表盘' : 'View Dashboard'}
            </Link>
            <button onClick={handleDismissResult} className="retro-btn px-3 py-1.5 bg-cream-light text-navy border-navy text-[11px]">
              {lang === 'zh' ? '继续上传' : 'Upload More'}
            </button>
          </div>
        </div>
      )}

      {/* Analysis Result with Save Button */}
      {analysisResult && status === STATUS.COMPLETE && (
        <div>
          <AnalysisResult result={analysisResult} onDismiss={handleDismissResult} />
          <div className="flex justify-center gap-3 -mt-3 mb-6">
            <button onClick={handleSaveToProfile}
              className="retro-btn px-6 py-2.5 bg-teal text-cream-light border-teal text-sm flex items-center gap-2">
              <Save className="w-4 h-4" />
              {lang === 'zh' ? `保存到 ${selectedChild?.name} 的个人数据` : `Save to ${selectedChild?.name}'s Profile`}
            </button>
            <button onClick={handleDismissResult} className="retro-btn px-4 py-2.5 bg-cream-light text-navy border-navy text-sm">
              {lang === 'zh' ? '取消' : 'Discard'}
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && status === STATUS.ERROR && (
        <div className="retro-card border-2 border-coral p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-coral">{lang === 'zh' ? '错误' : 'Error'}</p>
            <p className="text-[11px] text-brown">{error}</p>
            <div className="flex gap-2 mt-3">
              {currentFile && <button onClick={() => handleFileSelected(currentFile)} className="retro-btn px-3 py-1.5 bg-coral text-cream-light border-coral text-[11px]">{lang === 'zh' ? '重试' : 'Retry'}</button>}
              <button onClick={() => { setError(null); setStatus(STATUS.IDLE); }} className="retro-btn px-3 py-1.5 bg-cream-light text-navy border-navy text-[11px]">{lang === 'zh' ? '取消' : 'Dismiss'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Processing indicator */}
      {currentFile && (status === STATUS.EXTRACTING || status === STATUS.ANALYZING) && (
        <div className="retro-card p-3 mb-4 flex items-center gap-3">
          <FileText className="w-4 h-4 text-teal shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-navy truncate">{currentFile.name}</p>
            <p className="text-[10px] text-brown-light">{(currentFile.size / 1024).toFixed(1)} KB · {selectedChild?.name || ''}</p>
          </div>
          <Loader2 className="w-4 h-4 text-teal animate-spin shrink-0" />
        </div>
      )}

      {/* Main upload flow (hidden when result is showing) */}
      {status !== STATUS.COMPLETE && status !== STATUS.SAVED && (
        <>
          {/* Child Selector */}
          <div className="mb-4">
            <h2 className="text-[11px] font-bold text-brown-light uppercase tracking-wider mb-2">
              {lang === 'zh' ? '选择孩子' : 'Select Child'}
            </h2>
            <div className="flex gap-2">
              {children.map(c => (
                <button key={c.id} onClick={() => setSelectedChildId(c.id)}
                  className={`retro-btn px-4 py-2 text-sm flex items-center gap-1.5 ${selectedChildId === c.id ? 'bg-teal text-cream-light border-teal' : 'bg-cream-light text-navy border-navy'}`}>
                  <Avatar src={c.avatar} size="xs" /> {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Type Selection */}
          <h2 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-3">{lang === 'zh' ? '选择数据类型' : 'Choose Data Type'}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {uploadTypes.map(type => {
              const c = colorMap[type.color] || colorMap.teal;
              const isSelected = selectedType?.id === type.id;
              return (
                <button key={type.id} onClick={() => handleSelectType(type)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all text-center group ${isSelected ? `${c.border} ${c.bg} border-solid shadow-[3px_3px_0] shadow-cream-dark` : `border-dashed ${c.border} bg-cream-light ${c.hover}`}`}>
                  <type.icon className={`w-8 h-8 ${c.text} group-hover:scale-110 transition-transform`} />
                  <div>
                    <h3 className={`text-sm font-bold font-[family-name:var(--font-display)] ${c.text}`}>{lang === 'zh' ? type.labelZh : type.label}</h3>
                  </div>
                  <p className="text-[10px] text-brown-light mt-1">{type.accepts}</p>
                </button>
              );
            })}
          </div>

          {/* File Upload Zone */}
          <FileUploadZone selectedType={selectedType} onFileSelected={handleFileSelected} status={status} lang={lang} />
        </>
      )}

      {/* Extracted Text Preview */}
      {extractedText && (status === STATUS.COMPLETE || status === STATUS.SAVED) && <ExtractedTextPreview text={extractedText} lang={lang} />}

      {/* Upload History */}
      {history.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-navy font-[family-name:var(--font-display)] mb-3">{lang === 'zh' ? '上传历史' : 'Upload History'}</h2>
          <div className="space-y-2">
            {history.map(file => (
              <div key={file.id} className="flex items-center justify-between p-3 retro-card">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-teal" />
                  <div>
                    <p className="text-[12px] font-semibold text-navy">{file.fileName}</p>
                    <p className="text-[10px] text-brown-light">{file.typeName} · {file.childName} · {file.timestamp}</p>
                  </div>
                </div>
                <span className="retro-badge bg-teal-light text-teal-dark border-teal">{lang === 'zh' ? '已保存' : 'Saved'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reflection Form */}
      <ReflectionForm lang={lang} selectedChildId={selectedChildId} children={children} dispatch={dispatch} />
    </div>
  );
}

function ExtractedTextPreview({ text, lang }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="retro-card p-4 mb-6">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full text-left">
        <span className="text-[11px] font-bold text-brown-light uppercase tracking-wider">{lang === 'zh' ? '提取的原始文本' : 'Extracted Raw Text'} ({text.length} chars)</span>
        <span className="text-[11px] text-teal font-semibold">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && <pre className="mt-2 text-[10px] text-brown bg-cream rounded-lg p-3 whitespace-pre-wrap max-h-64 overflow-y-auto">{text}</pre>}
    </div>
  );
}
