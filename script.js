const $ = (id) => document.getElementById(id);
const input = $('messageInput'), messages = $('messages'), welcome = $('welcome');
let busy = false;

function addMessage(text, who) {
  welcome.style.display = 'none';
  const row = document.createElement('div');
  row.className = `message ${who}`;
  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = who === 'user' ? 'Y' : '✦';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  row.append(avatar, bubble);
  messages.appendChild(row);
  $('chatArea').scrollTop = $('chatArea').scrollHeight;
  return row;
}
function showTyping() {
  const row = document.createElement('div');
  row.className = 'message';
  row.id = 'typingRow';
  row.innerHTML = '<div class="msg-avatar">✦</div><div class="bubble"><div class="typing"><i></i><i></i><i></i></div></div>';
  messages.appendChild(row);
  $('chatArea').scrollTop = $('chatArea').scrollHeight;
}
function makeReply(message) {
  const m = message.toLowerCase();
  if (/\b(hi|hello|hey|hii|namaste)\b/.test(m)) return "Hey there! 👋 I'm Nova, your demo assistant. What would you like to explore today?";
  if (m.includes('your name') || m.includes('who are you')) return "I'm Nova, a friendly chatbot demo built with HTML, CSS and JavaScript. ✨";
  if (m.includes('time') || m.includes('date')) return `Your device date and time is ${new Date().toLocaleString()}.`;
  if (m.includes('joke')) return "Why do programmers prefer dark mode? Because light attracts bugs! 😄";
  if (m.includes('motivat') || m.includes('quote')) return "“Small steps every day lead to big changes.” Keep going — progress is progress, no matter how small. 🌱";
  if (m.includes('html') || m.includes('css') || m.includes('javascript') || m.includes('project idea')) return "Here are a few web development project ideas:\n\n1. Personal portfolio website\n2. To-do list with local storage\n3. Weather dashboard (with a weather API)\n4. Expense tracker\n5. Quiz application\n\nStart with one small feature, then improve it step by step!";
  if (m.includes('study') || m.includes('timetable') || m.includes('plan')) return "Here's a simple study routine:\n\n• 25 minutes — Focus on one topic\n• 5 minutes — Take a break\n• 25 minutes — Practice questions\n• 10 minutes — Revise what you learned\n\nSet one clear goal for each session. You can do it! 📚";
  if (m.includes('ai') || m.includes('artificial intelligence')) return "Artificial Intelligence (AI) is technology that helps computers perform tasks that usually need human intelligence — such as understanding language, recognizing images, finding patterns and making predictions. A chatbot is one example of an AI application.";
  if (m.includes('thank')) return "You're very welcome! 😊 I'm here whenever you want to try another question.";
  if (m.includes('help')) return "Of course! You can ask me for simple explanations, study plans, project ideas, motivational quotes, jokes, or the current date and time. Try one of the suggestion cards too.";
  return "Thanks for your message! 😊 I'm a front-end chatbot demo, so my replies come from predefined JavaScript rules rather than a live AI model. Try asking about AI, study plans, project ideas, jokes, or motivation.";
}
function sendMessage(text) {
  text = text.trim();
  if (!text || busy) return;
  addMessage(text, 'user');
  input.value = '';
  input.style.height = 'auto';
  busy = true; $('sendBtn').disabled = true;
  showTyping();
  setTimeout(() => {
    $('typingRow')?.remove();
    addMessage(makeReply(text), 'bot');
    busy = false; $('sendBtn').disabled = false; input.focus();
  }, 650 + Math.min(text.length * 12, 900));
}
$('chatForm').addEventListener('submit', e => { e.preventDefault(); sendMessage(input.value); });
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('chatForm').requestSubmit(); }
});
input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 130) + 'px'; });
document.querySelectorAll('.suggestion').forEach(btn => btn.addEventListener('click', () => sendMessage(btn.dataset.prompt)));
function resetChat() {
  messages.innerHTML = ''; welcome.style.display = 'block'; input.value = ''; input.focus();
}
$('newChat').addEventListener('click', () => { resetChat(); $('sidebar').classList.remove('open'); });
$('clearChat').addEventListener('click', () => { resetChat(); toast('Chat cleared'); });
$('themeToggle').addEventListener('click', () => { document.body.classList.toggle('dark'); toast(document.body.classList.contains('dark') ? 'Dark mode enabled' : 'Light mode enabled'); });
$('menuBtn').addEventListener('click', () => $('sidebar').classList.toggle('open'));
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => t.classList.remove('show'), 1800); }
