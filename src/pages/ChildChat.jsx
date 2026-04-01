import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChild } from '../store/DataContext';
import { useTasks } from '../store/TaskStore';
import { processMessage } from '../services/childRouter';
import { Send, ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';

const QUICK_COMMANDS = [
  { label: '📋 Today', value: 'today' },
  { label: '🎯 Goal', value: 'goal' },
  { label: '📊 Status', value: 'status' },
  { label: '💬 Help', value: 'help' },
];

const CHAT_KEY = 'familyDashboardChat';

function loadChatHistory(childId) {
  try {
    const stored = localStorage.getItem(`${CHAT_KEY}_${childId}`);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveChatHistory(childId, messages) {
  try { localStorage.setItem(`${CHAT_KEY}_${childId}`, JSON.stringify(messages.slice(-100))); } catch {}
}

export default function ChildChat() {
  const { childId } = useParams();
  const child = useChild(childId);
  const { checkins } = useTasks();
  const [messages, setMessages] = useState(() => loadChatHistory(childId));
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Show welcome message if no history
  useEffect(() => {
    if (messages.length === 0 && child) {
      const welcome = {
        id: Date.now(),
        from: 'system',
        text: `👋 Hi ${child.name}！我是你的学习小助手。\n\n你可以：\n• 输入 today 查看今天的任务\n• 输入 goal 查看目标进度\n• 输入 status 查看学习状态\n• 输入 update + 内容 记录完成情况\n• 输入 help 请求帮助\n\n试试看吧！`,
        time: new Date().toISOString(),
      };
      setMessages([welcome]);
    }
  }, [child]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save chat history when messages change
  useEffect(() => {
    if (childId && messages.length > 0) saveChatHistory(childId, messages);
  }, [messages, childId]);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!child) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-cream-light">
        <p>找不到这个用户。</p>
      </div>
    );
  }

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), from: 'user', text: text.trim(), time: new Date().toISOString() };
    const result = processMessage(text.trim(), child, checkins);

    const botMsg = {
      id: Date.now() + 1,
      from: 'bot',
      text: result.text,
      time: new Date().toISOString(),
      intent: result.intent,
      risk: result.risk || 'L1',
      alert: result.alert || false,
    };

    // If there's an update, store it
    if (result.updateContent) {
      const updates = JSON.parse(localStorage.getItem(`childUpdates_${childId}`) || '[]');
      updates.push({
        content: result.updateContent,
        timestamp: new Date().toISOString(),
        childId,
      });
      localStorage.setItem(`childUpdates_${childId}`, JSON.stringify(updates));
    }

    // If L2/L3 alert, store for parent
    if (result.alert) {
      const alerts = JSON.parse(localStorage.getItem('parentAlerts') || '[]');
      alerts.push({
        childId,
        childName: child.name,
        text: text.trim(),
        risk: result.risk,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('parentAlerts', JSON.stringify(alerts));
    }

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const riskColor = (risk) => {
    if (risk === 'L3') return 'border-l-4 border-red-500 bg-red-500/10';
    if (risk === 'L2') return 'border-l-4 border-amber-500 bg-amber-500/10';
    return '';
  };

  return (
    <div className="flex flex-col h-screen bg-navy">
      {/* Header */}
      <header className="bg-navy-light px-4 py-3 flex items-center gap-3 border-b border-cream-light/10 shrink-0">
        <Link to={`/child/${childId}`} className="text-cream-light/60 hover:text-cream-light transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-cream-light" />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-cream-light">{child.name}'s Chat</h1>
          <p className="text-[10px] text-cream-light/50">学习小助手 · Child Router MVP</p>
        </div>
        <Sparkles className="w-4 h-4 text-mustard" />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
              msg.from === 'user'
                ? 'bg-teal text-cream-light rounded-br-md'
                : `bg-navy-light text-cream-light/90 rounded-bl-md ${riskColor(msg.risk)}`
            }`}>
              <p className="text-[13px] leading-relaxed whitespace-pre-line">{msg.text}</p>
              <p className={`text-[9px] mt-1 ${msg.from === 'user' ? 'text-cream-light/40' : 'text-cream-light/30'}`}>
                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.risk && msg.risk !== 'L1' && (
                  <span className={`ml-2 ${msg.risk === 'L3' ? 'text-red-400' : 'text-amber-400'}`}>
                    {msg.risk}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Quick Commands */}
      <div className="px-4 py-2 flex gap-2 border-t border-cream-light/5">
        {QUICK_COMMANDS.map(cmd => (
          <button
            key={cmd.value}
            onClick={() => sendMessage(cmd.value)}
            className="px-3 py-1.5 text-[11px] font-medium bg-navy-light text-cream-light/70 rounded-full hover:bg-teal/30 hover:text-cream-light transition-colors"
          >
            {cmd.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 py-3 bg-navy-light border-t border-cream-light/10 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入消息或命令..."
          className="flex-1 bg-navy text-cream-light text-sm px-4 py-2.5 rounded-xl border border-cream-light/10 focus:border-teal focus:outline-none placeholder:text-cream-light/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center text-cream-light disabled:opacity-30 hover:bg-teal-light transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
