import React from 'react';
import GstCalculator from './components/GstCalculator';
import ThemeToggle from './components/ThemeToggle';
import { Toaster } from 'react-hot-toast';
import { ShieldCheck, Mail, User, Heart, ExternalLink } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Gradients for Premium Visual Effect */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-violet-500/10 via-indigo-500/5 to-transparent dark:from-violet-950/20 dark:via-indigo-950/10 dark:to-transparent pointer-events-none"></div>
      <div className="absolute top-[30%] -right-48 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/2 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] -left-48 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/2 rounded-full blur-3xl pointer-events-none"></div>

      <header className="relative z-10 border-b border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-600 rounded-2xl blur-sm opacity-30 animate-pulse"></div>
              <div className="relative h-11 w-11 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-violet-500/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest block leading-none">
                Smart Tax Suite
              </span>
              <h1 className="text-xl font-black font-display tracking-tight text-slate-900 dark:text-white mt-1">
                GST Calculator
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Developer Details Quick Badge */}
            <div className="hidden sm:flex items-center gap-2.5 bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 px-4 py-2 rounded-2xl shadow-sm text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <User className="h-3.5 w-3.5 text-violet-500" />
                <span>Rohit Kumar</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Mail className="h-3.5 w-3.5 text-violet-500" />
                <span>kumarrohit23502@gmail.com</span>
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow py-10 sm:py-14 flex items-center">
        <GstCalculator />
      </main>

      {/* Footer Area with Required Assignment Buttons */}
      <footer className="relative z-10 border-t border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/30 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Mandatory Developer Details for assignment */}
          <div className="text-center md:text-left space-y-1.5">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Developer Profile
            </p>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Rohit Kumar
            </h4>
            <a 
              href="mailto:kumarrohit23502@gmail.com" 
              className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline flex items-center justify-center md:justify-start gap-1"
            >
              <Mail className="h-3 w-3" />
              kumarrohit23502@gmail.com
            </a>
          </div>

          {/* Mandatory Button: Built for Digital Heroes */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-extrabold tracking-wide text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 scale-100 hover:scale-102"
              id="built-for-digital-heroes-btn"
            >
              <span>Built for Digital Heroes</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="text-center md:text-right text-xs font-medium text-slate-400 dark:text-slate-500">
            <p className="flex items-center justify-center md:justify-end gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for the Trial Assignment
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} • Free Tier Deployment
            </p>
          </div>

        </div>
      </footer>

      {/* Elegant Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-slate-900 dark:text-white dark:border dark:border-slate-800 text-sm font-medium',
          duration: 3000,
        }}
      />
    </div>
  );
}

export default App;