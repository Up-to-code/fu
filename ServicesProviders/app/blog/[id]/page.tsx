import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight, Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { getBlogPost, getAllBlogPosts } from "@/data/blog";

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = getBlogPost(Number(id));
    if (!post) {
        return {
            title: "المقال غير موجود",
        };
    }
    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = getBlogPost(Number(id));

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <LandingHeader />
            <main className="flex-1 pt-24">
                <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Link */}
                        <Link 
                            href="/blog" 
                            className="inline-flex items-center gap-2 text-[#242C5A] hover:text-[#1a2144] font-medium mb-8 transition-colors"
                        >
                            <ArrowRight className="h-4 w-4" />
                            العودة إلى المدونة
                        </Link>

                        {/* Header */}
                        <header className="mb-8">
                            <div className="mb-4">
                                <span className="inline-block px-4 py-2 bg-[#242C5A] text-white text-sm font-bold rounded-full">
                                    {post.category}
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{post.date}</span>
                                </div>
                                {post.readTime && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>{post.readTime} دقيقة قراءة</span>
                                    </div>
                                )}
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="mb-12 rounded-2xl overflow-hidden">
                            <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div 
                            className="blog-content text-lg text-gray-700 leading-relaxed space-y-6"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            style={{
                                direction: 'rtl'
                            }}
                        />

                        {/* Footer Actions */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <Link 
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#242C5A] hover:bg-[#1a2144] text-white font-bold rounded-xl transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                العودة إلى المدونة
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
