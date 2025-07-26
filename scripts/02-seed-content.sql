-- Seed default content for home page
INSERT INTO content_sections (page_name, section_name, content_json) VALUES
('home', 'hero', '{
  "title": "Manage Clients, Projects, and Campaigns in One Place",
  "subtitle": "Built for Indian freelancers and agencies. No noise, just results.",
  "cta_text": "Join Free Beta",
  "badge_text": "🚀 Now in Beta"
}'),
('home', 'features', '{
  "title": "Everything you need to scale your business",
  "subtitle": "Powerful features designed specifically for Indian freelancers and agencies",
  "features": [
    {
      "icon": "MessageSquare",
      "title": "Chat",
      "description": "Real-time communication with clients and team members"
    },
    {
      "icon": "FolderOpen", 
      "title": "Projects",
      "description": "Organize and track all your projects in one place"
    },
    {
      "icon": "Mail",
      "title": "Campaigns", 
      "description": "Automated email marketing with AI-powered content"
    },
    {
      "icon": "FileText",
      "title": "Templates",
      "description": "Pre-built templates for proposals, contracts, and more"
    },
    {
      "icon": "Users",
      "title": "Team",
      "description": "Collaborate with your team and track productivity"
    },
    {
      "icon": "Zap",
      "title": "AI Automation",
      "description": "Smart workflows that save hours every week"
    }
  ]
}'),
('home', 'automation', '{
  "title": "Smart Automation that works for you",
  "subtitle": "Let AI handle the repetitive tasks while you focus on growing your business",
  "features": [
    "Automatically generate project proposals from brief descriptions",
    "Smart email responses based on client communication patterns", 
    "Intelligent task assignment based on team member expertise",
    "Automated invoice generation and payment reminders"
  ]
}'),
('home', 'pricing', '{
  "title": "Simple, transparent pricing",
  "subtitle": "Start free, upgrade when you are ready to scale",
  "plans": [
    {
      "name": "Free Forever",
      "price": 0,
      "description": "Perfect for getting started",
      "features": ["Up to 3 projects", "Basic client portal", "Email support", "5GB storage", "Basic templates"]
    },
    {
      "name": "Pro Plan", 
      "price": 2499,
      "yearly_price": 1999,
      "description": "For growing agencies",
      "features": ["Unlimited projects", "Advanced AI automation", "Priority support", "100GB storage", "Custom templates", "Team collaboration", "Advanced analytics"]
    }
  ]
}'),
('home', 'faq', '{
  "title": "Frequently Asked Questions",
  "subtitle": "Everything you need to know about DriminAI",
  "faqs": [
    {
      "question": "Is DriminAI really free to start?",
      "answer": "Yes! Our Free Forever plan includes up to 3 projects, basic client portal, and essential features to get you started. No credit card required."
    },
    {
      "question": "How does the AI automation work?", 
      "answer": "Our AI learns from your work patterns and automatically handles repetitive tasks like generating proposals, sending follow-ups, and organizing projects based on your preferences."
    },
    {
      "question": "Can I invite my team members?",
      "answer": "Team collaboration features will be available in our Pro plan (coming soon). The free plan is designed for individual freelancers and small agencies."
    },
    {
      "question": "Is my data secure?",
      "answer": "Absolutely. We use enterprise-grade security with end-to-end encryption, regular backups, and comply with international data protection standards."
    },
    {
      "question": "Do you offer customer support?",
      "answer": "Yes! Free users get email support, while Pro users (coming soon) will have priority support with faster response times."
    }
  ]
}');
