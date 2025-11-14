import { getSinglePost } from "../../../../utils/supabase/queries"
import { createClient } from "../../../../utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

const singlePost = async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data,error} = await getSinglePost(slug)

    const supabase= await createClient()
    const {data:{user}} = await supabase.auth.getUser();

    const isAuthor = user?.id === data?.user_id ? true : false

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
           {data &&
           <>
            <div className="card p-6 sm:p-8 lg:p-10 mb-4 sm:mb-6 animate-fadeInUp">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    {data.title}
                </h1>
                <div className="flex items-center gap-2 sm:gap-3 pb-4 sm:pb-6 border-b border-gray-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-900 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                        {data.user?.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">Written by</p>
                        <p className="font-semibold text-sm sm:text-base text-gray-900">
                            {data.user?.username}
                        </p>
                    </div>
                </div>
            </div>

            {data?.image &&
                <div className="card p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg"
                    />
                </div>
            }

            <div className="card p-6 sm:p-8 lg:p-10 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                {data.content &&
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed">
                        {data.content}
                    </div>
                }
            </div>

            {isAuthor &&
                <div className="card p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-semibold">
                        Manage Your Post
                    </p>
                    <div className="flex gap-2 sm:gap-3 flex-wrap">
                        <EditButton slug={slug}/>
                        <DeleteButton postId={data.id}/>
                    </div>
                </div>
            }
            </>
           }
        </div>
    )
}

export default singlePost
