'use client'

import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

export function TestimonialsSection() {
  // Unsplash profile images - using diverse professional portraits
  const profileImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596075780750-81249df16d19?q=80&w=150&h=150&auto=format&fit=crop",
  ]

  return (
    <div className="flex flex-col gap-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="container flex justify-center">
        <div className="flex max-w-148 flex-col sm:mx-auto sm:items-center items-center">
          <h2 className="font-cal text-3xl lg:text-4xl text-center">
            <span>Trusted by </span>
            <span className="text-[#111111] font-semibold">data professionals</span>
          </h2>
          <p className="lg:mt-3 font-normal sm:text-center mt-3 text-center max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
            Meraki Sheets is built for businesses and individuals who need powerful spreadsheet tools without the complexity. No jargon, just intuitive software.
          </p>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="container flex justify-center">
        <div className="flex items-center gap-x-1.5 py-[3px] pr-[11px] pl-[7px] rounded-full border border-[#E0E0E2] bg-[#E7E7E9]">
          <FaStar className="h-5 w-5 text-yellow-500" />
          <span className="text-xs font-medium">4.9</span>
          <span className="text-gray-700 text-xs">from 150+ users</span>
        </div>
      </div>

      {/* Testimonials Grid with dual mask effect */}
      <div className="reviews-mask relative h-[732px] overflow-hidden md:h-[704px]" 
           style={{ 
             maskImage: 'linear-gradient(to bottom, #0000, #00000080 7%, #000 15%, #000 85%, #00000080 93%, #0000 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, #0000, #00000080 7%, #000 15%, #000 85%, #00000080 93%, #0000 100%)'
           }}>
        <div className="container">
          <div className="md:px-2">
            <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
              
              {/* Column 1 - Scrolling Up - Slower Animation */}
              <div className="flex flex-col gap-4 animate-scroll-up" style={{ '--duration': '45s' } as React.CSSProperties}>
                {/* First set of testimonials */}
                {/* Testimonial 1 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"Meraki Sheets has completely transformed our financial reporting process. The automation features have saved us countless hours of manual data entry."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[0]} alt="Sarah Johnson" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="font-normal text-gray-600 text-xs">Financial Analyst at TechCorp</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The integration was seamless and took less than 10 minutes. Now our entire team can collaborate on spreadsheets in real-time without any conflicts."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[1]} alt="Michael Chen" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Michael Chen</p>
                      <p className="font-normal text-gray-600 text-xs">CTO at DataFlow</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"As someone who works with complex data sets daily, I can't recommend Meraki Sheets enough. The AI-powered insights have helped us discover patterns we would have missed."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[2]} alt="Emily Rodriguez" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Emily Rodriguez</p>
                      <p className="font-normal text-gray-600 text-xs">Data Scientist at Analytics Inc</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 4 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The customer support team is exceptional. Any questions we had were answered promptly, and the onboarding process was smooth and well-guided."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[3]} alt="David Park" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">David Park</p>
                      <p className="font-normal text-gray-600 text-xs">Operations Manager at TechStart</p>
                    </div>
                  </div>
                </div>

                {/* Duplicate testimonials to avoid empty space during animation */}
                {/* Testimonial 1 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"Meraki Sheets has completely transformed our financial reporting process. The automation features have saved us countless hours of manual data entry."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[0]} alt="Sarah Johnson" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="font-normal text-gray-600 text-xs">Financial Analyst at TechCorp</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The integration was seamless and took less than 10 minutes. Now our entire team can collaborate on spreadsheets in real-time without any conflicts."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[1]} alt="Michael Chen" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Michael Chen</p>
                      <p className="font-normal text-gray-600 text-xs">CTO at DataFlow</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"As someone who works with complex data sets daily, I can't recommend Meraki Sheets enough. The AI-powered insights have helped us discover patterns we would have missed."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[2]} alt="Emily Rodriguez" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Emily Rodriguez</p>
                      <p className="font-normal text-gray-600 text-xs">Data Scientist at Analytics Inc</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Column 2 - Scrolling Down - Slower Animation */}
              <div className="flex flex-col gap-4 animate-scroll-down" style={{ '--duration': '55s' } as React.CSSProperties}>
                {/* Testimonial 5 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"Meraki Sheets has revolutionized how our marketing team tracks campaign performance. The visualization tools are intuitive and powerful."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[4]} alt="Jessica Lee" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Jessica Lee</p>
                      <p className="font-normal text-gray-600 text-xs">Marketing Director at GrowthBrand</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 6 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The automation features have cut our monthly reporting time by 75%. What used to take days now takes just hours. Game changer!"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[5]} alt="Robert Wilson" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Robert Wilson</p>
                      <p className="font-normal text-gray-600 text-xs">Financial Controller at Enterprise Co</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 7 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"I've tried many spreadsheet tools over the years, but Meraki Sheets stands out for its balance of power and simplicity. Perfect for both beginners and power users."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[6]} alt="Sophia Kim" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Sophia Kim</p>
                      <p className="font-normal text-gray-600 text-xs">Startup Founder</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 8 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The real-time collaboration feature has made remote work so much easier for our team. We can all work on the same sheet simultaneously without any conflicts."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[7]} alt="James Thompson" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">James Thompson</p>
                      <p className="font-normal text-gray-600 text-xs">Project Manager at RemoteWorks</p>
                    </div>
                  </div>
                </div>

                {/* Duplicate testimonials to avoid empty space during animation */}
                {/* Testimonial 5 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"Meraki Sheets has revolutionized how our marketing team tracks campaign performance. The visualization tools are intuitive and powerful."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[4]} alt="Jessica Lee" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Jessica Lee</p>
                      <p className="font-normal text-gray-600 text-xs">Marketing Director at GrowthBrand</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 6 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The automation features have cut our monthly reporting time by 75%. What used to take days now takes just hours. Game changer!"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[5]} alt="Robert Wilson" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Robert Wilson</p>
                      <p className="font-normal text-gray-600 text-xs">Financial Controller at Enterprise Co</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 7 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"I've tried many spreadsheet tools over the years, but Meraki Sheets stands out for its balance of power and simplicity. Perfect for both beginners and power users."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[6]} alt="Sophia Kim" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Sophia Kim</p>
                      <p className="font-normal text-gray-600 text-xs">Startup Founder</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Column 3 - Scrolling Up - Slower Animation */}
              <div className="flex flex-col gap-4 animate-scroll-up" style={{ '--duration': '50s' } as React.CSSProperties}>
                {/* Testimonial 9 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The formula suggestions and AI-assisted functions have made complex calculations accessible to everyone on our team, not just the spreadsheet experts."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[8]} alt="Alex Martinez" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Alex Martinez</p>
                      <p className="font-normal text-gray-600 text-xs">Business Analyst at InnovateCo</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 10 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The version history and change tracking features give us peace of mind. We can always see who made what changes and easily revert if needed."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[9]} alt="Linda Chang" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Linda Chang</p>
                      <p className="font-normal text-gray-600 text-xs">Team Lead at CloudSystems</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 11 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The integration with our existing tools was seamless. Now our data flows automatically between systems without any manual intervention."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[10]} alt="Thomas Wright" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Thomas Wright</p>
                      <p className="font-normal text-gray-600 text-xs">IT Director at GlobalTech</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 12 */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"After switching to Meraki Sheets, our team's productivity increased by 40%. The intuitive interface and smart features make everything faster."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[11]} alt="Samantha Patel" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Samantha Patel</p>
                      <p className="font-normal text-gray-600 text-xs">Operations Director at FastGrowth</p>
                    </div>
                  </div>
                </div>

                {/* Duplicate testimonials to avoid empty space during animation */}
                {/* Testimonial 9 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The formula suggestions and AI-assisted functions have made complex calculations accessible to everyone on our team, not just the spreadsheet experts."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[8]} alt="Alex Martinez" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Alex Martinez</p>
                      <p className="font-normal text-gray-600 text-xs">Business Analyst at InnovateCo</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 10 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The version history and change tracking features give us peace of mind. We can always see who made what changes and easily revert if needed."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[9]} alt="Linda Chang" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Linda Chang</p>
                      <p className="font-normal text-gray-600 text-xs">Team Lead at CloudSystems</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 11 (duplicate) */}
                <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
                  <p>"The integration with our existing tools was seamless. Now our data flows automatically between systems without any manual intervention."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image src={profileImages[10]} alt="Thomas Wright" width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">Thomas Wright</p>
                      <p className="font-normal text-gray-600 text-xs">IT Director at GlobalTech</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 