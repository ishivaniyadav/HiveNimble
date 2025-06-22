import express from 'express';
const router = express.Router();

const mockData = {
  projects: [
    { id: 1, name: 'E-commerce Website', status: 'active', deadline: '2025-07-15', freelancer: 'John Doe' },
    { id: 2, name: 'Mobile App Development', status: 'in-progress', deadline: '2025-08-20', freelancer: 'Jane Smith' },
    { id: 3, name: 'Logo Design', status: 'completed', deadline: '2025-06-30', freelancer: 'Mike Johnson' }
  ],
  freelancers: [
    { id: 1, name: 'Siwach', skills: ['React', 'Node.js'], status: 'busy', rating: 4.8 },
    { id: 2, name: 'Kabir', skills: ['Flutter', 'Dart'], status: 'available', rating: 4.9 },
    { id: 3, name: 'Anaya', skills: ['Photoshop', 'Illustrator'], status: 'available', rating: 4.7 }
  ],
  payments: [
    { id: 1, project: 'E-commerce Website', amount: 2500, status: 'pending', dueDate: '2025-07-01' },
    { id: 2, project: 'Logo Design', amount: 500, status: 'paid', paidDate: '2025-06-25' }
  ]
};

function identifyIntent(message) {
  const lower = message.toLowerCase();
  if (lower.includes('project') && (lower.includes('active') || lower.includes('show'))) return 'show_projects';
  if (lower.includes('payment') || lower.includes('pay')) return 'payment_status';
  if (lower.includes('freelancer') && lower.includes('available')) return 'available_freelancers';
  if (lower.includes('deadline') || lower.includes('due')) return 'project_deadlines';
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return 'greeting';
  if (lower.includes('help') || lower.includes('what can you do')) return 'help';
  return 'general';
}

function generateResponse(intent) {
  switch (intent) {
    case 'show_projects': {
      const active = mockData.projects.filter(p => ['active', 'in-progress'].includes(p.status));
      if (!active.length) return "🚧 You don't have any active projects right now.";

      let msg = "📋 Your Active Projects:\n\n";
      active.forEach(p => {
        msg += `• ${p.name}\n  Status: ${p.status}\n  Freelancer: ${p.freelancer}\n  Deadline: ${p.deadline}\n\n`;
      });
      return msg;
    }

    case 'payment_status': {
      let msg = "💳 Payment Information:\n\n";
      mockData.payments.forEach(p => {
        msg += `• ${p.project}\n  Amount: ₹${p.amount}\n  Status: ${p.status}\n`;
        msg += p.status === 'pending' ? `  Due: ${p.dueDate}\n\n` : `  Paid: ${p.paidDate}\n\n`;
      });
      return msg;
    }

    case 'available_freelancers': {
      const available = mockData.freelancers.filter(f => f.status === 'available');
      if (!available.length) return "⚠️ No freelancers are currently available.";

      let msg = "🧑‍💻 Available Freelancers:\n\n";
      available.forEach(f => {
        msg += `• ${f.name}\n  Skills: ${f.skills.join(', ')}\n  Rating: ${f.rating}/5 ⭐\n\n`;
      });
      return msg;
    }

    case 'project_deadlines': {
      const upcoming = mockData.projects
        .filter(p => new Date(p.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      if (!upcoming.length) return "🎉 No upcoming project deadlines.";

      let msg = "⏰ Upcoming Deadlines:\n\n";
      upcoming.forEach(p => {
        msg += `• ${p.name}\n  Deadline: ${p.deadline}\n  Freelancer: ${p.freelancer}\n\n`;
      });
      return msg;
    }

    case 'greeting':
      return "👋 Hello! I can help with your projects, payments, freelancers, or deadlines. Type 'help' to get started.";

    case 'help':
      return `🆘 I can help you with:\n\n- Show my active projects\n- Check payment status\n- Find available freelancers\n- View project deadlines`;

    default:
      return "🤖 I'm not sure how to help with that. Try asking about your 'projects', 'payments', or 'deadlines'.";
  }
}

router.post('/chatbot', (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        error: 'Message is required',
        response: '❗ Please enter a valid message.'
      });
    }

    const intent = identifyIntent(message);
    const response = generateResponse(intent);

    console.log(`[Chatbot] User: ${message}`);
    console.log(`[Chatbot] Intent: ${intent}`);
    console.log(`[Chatbot] Response: ${response}`);

    res.json({
      response,
      intent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      error: 'Internal server error',
      response: '⚠️ Something went wrong. Please try again later.'
    });
  }
});

router.get('/chatbot/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Chatbot API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;


