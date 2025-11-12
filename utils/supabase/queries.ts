import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    //const supabase = createClient()
        return await supabase.from('posts')
                    .select('id, title, slug, user("username"),image')
                    .order('created_at', {ascending: false})
}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient()
    return await supabase.from('posts')
                .select('id, title, content, created_at, slug, user_id, user("username"), image')
                .eq('slug', slug)
                .single()
}

export const getSearchPosts = async (searchTerm: string) => {
    const supabase = createClient()
    return await supabase.from('posts')
                .select('title, slug')
                .ilike('title',`${searchTerm}%`)       
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>