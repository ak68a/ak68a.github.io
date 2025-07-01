$(document).ready(function() {
  $("body").hide().fadeIn(1000);
  $(".text").scramble(3000, 30, "all", true);
  $(".footer").scramble(3000, 30, "all", true);
});

// Theme management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = this.themeToggle.querySelector('.theme-icon');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
