// import type { Metadata } from "next";
//  import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
//  import "./globals.css";
//  import { ClerkProvider } from "@clerk/nextjs";
//  import { Toaster } from "sonner";
//  import { Appbar } from "@/components/Appbar";
//  import { Providers } from "./provider";
 
 
//  const geistSans = Geist({
//    variable: "--font-geist-sans",
//    subsets: ["latin"],
//  });
 
//  const geistMono = Geist_Mono({
//    variable: "--font-geist-mono",
//    subsets: ["latin"],
//  });
 
//  const spaceGrotesk = Space_Grotesk({
//  	variable: "--font-space-grotesk",
//  	subsets: ["latin"],
//  });
 
//  export const metadata: Metadata = {
//    title: "Bolty",
//    description: "Create Expo App Instanly",
//  };
 
//  export default function RootLayout({
//    children,
//  }: Readonly<{
//    children: React.ReactNode;
//  }>) {
//    return (
//      <html lang="en" suppressHydrationWarning>
//        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//          <Providers>
//            {children}
//          </Providers>
//        </body>
//      </html>
//    );
//  }


//  import { ThemeProvider } from "@/components/theme-provider"
// import type { Metadata } from "next"
// import { Figtree } from "next/font/google"
// import { cn } from '@/lib/utils'
// import { meta } from '@/lib/constants'
// import { Particles } from '@repo/ui/particles'
// import { SidebarProvider } from '@/components/ui/sidebar'
// import { AppSidebar } from "@/components/app-sidebar"

// import "./globals.css"

// import { ClerkProvider } from "@clerk/nextjs"

// const figtree = Figtree({
// 	variable: "--font-figtree",
// 	subsets: ["latin"],
// 	weight: "300",
// });

// export const metadata: Metadata = {
// 	title: meta.title,
// 	description: meta.description
// };

// export default function RootLayout({
// 	children,
// }: Readonly<{
// 	children: React.ReactNode;
// }>) {
// 	return (
// 		<ClerkProvider>
// 			<html lang="en" suppressHydrationWarning>
// 				<body
// 					className={cn(`font-sans selection:bg-teal-400/70 selection:text-white dark:selection:bg-teal-200/20 dark:selection:text-teal-200 antialiased`,
// 						figtree.variable
// 					)}
// 				>
// 					<Particles
// 						quantityDesktop={350}
// 						quantityMobile={100}
// 						ease={80}
// 						color={"#14b8a6"}
// 						refresh
// 					/>
// 					<ThemeProvider
// 						attribute="class"
// 						defaultTheme="system"
// 						enableSystem
// 						disableTransitionOnChange
// 					>

// 						<SidebarProvider defaultOpen={false} className="relative">
// 							<AppSidebar />
// 							{children}
// 						</SidebarProvider>
// 					</ThemeProvider>
// 				</body>
// 			</html>
// 		</ClerkProvider>
// 	);
// }

 import { ThemeProvider } from "@/components/theme-provider"
 import type { Metadata } from "next"
 import { Figtree } from "next/font/google"
 import { cn } from '@/lib/utils'
 import { Particles } from '@repo/ui/particles'
 import { SidebarProvider } from '@/components/ui/sidebar'
 import { AppSidebar } from "@/components/app-sidebar"
 
 import "./globals.css"
 
 import { ClerkProvider } from "@clerk/nextjs"
 
 const figtree = Figtree({
 	variable: "--font-figtree",
 	subsets: ["latin"],
 	weight: "300",
 });
 
 export const metadata: Metadata = {
   title: "Bolty",
   description: "Create Expo App Instanly",
 };
 
 export default function RootLayout({
 	children,
 }: Readonly<{
 	children: React.ReactNode;
 }>) {
 	return (
 		<ClerkProvider>
 			<html lang="en" suppressHydrationWarning>
 				<body
 					className={cn(`font-sans selection:bg-teal-200/20 selection:text-teal-200 antialiased`,
 						figtree.variable
 					)}
 				>
 					<Particles
 						quantityDesktop={900}
 						quantityMobile={100}
 						ease={80}
 						color={"#14b8a6"}
 						refresh
 					/>
 					<ThemeProvider
 						attribute="class"
 						defaultTheme="system"
 						enableSystem
 						disableTransitionOnChange
 					>
 
 						<SidebarProvider defaultOpen={false} className="relative">
 							<AppSidebar />
 							{/* {children} */}
							<div className="flex justify-center w-full ">
    							<div className="w-full">
									{children}
								</div>
							</div>
 						</SidebarProvider>
 					</ThemeProvider>
 				</body>
 			</html>
 		</ClerkProvider>
 	);
 }
 