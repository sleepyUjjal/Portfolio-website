import { useState, useEffect, useRef } from 'react';
import MacWindow from '../MacWindow/MacWindow';
import { projectData } from '../../data/projects';
import './Terminal.css';

const MY_QUOTE = '"Sorry, I wanted to write something myself." — Ujjal';

const FORTUNES = [
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Programming isn\'t about what you know; it\'s about what you can figure out." — Chris Pine',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Fix the cause, not the symptom." — Steve Maguire',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Every great developer you know got there by solving problems they were unqualified to solve until they actually did it." — Patrick McKenzie',
  MY_QUOTE
];

const NEOFETCH_ART = `
\x1b[cyan]                 ,xNMM.           \x1b[white]ujjal\x1b[reset]@\x1b[white]portfolio\x1b[reset]
\x1b[cyan]               .OMMMMo           ─────────────────
\x1b[cyan]               OMMM0,            \x1b[white]OS:\x1b[reset] macOS Portfolio 1.0
\x1b[cyan]     .;loddo:' loolloddol;.      \x1b[white]Host:\x1b[reset] ujjal.dev
\x1b[cyan]   cKMMMMMMMMMMNWMMMMMMMMMM0:    \x1b[white]Shell:\x1b[reset] zsh 5.9
\x1b[cyan]  .KMMMMMMMMMMMMMMMMMMMMMMMWd.   \x1b[white]Terminal:\x1b[reset] Portfolio Terminal
\x1b[cyan]  XMMMMMMMMMMMMMMMMMMMMMMMX.     \x1b[white]CPU:\x1b[reset] Brain™ @ Overclock
\x1b[cyan] ;MMMMMMMMMMMMMMMMMMMMMMMM:      \x1b[white]Memory:\x1b[reset] Infinite Curiosity
\x1b[cyan] :MMMMMMMMMMMMMMMMMMMMMMMM:      \x1b[white]Uptime:\x1b[reset] Always Learning
\x1b[cyan] .MMMMMMMMMMMMMMMMMMMMMMMMX.     \x1b[white]Packages:\x1b[reset] 5 (projects)
\x1b[cyan]  kMMMMMMMMMMMMMMMMMMMMMMMMWd.   \x1b[white]Theme:\x1b[reset] Dark Mode
\x1b[cyan]  .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
\x1b[cyan]   .XMMMMMMMMMMMMMMMMMMMMMMMMK.
\x1b[cyan]     kMMMMMMMMMMMMMMMMMMMMMMd
\x1b[cyan]      ;KMMMMMMMWXXWMMMMMMMk.
\x1b[cyan]        .cooc,.    .,coo:.
`;

const TEA_ART = `
         (
          )    )
        ______(____
        |          |\_
        |  ~~~~~~  |  |
        |   TEA    |  |
        |  ~~~~~~  |  |
        |__________|_/
       /____________\\
       \\____________/

  🍵 Brewing chai...
  Status: Chai-powered & Ready!
`;

const MATRIX_CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890:・."=*+-<>¦|╌';

function Terminal({ onClose, onOpenFolder, onOpenApp, zIndex, onFocus, onMinimize }) {
  const githubUrl = import.meta.env.GITHUB || 'https://github.com/sleepyUjjal';
  const linkedinUrl = import.meta.env.LINKEDIN || 'https://linkedin.com';
  const emailAddress = import.meta.env.EMAIL || 'your@email.com';

  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Portfolio Terminal v1.0', className: 'terminal__welcome' },
    { type: 'output', content: 'Type "help" to see available commands.\n', className: 'terminal__dim' }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('~');
  const [matrixActive, setMatrixActive] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const getPrompt = () => {
    return `ujjal@portfolio ${currentDir} %`;
  };

  const addOutput = (content, className = '') => {
    return { type: 'output', content, className };
  };

  const processCommand = (cmd) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case '':
        return [];

      case 'help':
        return [addOutput(
          `\x1b[bold]Available Commands:\x1b[reset]

  \x1b[green]help\x1b[reset]              Show this help message
  \x1b[green]whoami\x1b[reset]            Who am I?
  \x1b[green]skills\x1b[reset]            Show my tech stack
  \x1b[green]experience\x1b[reset]        Work experience
  \x1b[green]contact\x1b[reset]           Get in touch

  \x1b[green]ls\x1b[reset]                List projects
  \x1b[green]cd <project>\x1b[reset]      Enter a project directory
  \x1b[green]cd ..\x1b[reset]             Go back to home
  \x1b[green]pwd\x1b[reset]               Print working directory
  \x1b[green]cat idea.txt\x1b[reset]      Read project description (inside project dir)
  \x1b[green]open <project>\x1b[reset]    Open project in Finder
  \x1b[green]open resume.pdf\x1b[reset]   Open resume viewer

  \x1b[green]clear\x1b[reset]             Clear the terminal
  \x1b[green]echo <text>\x1b[reset]       Print text
  \x1b[green]date\x1b[reset]              Show current date

  \x1b[yellow]Easter Eggs:\x1b[reset]
  \x1b[green]neofetch\x1b[reset]          System information
  \x1b[green]fortune\x1b[reset]           Random dev wisdom
  \x1b[green]quote\x1b[reset]             My personal quote
  \x1b[green]tea\x1b[reset]               Brew some chai 🍵
  \x1b[green]matrix\x1b[reset]            Enter the Matrix 🟢
  \x1b[green]hire\x1b[reset]              Why you should hire me
  \x1b[green]sudo rm -rf /\x1b[reset]     Try it 😏
`, 'terminal__help')];

      case 'whoami':
        return [addOutput(
          `\x1b[bold]\x1b[cyan]Ujjal\x1b[reset]
Full-Stack Developer

I build things that work on the internet — from passwordless auth systems 
to AI-powered claim analysis platforms. I care about clean architecture, 
solid backends, and interfaces that don't make people cry.

Currently exploring: Systems Design, Distributed Systems, and DevOps.
`, 'terminal__info')];

      case 'skills':
        return [addOutput(
          `\x1b[bold]Tech Stack:\x1b[reset]

  \x1b[cyan]Languages\x1b[reset]     Python · JavaScript · C/C++· SQL · Bash
  \x1b[cyan]Backend\x1b[reset]       Django · FastAPI · Flask · REST APIs · JWT Auth
  \x1b[cyan]Frontend\x1b[reset]      React · Vite · Tailwind · Vanilla CSS
  \x1b[cyan]Databases\x1b[reset]     PostgreSQL · MySQL · MongoDB · SQLite · Redis
  \x1b[cyan]DevOps\x1b[reset]        AWS (EC2) · Nginx · Gunicorn · Docker · Linux
  \x1b[cyan]Tools\x1b[reset]         Git · GitHub · Postman · VS Code
`, 'terminal__info')];

      case 'experience':
        return [addOutput(
          `\x1b[bold]Experience:\x1b[reset]

  \x1b[yellow]Building Cool Stuff\x1b[reset]  —  Present
  Full-Stack Developer (Self-Directed)
  • Built 5+ production-grade projects from scratch
  • Deployed apps on AWS with SSL, Nginx, Gunicorn
  • Designed RBAC systems, crypto auth flows, and AI pipelines
`, 'terminal__info')];

      case 'contact':
        return [addOutput(
          `\x1b[bold]Get In Touch:\x1b[reset]

  \x1b[cyan]GitHub\x1b[reset]      ${githubUrl}
  \x1b[cyan]LinkedIn\x1b[reset]    ${linkedinUrl}
  \x1b[cyan]Email\x1b[reset]       ${emailAddress}
`, 'terminal__info')];

      case 'ls': {
        if (currentDir === '~') {
          const projectList = Object.entries(projectData)
            .map(([id, data]) => `  \x1b[blue]${data.title}/\x1b[reset]`)
            .join('\n');
          return [addOutput(`${projectList}\n  📄 resume.pdf\n  📝 about_me.txt\n  📝 contact.txt`)];
        } else {
          return [addOutput(`  📂 code/\n  📂 livedemo/\n  🖼️  system_design.png\n  📝 idea.txt`)];
        }
      }

      case 'cd': {
        const target = args[0];
        if (!target || target === '~' || target === '..') {
          setCurrentDir('~');
          return [];
        }

        if (currentDir !== '~') {
          const projectName = currentDir.split('/').pop();
          const entry = Object.entries(projectData).find(([, data]) => data.title === projectName);
          
          if (target.toLowerCase() === 'code' || target.toLowerCase() === 'code/') {
             if (entry && entry[1].github) {
                window.open(entry[1].github, '_blank', 'noopener,noreferrer');
                return [addOutput(`Done! Redirecting to GitHub repository...`, 'terminal__info')];
             }
             return [addOutput(`cd: no code repository found for ${projectName}`, 'terminal__error')];
          }
          
          if (target.toLowerCase() === 'livedemo' || target.toLowerCase() === 'livedemo/') {
             if (entry && entry[1].demo) {
                window.open(entry[1].demo, '_blank', 'noopener,noreferrer');
                return [addOutput(`Done! Redirecting to Live Demo...`, 'terminal__info')];
             }
             return [addOutput(`cd: no live demo found for ${projectName}`, 'terminal__error')];
          }
        }

        // Find project by name or id
        const projectEntry = Object.entries(projectData).find(
          ([id, data]) => id === target.toLowerCase() || data.title.toLowerCase() === target.toLowerCase()
        );
        if (projectEntry) {
          setCurrentDir(`~/Projects/${projectEntry[1].title}`);
          return [];
        }
        return [addOutput(`cd: no such file or directory: ${target}`, 'terminal__error')];
      }

      case 'pwd':
        return [addOutput(currentDir === '~' ? '/Users/ujjal' : `/Users/ujjal/Projects/${currentDir.split('/').pop()}`)];

      case 'cat': {
        const file = args[0];
        if (file === 'idea.txt') {
          if (currentDir === '~') {
            return [addOutput('cat: idea.txt: No such file or directory (hint: cd into a project first)', 'terminal__error')];
          }
          const projectName = currentDir.split('/').pop();
          const entry = Object.entries(projectData).find(([, data]) => data.title === projectName);
          if (entry) {
            return [addOutput(`\x1b[bold]${entry[1].title}\x1b[reset]\n\n${entry[1].idea}`)];
          }
        }
        return [addOutput(`cat: ${file || ''}: No such file or directory`, 'terminal__error')];
      }

      case 'open': {
        const target2 = args.join(' ');
        if (target2 === 'resume.pdf') {
          onOpenApp?.({ type: 'resume', file: { label: 'resume.pdf', url: '/resume_ujjal.pdf' } });
          return [addOutput('Opening resume.pdf...')];
        }
        const projectEntry2 = Object.entries(projectData).find(
          ([id, data]) => id === target2.toLowerCase() || data.title.toLowerCase() === target2.toLowerCase()
        );
        if (projectEntry2) {
          onOpenFolder?.(projectEntry2[0]);
          return [addOutput(`Opening ${projectEntry2[1].title} in Finder...`)];
        }
        return [addOutput(`open: ${target2}: No such file or directory`, 'terminal__error')];
      }

      case 'clear':
        setHistory([]);
        return null; // Signal to skip adding to history

      case 'echo':
        return [addOutput(args.join(' '))];

      case 'date':
        return [addOutput(new Date().toString())];

      case 'neofetch':
        return [addOutput(NEOFETCH_ART, 'terminal__neofetch')];

      case 'fortune':
        return [addOutput(`\n  ${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}\n`, 'terminal__fortune')];

      case 'tea':
        return [addOutput(TEA_ART, 'terminal__coffee')];

      case 'quote':
        return [addOutput(`\n  \x1b[yellow]${MY_QUOTE}\x1b[reset]\n`, 'terminal__fortune')];

      case 'matrix': {
        setMatrixActive(true);
        // Generate falling matrix characters
        const lines = [];
        for (let i = 0; i < 20; i++) {
          let line = '';
          for (let j = 0; j < 60; j++) {
            line += Math.random() > 0.7 ? MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] : ' ';
          }
          lines.push(line);
        }
        setTimeout(() => setMatrixActive(false), 5000);
        return [addOutput(`\x1b[green]${lines.join('\n')}\x1b[reset]`, 'terminal__matrix-text')];
      }

      case 'hire':
        return [addOutput(
          `
  ╔═══════════════════════════════════════════════╗
  ║                                               ║
  ║     WHY YOU SHOULD HIRE ME                    ║
  ║                                               ║
  ║   I ship production code, not just tutorials  ║
  ║   I debug at 2am without complaining          ║
  ║   I write READMEs longer than my code         ║
  ║   I actually enjoy code reviews               ║
  ║   My git commits make sense                   ║
  ║   I Google things efficiently                 ║
  ║                                               ║
  ║   Let's talk: ${emailAddress}        ║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝

`, 'terminal__hire')];

      case 'sudo':
        if (args.join(' ').startsWith('rm -rf')) {
          return [addOutput(`\n  🚫 Nice try! But this portfolio is rm-proof 😏\n  Permission denied: You don't have sudo access on ujjal's machine.\n`, 'terminal__error')];
        }
        return [addOutput('sudo: command requires authorization. Just kidding, this is a portfolio 😄', 'terminal__error')];

      case 'exit':
        return [addOutput('\n  🎵 "You can check out any time you like, but you can never leave..." 🎵\n  (Close the window with the red button instead!)\n', 'terminal__fortune')];

      case 'rm':
        return [addOutput("rm: permission denied. I worked too hard on these projects to let you delete them 😤", 'terminal__error')];

      case 'vim':
      case 'nano':
      case 'emacs':
        return [addOutput(`${command}: this terminal is read-only. But nice editor choice ${command === 'vim' ? '(I see you are a person of culture)' : ''} 🤓`, 'terminal__dim')];

      default:
        return [addOutput(`zsh: command not found: ${command}`, 'terminal__error')];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = { type: 'input', content: `${getPrompt()} ${input}` };
    const results = processCommand(input);

    if (results === null) {
      // clear command
      setInput('');
      return;
    }

    setHistory(prev => [...prev, prompt, ...results]);
    setCommandHistory(prev => [input, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Parse ANSI-like color codes for rendering
  const renderStyledText = (text) => {
    const parts = text.split(/(\x1b\[[a-z]+\])/g);
    let currentClass = '';
    const elements = [];

    parts.forEach((part, i) => {
      if (part === '\x1b[reset]') {
        currentClass = '';
      } else if (part === '\x1b[bold]') {
        currentClass = 'terminal__bold';
      } else if (part === '\x1b[green]') {
        currentClass = 'terminal__green';
      } else if (part === '\x1b[cyan]') {
        currentClass = 'terminal__cyan';
      } else if (part === '\x1b[yellow]') {
        currentClass = 'terminal__yellow';
      } else if (part === '\x1b[blue]') {
        currentClass = 'terminal__blue';
      } else if (part === '\x1b[white]') {
        currentClass = 'terminal__white';
      } else if (part) {
        elements.push(<span key={i} className={currentClass}>{part}</span>);
      }
    });

    return elements;
  };

  return (
    <MacWindow
      title="Terminal"
      onClose={onClose}
      initialWidth={700}
      initialHeight={450}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
    >
      <div className="terminal" onClick={handleTerminalClick}>
        {matrixActive && <div className="terminal__matrix-overlay" />}
        <div className="terminal__output" ref={scrollRef}>
          {history.map((entry, i) => (
            <div key={i} className={`terminal__line ${entry.className || ''}`}>
              <pre>{entry.type === 'input'
                ? renderStyledText(entry.content)
                : renderStyledText(entry.content)
              }</pre>
            </div>
          ))}
          <form className="terminal__input-line" onSubmit={handleSubmit}>
            <span className="terminal__prompt">{getPrompt()}</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </MacWindow>
  );
}

export default Terminal;
