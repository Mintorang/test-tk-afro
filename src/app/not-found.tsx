import Link from 'next/link'
import { AnimatedButton } from '@/components/ui/AnimatedButton'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🍽️</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. Let's get you back to our delicious menu!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/">
            <AnimatedButton className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base">
              Go Home
            </AnimatedButton>
          </Link>
          <Link href="/menu">
            <AnimatedButton variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base">
              Browse Menu
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
