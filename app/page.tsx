"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Heart, 
  Sparkles, 
  Gift, 
  Star, 
  ShoppingCart, 
  History, 
  Filter, 
  Home, 
  Search, 
  ChevronRight,
  Zap,
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  ArrowRight,
  Play
} from "lucide-react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { WishlistIcon } from "@/components/wishlist-icon"
import { AI_Prompt } from "@/components/ui/animated-ai-input"
import { Marquee } from "@/components/ui/marquee"
import { ecommerceBrands } from "@/components/ui/gift-logos"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  brand: string
  features: string[]
  inStock: boolean
  fastShipping: boolean
  aiReasoning?: string
  suitabilityScore?: number
  occasionMatch?: number
  ageAppropriate?: boolean
}

interface ChatHistory {
  id: string
  prompt: string
  timestamp: Date
  recipient_profile?: any
  occasion_info?: any
}

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<string>("")
  const [errorType, setErrorType] = useState<string | null>(null)
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false)
  const [currentConversation, setCurrentConversation] = useState<ChatHistory | null>(null)
  const [activeSection, setActiveSection] = useState<string>("home")

  // Avatar URLs for gift recommendation users
  const avatarUrls = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  ]

  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Search', url: '#search', icon: Search },
    { name: 'History', url: '#', icon: History },
    { name: 'Wishlist', url: '/wishlist', icon: Heart }
  ]

  const handleNavClick = (itemName: string) => {
    if (itemName === 'History') {
      setIsChatSidebarOpen(!isChatSidebarOpen)
    }
    setActiveSection(itemName.toLowerCase())
  }

  const handleSubmit = async (promptText: string) => {
    if (!promptText.trim()) return

    setPrompt(promptText)
    setIsLoading(true)
    setErrorType(null)

    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptText }),
      })

      const data = await response.json()

      if (data.success) {
        setRecommendations(data.data.recommendations)
        saveToChatHistory(promptText, data.data.recipient_profile, data.data.occasion_info)
      } else {
        setErrorType(data.error || "UNKNOWN_ERROR")
        setRecommendations("")
      }
    } catch (error) {
      console.error("Error:", error)
      setErrorType("UNKNOWN_ERROR")
      setRecommendations("")
    } finally {
      setIsLoading(false)
    }
  }

  const saveToChatHistory = (prompt: string, recipient_profile?: any, occasion_info?: any) => {
    const saved = localStorage.getItem("gift-chat-history")
    let history = saved ? JSON.parse(saved) : []
    
    const newHistory: ChatHistory = {
      id: Date.now().toString(),
      prompt,
      timestamp: new Date(),
      recipient_profile,
      occasion_info
    }
    
    history = [newHistory, ...history.slice(0, 49)]
    localStorage.setItem("gift-chat-history", JSON.stringify(history))
  }

  const loadConversation = (history: ChatHistory) => {
    setPrompt(history.prompt)
    setCurrentConversation(history)
    setIsChatSidebarOpen(false)
  }

  const stats = [
    { icon: Users, label: "Happy Customers", value: "50K+" },
    { icon: Gift, label: "Gifts Recommended", value: "1M+" },
    { icon: Star, label: "Average Rating", value: "4.9/5" },
    { icon: Zap, label: "Response Time", value: "<3s" }
  ]

  const features = [
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "AI analyzes preferences, age, interests, and occasion to suggest perfect gifts"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get curated gift suggestions in seconds, not hours of browsing"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handpicked products from trusted brands and verified sellers"
    },
    {
      icon: TrendingUp,
      title: "Smart Learning",
      description: "Our AI gets better with every interaction and learns from user feedback"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Modern Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 shadow-lg">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">GiftGenius</span>
            </div>
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200",
                    activeSection === item.name.toLowerCase()
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Sidebar */}
      <ChatSidebar
        isOpen={isChatSidebarOpen}
        onClose={() => setIsChatSidebarOpen(false)}
        onLoadConversation={loadConversation}
        currentConversation={currentConversation}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find the Perfect
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Gift{" "}
              </span>
              with AI
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform gift-giving with intelligent recommendations. Our AI understands 
              personalities, occasions, and preferences to suggest gifts that create lasting memories.
            </p>

            <div className="flex items-center justify-center mb-8">
              <AvatarCircles avatarUrls={avatarUrls} />
              <div className="ml-4 text-left">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Loved by 50,000+ gift givers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Search Section */}
      <section id="search" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Describe & Discover
            </h2>
            <p className="text-lg text-gray-600">
              Tell us about the person and occasion - our AI will do the rest
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <AI_Prompt 
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="e.g., Anniversary gift for my wife who loves yoga and sustainable living"
            />
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Birthday for tech-loving teenager",
                  "Housewarming for minimalist couple", 
                  "Thank you gift for helpful neighbor",
                  "Graduation for future doctor"
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => handleSubmit(example)}
                    className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full text-sm transition-all duration-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {recommendations && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AI Recommendations</h3>
              </div>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: recommendations }} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Error Section */}
      {errorType && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">
                Something went wrong
              </h3>
              <p className="text-red-700 mb-6">
                {errorType === "UNKNOWN_ERROR" 
                  ? "We encountered an unexpected error. Please try again."
                  : "Unable to process your request. Please check your input and try again."
                }
              </p>
              <Button 
                onClick={() => setErrorType(null)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose GiftGenius?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of gift-giving with AI-powered personalization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-lg text-gray-600">
              Discover gifts from premium retailers and trusted sellers
            </p>
          </div>
          <Marquee className="[--duration:40s]">
            {ecommerceBrands.map((brand, index) => (
              <div key={index} className="mx-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200">
                <brand.component className="h-12 w-auto" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find the Perfect Gift?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've discovered amazing gifts with our AI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Searching
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
                onClick={() => setIsChatSidebarOpen(true)}
              >
                <History className="w-5 h-5 mr-2" />
                View History
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GiftGenius</span>
              </div>
              <p className="text-gray-400 max-w-md mb-4">
                Revolutionizing gift-giving with AI-powered recommendations. 
                Find meaningful gifts that create lasting memories.
              </p>
              <div className="flex space-x-4">
                <AvatarCircles avatarUrls={avatarUrls.slice(0, 3)} />
                <div className="text-sm text-gray-400">
                  Trusted by 50K+ users
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Search</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wishlist</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 GiftGenius AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
