'use client'
import Link from "next/link";
import { getHomePosts, HomePostType } from "../../../../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "../../../../utils/supabase/browser-client";

const HomePosts = ({posts}: {posts: HomePostType}) => {
    
    const { data } = useQuery({
        queryKey:['home-posts'],
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await getHomePosts(supabase) 

            if(error) throw error;
            return data
        },
        initialData: posts,
        refetchOnMount: false,
        staleTime: 10000
    })

    return (
        <div>
            {data && data.map(({id, title, slug, user}) => 
            <Link href={`/${slug}`} className="block border-2 rounded-xl mt-4 p-4" key={id}>
                <h2 className="card p-6 group animate-fadeup hover:bg-fuchsia-600">{title} </h2>
                <div className="text-right font-mono">by{user.username} </div>
                <div className="text-purple-500 font-bold ">
                                Read more!
                </div>
            </Link>
            )}
       </div>
    )
}    

export default HomePosts
