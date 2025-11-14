import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/server-client";

export const revalidate = 6000;

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

