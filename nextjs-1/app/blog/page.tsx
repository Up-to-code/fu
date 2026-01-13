import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight, Calendar, User, ArrowLeft } from "lucide-react";
import { getAllBlogPosts } from "@/data/blog";

export const metadata = {
    title: "المدونة",
    description: "مقالات وأخبار منصة أثاث بلس",
};

const blogPosts = getAllBlogPosts();

export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <LandingHeader />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="mb-12">
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 text-[#242C5A] hover:text-[#1a2144] font-medium mb-6 transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                                العودة إلى الرئيسية
                            </Link>
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">المدونة</h1>
                            <p className="text-gray-600 text-lg">مقالات وأخبار مفيدة حول التجارة الإلكترونية وإدارة الأعمال</p>
                        </div>

                        {/* Blog Posts Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <article 
                                    key={post.id}
                                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#242C5A] hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="aspect-video bg-gray-200 relative">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-[#242C5A] text-white text-xs font-bold rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-[#242C5A] mb-3 line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                        <Link 
                                            href={`/blog/${post.id}`}
                                            className="inline-flex items-center gap-2 text-[#242C5A] font-bold hover:text-[#1a2144] transition-colors"
                                        >
                                            اقرأ المزيد
                                            <ArrowLeft className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More / Pagination */}
                        <div className="mt-12 text-center">
                            <button className="px-8 py-3 bg-[#242C5A] hover:bg-[#1a2144] text-white font-bold rounded-xl transition-colors">
                                تحميل المزيد
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
