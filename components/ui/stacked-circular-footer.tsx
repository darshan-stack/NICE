import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter, Gift } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Gift className="w-12 h-12 text-primary" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-primary">Home</a>
            <a href="#" className="hover:text-primary">About</a>
            <a href="#recommendations" className="hover:text-primary">AI Recommendations</a>
            <a href="#wishlist" className="hover:text-primary">Wishlist</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-full max-w-md">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Join As Waitlist
              </h3>
              <p className="text-sm text-gray-600">
                Be the first to know about new AI-powered gift features
              </p>
            </div>
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" className="rounded-full" />
              </div>
              <Button type="submit" className="rounded-full">Join Waitlist</Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Gifto.ai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
