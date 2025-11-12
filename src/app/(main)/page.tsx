import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/server-client";
//import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  //console.log("data: "+ data + "Error: "+ error)
 const supabase = await createClient();
 const { data, error } = await getHomePosts(supabase)


 return (
    <div>
      {data && <HomePosts posts={data} />}
    </div>
  );
}

 /*return (
        <div className="w-[80%] m-auto">
            {data && data.map(({id, title, slug, user}) => 
            <Link href={`/${slug}`} className="block border-1 rounded-xl mt-4 p-4" key={id}>
                <h2 className="font-bold text-xl">{title} </h2>
                <div className="text-right">by{user.username} </div>
            </Link>
            )}
       </div>
 );*/



/*export default function Home() {
  const posts = [
  {
    title: "Hello World",
    author: "Stephen KIng"
  },
  {
    title: "Hello World",
    author: "Stephen KIng"
  },
   {
    title: "Hello World",
    author: "Stephen KIng"
  },
  {
    title: "Hello World",
    author: "Stephen KIng"
  }
]

return (
   <div className="w-[80%] m-auto">
    {posts && posts.map(item =>
    <div className="rounded-xl border-1 p-4 mt-4">
      <h2 className="font-bold text-xl">{item.title}</h2>
      <div className="text-right">posted by: {item.author}</div>
    </div>
    )}
   </div>
);
}*/

/*return (
     <div className="w-[80%] m-auto">
      <HomePosts posts={data!}/>
     </div>
  );*/