import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Copy, 
  Trash2, 
  RotateCcw, 
  History, 
  DollarSign, 
  Percent, 
  ArrowRightLeft,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function GstCalculator() {
  const [amount, setAmount] = useState('10000');
  const [gstRate, setGstRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);
  const [gstType, setGstType] = useState('c-s-gst'); // 'c-s-gst' (CGST+SGST) or 'igst'
  const [history, setHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gst_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Keep history updated in local storage
  useEffect(() => {
    localStorage.setItem('gst_history', JSON.stringify(history));
  }, [history]);

  // Core Math Calculations
  const baseAmount = parseFloat(amount) || 0;
  const rate = parseFloat(gstRate) || 0;

  let calculatedGst = 0;
  let calculatedTotal = 0;
  let calculatedNet = 0;

  if (isInclusive) {
    calculatedTotal = baseAmount;
    calculatedNet = baseAmount / (1 + rate / 100);
    calculatedGst = calculatedTotal - calculatedNet;
  } else {
    calculatedNet = baseAmount;
    calculatedGst = baseAmount * (rate / 100);
    calculatedTotal = baseAmount + calculatedGst;
  }

  const cgst = gstType === 'c-s-gst' ? calculatedGst / 2 : 0;
  const sgst = gstType === 'c-s-gst' ? calculatedGst / 2 : 0;
  const igst = gstType === 'igst' ? calculatedGst : 0;

  // Pie chart variables (SVG Donut Chart)
  const total = calculatedTotal || 1;
  const netPercent = (calculatedNet / total) * 100;
  const taxPercent = (calculatedGst / total) * 100;

  // SVG parameters
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetNet = circumference - (netPercent / 100) * circumference;
  const strokeDashoffsetTax = circumference - (taxPercent / 100) * circumference;

  // Preset Rates
  const presets = [5, 12, 18, 28];

  // Quick amount additions
  const quickAmounts = [100, 500, 1000, 5000, 10000];

  const handleQuickAdd = (value) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + value).toString());
    toast.success(`Added ₹${value.toLocaleString('en-IN')}`, { id: 'amount-add' });
  };

  const handleCopyBreakdown = () => {
    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
    const text = `--- GST Calculation Breakdown ---
Calculation Mode: GST ${isInclusive ? 'Inclusive' : 'Exclusive'}
Tax Rate: ${rate}%
---------------------------------
Net Amount: ${formatter.format(calculatedNet)}
Total GST: ${formatter.format(calculatedGst)}
${gstType === 'c-s-gst' 
  ? `  - CGST (50%): ${formatter.format(cgst)}\n  - SGST (50%): ${formatter.format(sgst)}` 
  : `  - IGST: ${formatter.format(igst)}`}
---------------------------------
Total Amount: ${formatter.format(calculatedTotal)}
---------------------------------
Generated via Digital Heroes Trial GST Tool`;

    navigator.clipboard.writeText(text);
    toast.success('Breakdown copied to clipboard!', {
      icon: '📋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleSaveToHistory = () => {
    if (baseAmount <= 0) {
      toast.error('Please enter a valid amount to save');
      return;
    }

    const newItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: baseAmount,
      rate,
      isInclusive,
      gstType,
      calculatedNet,
      calculatedGst,
      calculatedTotal
    };

    setHistory(prev => [newItem, ...prev.slice(0, 19)]); // Cap at 20 items
    toast.success('Calculation saved to history');
  };

  const handleLoadHistoryItem = (item) => {
    setAmount(item.amount.toString());
    setGstRate(item.rate);
    setIsInclusive(item.isInclusive);
    setGstType(item.gstType);
    toast.success('Loaded calculation from history');
  };

  const handleDeleteHistoryItem = (id, e) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.success('History item deleted');
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  const handleReset = () => {
    setAmount('10000');
    setGstRate(18);
    setIsInclusive(false);
    setGstType('c-s-gst');
    toast.success('Calculator reset');
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full px-4 sm:px-6">
      
      {/* LEFT COLUMN: Input Forms & Settings */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Core Settings Box */}
        <div className="glassmorphism-card rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300">
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-violet-100 dark:bg-violet-950/50 rounded-xl text-violet-600 dark:text-violet-400">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white">Calculator Settings</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Configure your calculations in real-time</p>
              </div>
            </div>
            <button 
              onClick={handleReset}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Reset Fields"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {/* Toggle for Inclusive vs Exclusive */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">GST Calculation Mode</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/55 dark:border-slate-800/40">
              <button
                onClick={() => setIsInclusive(false)}
                className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                  !isInclusive 
                    ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <ArrowRightLeft className="h-4 w-4" />
                GST Exclusive (+ GST)
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                  isInclusive 
                    ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <ArrowRightLeft className="h-4 w-4" />
                GST Inclusive (- GST)
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {isInclusive ? 'Total Amount (Inclusive of GST)' : 'Net Amount (Exclusive of GST)'}
              </label>
              {baseAmount > 0 && (
                <span className="text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-2 py-0.5 rounded-md">
                  Active
                </span>
              )}
            </div>
            
            <div className="relative rounded-2xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 dark:text-slate-500 font-medium text-lg">₹</span>
              </div>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="block w-full pl-9 pr-12 py-4 text-lg font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-slate-400 text-sm">INR</span>
              </div>
            </div>

            {/* Quick Adjust Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAdd(val)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition-colors shadow-sm"
                >
                  +₹{val.toLocaleString('en-IN')}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount('')}
                className="px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-colors shadow-sm ml-auto"
              >
                Clear
              </button>
            </div>
          </div>

          {/* GST Percentage */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                GST Tax Rate
              </label>
              <div className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900 px-3 py-1 rounded-xl">
                <Percent className="h-3.5 w-3.5 text-violet-500" />
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={gstRate}
                  onChange={(e) => setGstRate(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-10 bg-transparent text-sm font-bold text-violet-700 dark:text-violet-300 border-none outline-none p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-sm font-bold text-violet-700 dark:text-violet-300">%</span>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {presets.map((ratePreset) => (
                <button
                  key={ratePreset}
                  type="button"
                  onClick={() => setGstRate(ratePreset)}
                  className={`py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 border ${
                    gstRate === ratePreset
                      ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/25 scale-102'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {ratePreset}%
                </button>
              ))}
            </div>

            {/* Range Slider for Custom Percentages */}
            <div className="space-y-1.5 pt-1">
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={gstRate}
                onChange={(e) => setGstRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>0% Custom</span>
                <span>25% Standard</span>
                <span>50% Luxury</span>
              </div>
            </div>
          </div>

          {/* Tax Distribution Type */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">GST Split / Type</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/55 dark:border-slate-800/40">
              <button
                onClick={() => setGstType('c-s-gst')}
                className={`py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  gstType === 'c-s-gst'
                    ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                Intra-State (CGST + SGST)
              </button>
              <button
                onClick={() => setGstType('igst')}
                className={`py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  gstType === 'igst'
                    ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                Inter-State (IGST)
              </button>
            </div>
          </div>

          {/* Save & Reset Buttons */}
          <div className="pt-2">
            <button
              onClick={handleSaveToHistory}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <History className="h-5 w-5" />
              Save to History
            </button>
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: Results Dashboard */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Receipt / Invoice visual card */}
        <div className="relative overflow-hidden glassmorphism-card rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300 border-t-4 border-t-violet-500">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-violet-100/50 dark:bg-violet-950/40 border border-violet-200/20">
              Live Breakdown Summary
            </span>
            <h3 className="text-2xl font-black font-display text-slate-800 dark:text-white mt-3 leading-none">Calculation Receipt</h3>
          </div>

          {/* Interactive Donut Chart + Central Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 py-4 border-b border-dashed border-slate-200 dark:border-slate-800">
            
            {/* SVG Donut */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                
                {/* Net Amount Segment (Slate Blue) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-violet-500 dark:stroke-violet-600 transition-all duration-500"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffsetNet}
                  strokeLinecap="round"
                />

                {/* Tax Segment (Emerald Green - stacked visually behind offset) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-emerald-500 dark:stroke-emerald-400 transition-all duration-500"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffsetTax}
                  strokeLinecap="round"
                  transform={`rotate(${(netPercent / 100) * 360} 60 60)`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tax ratio</span>
                <span className="text-base font-bold text-slate-800 dark:text-white">
                  {rate.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Core Calculations Breakdown */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block uppercase tracking-wider">
                  Total Payable
                </span>
                <div className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-none mt-1">
                  {formatCurrency(calculatedTotal)}
                </div>
              </div>

              {/* Summary of composition */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
                  <span className="text-slate-600 dark:text-slate-400">Net: {netPercent.toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-slate-600 dark:text-slate-400">GST: {taxPercent.toFixed(0)}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Details Row */}
          <div className="space-y-3 pt-2">
            
            {/* Net Amount */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Net Amount (Base)</span>
              <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(calculatedNet)}</span>
            </div>

            {/* Total GST */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Total GST ({rate}%)</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(calculatedGst)}</span>
            </div>

            {/* Tax splits depending on type */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 mt-2">
              {gstType === 'c-s-gst' ? (
                <>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Central GST (CGST - {(rate / 2).toFixed(1)}%)</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{formatCurrency(cgst)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80 pt-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">State GST (SGST - {(rate / 2).toFixed(1)}%)</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{formatCurrency(sgst)}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Integrated GST (IGST - {rate.toFixed(1)}%)</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{formatCurrency(igst)}</span>
                </div>
              )}
            </div>

          </div>

          {/* Copy breakdown text actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopyBreakdown}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white/80 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Copy className="h-4 w-4" />
              Copy Invoice Text
            </button>
          </div>

        </div>

        {/* History Box */}
        <div className="glassmorphism-card rounded-3xl p-6 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <History className="h-4 w-4 text-violet-500" />
              <h4 className="font-bold text-sm tracking-wide uppercase">Recent Calculations</h4>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
              No recent calculations saved.
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleLoadHistoryItem(item)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-100/50 dark:border-slate-800/30 cursor-pointer group transition-all duration-200"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      ₹{item.amount.toLocaleString('en-IN')} @ {item.rate}%
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-medium">
                      <span>{item.isInclusive ? 'Inclusive' : 'Exclusive'}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {formatCurrency(item.calculatedTotal)}
                    </span>
                    <button
                      onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                      className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
