import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Single button that cycles: light → dark → system → light
export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  // Cycle through theme modes
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Display appropriate icon for current theme
  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'system':
        return <Monitor className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      <div className="relative">
        {getIcon()}
        {theme === 'system' && (
          <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-blue-500" />
        )}
      </div>
      
      {/* Subtle animation indicator */}
      <div 
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
            : 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10'
        }`}
      />
    </button>
  );
}

// Alternative: Three-button segmented control for theme selection
export function ThemeToggleDropdown() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="relative inline-block text-left">
      <div className="flex rounded-lg border border-border bg-background">
        <button
          onClick={() => setTheme('light')}
          className={`flex items-center justify-center px-3 py-2 text-sm transition-colors ${
            theme === 'light'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent/50'
          } rounded-l-lg`}
          title="Light mode"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`flex items-center justify-center px-3 py-2 text-sm transition-colors ${
            theme === 'dark'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent/50'
          }`}
          title="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`flex items-center justify-center px-3 py-2 text-sm transition-colors ${
            theme === 'system'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent/50'
          } rounded-r-lg`}
          title="System mode"
        >
          <Monitor className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
