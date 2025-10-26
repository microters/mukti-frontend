'use client'
import BlogSidebar from "@/app/Component/Shared/BlogSidebar/BlogSidebar";
import authorImage from "@/assets/images/client2.png";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Added for notifications
import "react-toastify/dist/ReactToastify.css"; // Added for notifications
import { Icon } from "@iconify/react"; // Assuming you have this installed

// Helper function to format date/time for comments
const formatCommentDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// --- CommentItem Component (Recursive) ---
// This component renders an individual comment and its nested replies.
const CommentItem = ({ comment, blogId, onPostCommentOrReply, level = 0 }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyFormData, setReplyFormData] = useState({
        content: '',
        authorName: '',
        authorEmail: '',
    });
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setReplyFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingReply(true);
        try {
            // Pass the parentId for replies
            await onPostCommentOrReply(blogId, replyFormData.content, replyFormData.authorName, replyFormData.authorEmail, comment.id);
            setReplyFormData({ content: '', authorName: '', authorEmail: '' }); // Clear form
            setShowReplyForm(false); // Hide form after successful reply
        } catch (error) {
            // Error handling is already done in onPostCommentOrReply, just catch to reset state
        } finally {
            setIsSubmittingReply(false);
        }
    };

    // Determine padding based on nesting level for visual indentation
    // Tailwind classes like pl-5, pl-10, etc. could also be used depending on your design system.
    const paddingLeft = level * 30; // 30px per level, adjust as needed

    return (
        <div 
            style={{ paddingLeft: `${paddingLeft}px` }} 
            className={`block md:flex items-start gap-4 mt-4 pt-5 ${level > 0 ? 'border-t border-M-text-color/20' : ''}`}
        >
            {/* Author Image */}
            <Image
                src={authorImage} // Using generic authorImage for now
                alt="User Image"
                width={50}
                height={50}
                className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0"
            />
            
            <div className="flex-1"> {/* Take remaining width */}
                {/* Comment Header */}
                <h4 className="font-normal text-M-heading-color mb-2">
                    {comment.authorName}{" "}
                    <span className="text-M-text-color">
                        {formatCommentDateTime(comment.createdAt)}
                    </span>{" "}
                    {/* Reply Button */}
                    <span>
                        <button 
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="text-M-secondary-color hover:underline ml-2 text-sm"
                        >
                            - Reply
                        </button>
                    </span>
                </h4>
                {/* Comment Content */}
                <p className="text-M-text-color font-jost">
                    {comment.content}
                </p>

                {/* Reply Form (Conditionally rendered) */}
                {showReplyForm && (
                    <form onSubmit={handleReplySubmit} className="mt-4 bg-gray-50 p-4 rounded-md shadow-inner">
                        <h5 className="text-md font-semibold mb-3 text-M-heading-color">Reply to {comment.authorName}</h5>
                        {/* Reply Content */}
                        <div>
                            <label htmlFor={`replyContent-${comment.id}`} className="sr-only">Your Reply</label>
                            <textarea
                                name="content"
                                id={`replyContent-${comment.id}`}
                                placeholder="Your Reply"
                                rows={3}
                                value={replyFormData.content}
                                onChange={handleReplyChange}
                                className="p-2 w-full bg-white border border-gray-300 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none"
                                required
                                disabled={isSubmittingReply}
                            ></textarea>
                        </div>
                        {/* Reply Author Name */}
                        <div className="mt-2">
                            <label htmlFor={`replyAuthorName-${comment.id}`} className="sr-only">Your Name</label>
                            <input
                                type="text"
                                name="authorName"
                                id={`replyAuthorName-${comment.id}`}
                                placeholder="Your Name"
                                value={replyFormData.authorName}
                                onChange={handleReplyChange}
                                required
                                className="p-2 w-full bg-white border border-gray-300 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none"
                                disabled={isSubmittingReply}
                            />
                        </div>
                        {/* Reply Author Email */}
                        <div className="mt-2">
                            <label htmlFor={`replyAuthorEmail-${comment.id}`} className="sr-only">Your Email</label>
                            <input
                                type="email"
                                name="authorEmail"
                                id={`replyAuthorEmail-${comment.id}`}
                                placeholder="Your Email (Optional)"
                                value={replyFormData.authorEmail}
                                onChange={handleReplyChange}
                                className="p-2 w-full bg-white border border-gray-300 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none"
                                disabled={isSubmittingReply}
                            />
                        </div>
                        {/* Reply Submit Button */}
                        <button
                            type="submit"
                            className="bg-M-primary-color text-sm text-white py-2 px-4 rounded-md mt-3 hover:bg-M-heading-color transition-all duration-300"
                            disabled={isSubmittingReply}
                        >
                            {isSubmittingReply ? "Submitting..." : "Post Reply"}
                        </button>
                        {/* Cancel Reply Button */}
                        <button
                            type="button"
                            onClick={() => setShowReplyForm(false)}
                            className="ml-2 bg-gray-300 text-sm py-2 px-4 rounded-md mt-3 hover:bg-gray-400 transition-all duration-300"
                            disabled={isSubmittingReply}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {/* Recursively render replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4">
                        {comment.replies.map(reply => (
                            <CommentItem 
                                key={reply.id} 
                                comment={reply} 
                                blogId={blogId} 
                                onPostCommentOrReply={onPostCommentOrReply} // Pass the common post function
                                level={level + 1} // Increase level for deeper nesting
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- SingleBlog Component ---
const SingleBlog = ({ blogs, singleBlogs }) => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const translations = singleBlogs.translations[currentLanguage] || singleBlogs.translations["en"];
    const blogImage = singleBlogs.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${singleBlogs.image}`
    : "/default-profile-photo.png";

    const createdAt = new Date(singleBlogs.createdAt);

    const formattedDate = createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
    });

    const [comments, setComments] = useState([]);
    const [commentFormData, setCommentFormData] = useState({
        content: '',
        authorName: '',
        authorEmail: '',
    });
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    // Function to fetch comments (now includes nested replies from backend)
    const fetchComments = async () => {
        try {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 
            const BACKEND_URL = "https://api.muktihospital.com";

            if (!API_KEY || !BACKEND_URL) {
                console.error("Environment variables NEXT_PUBLIC_API_KEY or NEXT_PUBLIC_BACKEND_URL are not set.");
                toast.error("Application configuration error. Please contact support.");
                return;
            }

            const token = localStorage.getItem("authToken");

            const response = await fetch(`${BACKEND_URL}/api/blogs/${singleBlogs.id}/comments`, {
                headers: {
                    'x-api-key': API_KEY,
                    'Authorization': token ? `Bearer ${token}` : ''
                },
            });
            
            if (!response.ok) {
                const errorText = await response.text(); 
                console.error("API Error Response (Text):", errorText);
                let errorMessage = `Failed to fetch comments: ${response.status} ${response.statusText}.`;
                if (errorText.startsWith('<!DOCTYPE html>')) {
                    errorMessage += " Server responded with HTML (likely an error page).";
                } else {
                    errorMessage += ` Server responded with: ${errorText.substring(0, 100)}...`;
                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json(); 
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error(error.message || "Failed to load comments.");
        }
    };

    useEffect(() => {
        if (singleBlogs?.id) {
            fetchComments();
        }
    }, [singleBlogs.id]);

    // Handles top-level comment form input change
    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setCommentFormData(prev => ({ ...prev, [name]: value }));
    };

    // Generic function to handle posting a comment/reply
    // This function is passed down to CommentItem for replies
    const postCommentOrReply = async (blogId, content, authorName, authorEmail, parentId = null) => {
        try {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
            const token = localStorage.getItem("authToken");

            const response = await fetch(`${BACKEND_URL}/api/blogs/${blogId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({
                    content,
                    authorName,
                    authorEmail: authorEmail.trim() || null,
                    parentId // Pass parentId
                }),
            });

            if (!response.ok) {
                const errorText = await response.text(); 
                console.error("API Error Response (Text):", errorText);
                let errorMessage = `Failed to post ${parentId ? 'reply' : 'comment'}: ${response.status} ${response.statusText}.`;
                if (errorText.startsWith('<!DOCTYPE html>')) {
                    errorMessage += " Server responded with HTML (likely an error page).";
                } else {
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage += ` Server error: ${errorData.error || 'Unknown error'}`;
                    } catch (parseError) {
                        errorMessage += ` Server responded with: ${errorText.substring(0, 100)}...`;
                    }
                }
                throw new Error(errorMessage);
            }

            const newCommentResponse = await response.json();
            toast.success(`${parentId ? 'Reply' : 'Comment'} posted successfully!`);
            fetchComments(); // Re-fetch all comments to get the updated nested structure
            return newCommentResponse.comment; // Return the new comment object if needed

        } catch (error) {
            console.error(`Error posting ${parentId ? 'reply' : 'comment'}:`, error);
            toast.error(error.message || `Failed to post ${parentId ? 'reply' : 'comment'}.`);
            throw error; // Re-throw to allow CommentItem to handle its state (e.g., reset isSubmittingReply)
        }
    };

    // Handle top-level comment form submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingComment(true);
        try {
            await postCommentOrReply(singleBlogs.id, commentFormData.content, commentFormData.authorName, commentFormData.authorEmail);
            setCommentFormData({ content: '', authorName: '', authorEmail: '' }); // Clear form
        } catch (error) {
            // Error already handled in postCommentOrReply, just catch to prevent uncaught promise rejection
        } finally {
            setIsSubmittingComment(false);
        }
    };


    // Function to extract headings without numbers (for Table of Contents)
    const extractHeadings = (content) => { 
        const headingRegex = /<(h2|h3)>(.*?)<\/\1>/g;
        const headings = [];
        let match;
        while ((match = headingRegex.exec(content)) !== null) {
            const headingText = match[2];
            const id = headingText.replace(/\s+/g, '-').toLowerCase();
            const cleanHeadingText = headingText.replace(/^\d+(?:\.\d+)*[.)]?\s*/, "");
            headings.push({ text: cleanHeadingText, id });
        }
        return headings;
    };
    
    // Function to add IDs to the content headings
    const addIdsToContent = (content) => { 
        return content.replace(/<(h2|h3)>(.*?)<\/\1>/g, (match, p1, p2) => {
            const id = p2.replace(/\s+/g, '-').toLowerCase();
            return `<${p1} id="${id}">${p2}</${p1}>`;
        });
    };

    const [contentWithIds, setContentWithIds] = useState("");
    useEffect(() => {
        const newContent = addIdsToContent(translations?.content || "");
        setContentWithIds(newContent);
    }, [translations]);

    const headings = extractHeadings(translations?.content || "");
    const [isTableOfContentsVisible, setIsTableOfContentsVisible] = useState(true);
    const [tocHeight, setTocHeight] = useState(0);
    const tocRef = useRef(null);

    useEffect(() => {
        if (tocRef.current) {
            setTocHeight(tocRef.current.scrollHeight);
        }
    }, [headings, isTableOfContentsVisible]);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Hero Area */}
            <div className="pt-[80px] lg:pt-[100px] pb-20 md:pb-32 lg:pb-[120px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="rounded-2xl">
                        <Image src={blogImage} alt="blog Feature Image" width={600} height={600} className="rounded-2xl" />
                    </div>
                    <div className="col-span-2 space-y-4">
                        <span className="px-4 py-2 bg-M-heading-color text-sm md:text-base text-white font-jost font-medium uppercase inline-block rounded-md">
                            {translations.category?.name || "Uncategorized"}
                        </span>
                        <h1 className="text-2xl md:text-4xl text-white">{translations?.title}</h1>
                        <p className="text-base text-white/80 font-jost">{translations?.description}</p>
                        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
                            <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                                <Icon icon="solar:pen-2-linear" width="24" height="24" />{" "}
                                <Image src={authorImage} alt="Author Image" width={35} height={35} className="rounded-full shrink-0 border border-M-heading-color" />{" "}
                                By Admin
                            </li>
                            <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                                <Icon icon="oui:token-date" width="30" height="30" /> {formattedDate}
                            </li>
                            <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                                <Icon icon="lucide:alarm-clock" width="24" height="24" /> {formattedTime}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="container max-auto py-10 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="">
                            {/* Table of Contents */}
                            <div className="border border-slate-200 p-6 rounded-md">
                                <div className="flex justify-between items-center rounded-md overflow-hidden">
                                    <h3 onClick={() => setIsTableOfContentsVisible(!isTableOfContentsVisible)} className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full cursor-pointer">
                                        Table of Contents
                                        <span>
                                            <Icon icon="solar:alt-arrow-down-linear" width="24" className={`transition-all duration-300 ${isTableOfContentsVisible ? "-rotate-180" : "" } `} />
                                        </span>
                                    </h3>
                                </div>
                                <div ref={tocRef} className="overflow-hidden transition-all duration-300 ease-in-out" style={{ height: isTableOfContentsVisible ? `${tocHeight}px` : "0px" }}>
                                    <ul className="mt-5">
                                        {headings.map((heading, index) => (
                                            <li key={heading.id} className="flex justify-between items-center gap-3 cursor-pointer py-2 border-b border-M-primary-color/10 last:border-0 text-slate-400 font-jost">
                                                <Link href={`#${heading.id}`} scroll={true}>
                                                    {index + 1}. {heading.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: contentWithIds || "No content available." }} className="jodit-description mt-5" />
                            {/* Show Comments Area */}
                            <div className="border border-M-text-color/50 p-6 rounded-lg mt-10">
                                <h2 className="text-2xl md:text-3xl">{comments.length} Comments</h2>
                                {comments.length === 0 ? (
                                    <p className="mt-4 text-M-text-color">No comments yet. Be the first to comment!</p>
                                ) : (
                                    comments.map((comment) => (
                                        <CommentItem 
                                            key={comment.id} 
                                            comment={comment} 
                                            blogId={singleBlogs.id} 
                                            onPostCommentOrReply={postCommentOrReply}
                                            level={0}
                                        />
                                    ))
                                )}
                            </div>

                            {/* Submit Top-Level Comments area */}
                            <div className="border border-M-text-color/50 p-6 rounded-lg mt-10" id="comments">
                                <h2 className="text-3xl">Leave a Reply</h2>
                                <p className="font-jost text-sm text-M-text-color">
                                    Your email address will not be published. Required fields are
                                    marked <span className="text-M-secondary-color">*</span>
                                </p>

                                <form onSubmit={handleCommentSubmit} className="mt-4">
                                    {/* Comment Content */}
                                    <div>
                                        <label htmlFor="commentContent" className="text-black text-base font-jost mb-2 inline-block">
                                            Comment <span className="text-M-secondary-color">*</span>
                                        </label>
                                        <textarea name="content" id="commentContent" placeholder="Your Message" rows={5} value={commentFormData.content} onChange={handleCommentChange} className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none" required disabled={isSubmittingComment}></textarea>
                                    </div>
                                    {/* Author Name */}
                                    <div className="mt-3">
                                        <label htmlFor="authorName" className="text-black text-base font-jost mb-2 inline-block">
                                            Name <span className="text-M-secondary-color">*</span>
                                        </label>
                                        <input type="text" name="authorName" id="authorName" placeholder="Your Name" value={commentFormData.authorName} onChange={handleCommentChange} required className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none" disabled={isSubmittingComment} />
                                    </div>
                                    {/* Author Email */}
                                    <div className="mt-3">
                                        <label htmlFor="authorEmail" className="text-black text-base font-jost mb-2 inline-block">
                                            Email{" "}
                                        </label>
                                        <input type="email" name="authorEmail" id="authorEmail" placeholder="Your Email" value={commentFormData.authorEmail} onChange={handleCommentChange} className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none" disabled={isSubmittingComment} />
                                    </div>
                                    <button type="submit" className="bg-M-heading-color font-jost font-medium text-white text-base uppercase py-3 px-6 rounded-md mt-6 inline-block hover:bg-M-primary-color transition-all duration-300" disabled={isSubmittingComment}>
                                        {isSubmittingComment ? "Posting..." : "Post Comment"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <BlogSidebar 
                            blogs={blogs}
                            hideSearch={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;