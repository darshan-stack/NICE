"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Sparkles, Gift, Star, ShoppingCart, History, Filter, Home, Search, ChevronRight } from "lucide-react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { WishlistIcon } from "@/components/wishlist-icon"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { Highlighter } from "@/components/magicui/highlighter"
import { AI_Prompt } from "@/components/ui/animated-ai-input"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Marquee } from "@/components/ui/marquee"
import { ecommerceBrands } from "@/components/ui/gift-logos"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer"
import { cn } from "@/lib/utils"

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

  // Avatar URLs for gift recommendation users - using diverse placeholder avatars
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
        // Save to chat history
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
    
    history = [newHistory, ...history.slice(0, 49)] // Keep last 50 conversations
    localStorage.setItem("gift-chat-history", JSON.stringify(history))
  }

  const loadConversation = (history: ChatHistory) => {
    setPrompt(history.prompt)
    setCurrentConversation(history)
    setIsChatSidebarOpen(false)
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Sunny Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #fde047, transparent)
          `,
        }}
      />
      
      {/* Dot Pattern Layer */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-[1] pointer-events-none",
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      
      {/* Tubelight Navbar */}
      <NavBar items={navItems} onItemClick={handleNavClick} />

      {/* Animated Gradient Text Banner */}
      <div className="flex justify-center pt-20 pb-8 relative z-10">
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎁 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Powered by Advanced AI Technology
          </AnimatedGradientText>
          <ChevronRight
            className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </div>
      </div>

      {/* Chat Sidebar */}
      <ChatSidebar
        isOpen={isChatSidebarOpen}
        onClose={() => setIsChatSidebarOpen(false)}
        onLoadConversation={loadConversation}
        currentConversation={currentConversation}
      />

      <main className="max-w-4xl mx-auto px-4 py-16 relative z-10">
          {/* Centered Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="h-10 w-10 text-blue-600" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered Gift Recommendations
              </h1>
              <Sparkles className="h-10 w-10 text-blue-600" />
            </div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get{" "}
              <Highlighter action="highlight" color="#87CEFA">
                personalized gift suggestions
              </Highlighter>{" "}
              powered by{" "}
              <Highlighter action="underline" color="#FF9800">
                advanced AI
              </Highlighter>
              . Just describe who you're shopping for and let our AI find the{" "}
              <Highlighter action="highlight" color="#98FB98">
                perfect gifts
              </Highlighter>
              !
            </p>
          </div>

        {/* AI Prompt Input - Centered below title */}
        <div className="flex justify-center mb-8" id="search">
          <AI_Prompt 
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="e.g., Birthday present for my 10-year-old nephew who loves science and robots"
          />
        </div>

        {/* Quick Suggestion Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => handleSubmit("Birthday gift for my mom who loves gardening")}
          >
            Mom - Gardening
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => handleSubmit("Anniversary gift for my husband who loves cooking")}
          >
            Husband - Cooking
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => handleSubmit("Graduation gift for my friend who loves technology")}
          >
            Friend - Technology
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => handleSubmit("Christmas gift for my 5-year-old daughter who loves princesses")}
          >
            Daughter - Princesses
          </Badge>
        </div>

        {/* Error Messages */}
        {errorType === "MISSING_API_KEY" && (
          <Card className="p-6 mb-12 bg-red-50 border-red-200">
            <div className="flex items-start gap-4">
              <MessageSquare className="h-6 w-6 text-red-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-2">API Key Setup Required</h3>
                <p className="text-red-700 mb-4">
                  Your OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.
                </p>
              </div>
            </div>
          </Card>
        )}

          {errorType === "INVALID_API_KEY" && (
            <Card className="p-6 mb-12 bg-red-50 border-red-200">
              <div className="flex items-start gap-4">
              <MessageSquare className="h-6 w-6 text-red-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">API Key Setup Required</h3>
                  <p className="text-red-700 mb-4">
                    Your OpenAI API key is invalid or has been revoked. Here's how to fix it:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-red-700 mb-4">
                    <li>
                      Go to{" "}
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        OpenAI Platform
                      </a>
                    </li>
                    <li>Create a new API key</li>
                    <li>Copy the key (starts with sk-)</li>
                    <li>Add it to your environment variables as OPENAI_API_KEY</li>
                  </ol>
                  <Button
                    onClick={() => window.open("https://platform.openai.com/api-keys", "_blank")}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                  <MessageSquare className="h-4 w-4 mr-2" />
                    Get New API Key
                  </Button>
                </div>
              </div>
            </Card>
          )}

        {/* Recommendations */}
        {recommendations && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-green-600" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {recommendations}
          </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ecommerce Brands Marquee */}
        <div className="mt-16">
          <Marquee pauseOnHover speed={25} className="py-4">
            <div className="flex items-center space-x-16 mx-8">
              {ecommerceBrands.map((brandName: string, index: number) => (
                <div key={index} className="flex items-center justify-center min-w-[120px]">
                  <span className="text-2xl font-serif font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                    {brandName}
                  </span>
                </div>
              ))}
            </div>
          </Marquee>
        </div>

        {/* User Avatars Section */}
        <div className="mt-12 flex flex-col items-center space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Trusted by thousands of gift seekers
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Join our community of happy customers who found perfect gifts
            </p>
          </div>
          <AvatarCircles numPeople={2847} avatarUrls={avatarUrls} />
        </div>
      </main>
      
      {/* Stacked Circular Footer */}
      <StackedCircularFooter />
    </div>
  )
}
