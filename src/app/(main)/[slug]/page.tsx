/*import HomePosts from "@/components/Home/HomePosts";

import Link from "next/link";
import cache from "next/cache"

export const revalidate = 600;

export default async function Home() {
  //console.log("data: "+ data + "Error: "+ error)


 return (
        <div className="w-[80%] m-auto">  
        <div>Slug page</div>
            
       </div>
 );
}*/

import { getSinglePost } from "../../../../utils/supabase/queries"
import { createClient } from "../../../../utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

const SinglePost = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params
    const { data, error } = await getSinglePost(slug)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const isAuthor = user?.id === data?.user_id ? true : false

    return (
        <>
            {data &&
                <>
                    <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        <h2 className="font-bold text-xl">{data.title}</h2>
                        <p className="mt-4">Author {data.user?.username}</p>
                    </div>
                    {data.image && <div className="w-lg p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        <img src={data.image} width="100%" height="auto" />
                    </div>
                    }
                    <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        {data.content && <div>{data.content}</div>}
                    </div>
                    {isAuthor &&
                        <div className="w-2xl p-4 m-auto flex justify-between border-gray-700 border-1 mt-4 rounded-2xl">
                            <DeleteButton postId={data.id} />
                            <EditButton slug={slug} />
                        </div>
                    }
                </>
            }
        </>
    )
}
export default SinglePost
